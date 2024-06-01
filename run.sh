php -S 127.0.0.1:8000 &  cd server; sh run.sh & 
cd ../
npx tailwindcss -i styles/index.css -o dist/out.css --watch
