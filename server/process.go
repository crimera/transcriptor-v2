package main

import (
	"fmt"
	"os"

	"github.com/crimera/whisper.cpp/bindings/go/pkg/whisper"
	wav "github.com/go-audio/wav"
)

type WhisperOptions struct {
	Filename  string
	ModelPath string
	Translate bool
	Language  string
}

func getModels() []string {
	return []string{"ggml-base-q5_1.bin", "ggml-base.en-q5_1.bin", "ggml-medium-q5_0.bin"}
}

func process(options WhisperOptions, callback whisper.SegmentCallback) (e error) {
	var samples []float32 // Samples to process

	// Open the file
	fmt.Printf("Loading %q\n", options.Filename)
	fh, err := os.Open(options.Filename)
	if err != nil {
		panic(err)
	}
	defer fh.Close()

	// Decode the WAV file - load the full buffer
	// TODO: add support for other files, top priority should be videos
	dec := wav.NewDecoder(fh)
	if buf, err := dec.FullPCMBuffer(); err != nil {
		return err
	} else if dec.SampleRate != whisper.SampleRate {
		fmt.Printf("unsupported sample rate: %d", whisper.SampleRate)
		fmt.Printf("unsupported sample rate: %d", dec.SampleRate)
	} else if dec.NumChans != 1 {
		fmt.Printf("unsupported number of channels: %d", dec.NumChans)
	} else {
		samples = buf.AsFloat32Buffer().Data
	}

	// Load the model
	model, err := whisper.New(options.ModelPath)
	if err != nil {
		return err
	}
	defer model.Close()

	// Process samples
	context, err := model.NewContext()
	if err != nil {
		return err
	}

	if options.Translate {
		fmt.Println(options.Translate)
		fmt.Println("we be translating")
		context.SetTranslate(true)
	}

	if err := context.Process(samples, callback, nil); err != nil {
		return err
	}

	return
}
