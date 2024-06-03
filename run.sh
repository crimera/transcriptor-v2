export C_INCLUDE_PATH="$HOME/dev/whisper.cpp"
export LIBRARY_PATH="$HOME/dev/whisper.cpp"

php -S 127.0.0.1:8000 &
cd server; air & 
cd ../
npx tailwindcss -i styles/index.css -o dist/out.css --watch
