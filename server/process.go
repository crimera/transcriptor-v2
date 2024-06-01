package main

import (
	"fmt"
	"os"

	"github.com/ggerganov/whisper.cpp/bindings/go/pkg/whisper"
	wav "github.com/go-audio/wav"
)

func getModels() []string {
	return []string{"ggml-base.en-q5_1.bin", "ggml-tiny.en.bin", "ggml-small.en.bin"}
}

func process(modelpath string, filename string, callback whisper.SegmentCallback) (e error) {
	var samples []float32 // Samples to process

	// Open the file
	fmt.Printf("Loading %q\n", filename)
	fh, err := os.Open(filename)
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
	model, err := whisper.New(modelpath)
	if err != nil {
		return err
	}
	defer model.Close()

	// Process samples
	context, err := model.NewContext()
	if err != nil {
		return err
	}

	if err := context.Process(samples, callback, nil); err != nil {
		return err
	}

	return
}
