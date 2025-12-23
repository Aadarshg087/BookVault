echo "PORT=3000" >> .env

echo "MONGO_URI=mongodb+srv://aadarshg087:aadarsh123@cluster0.zggtw.mongodb.net" >> .env

echo "CORS=http://localhost:5173"" >> .env

sudo apt update && sudo apt install docker.io -y

sudo docker build . -t backendapp

sudo docker run -d -p 3000:3000 backendapp

sudo docker ps