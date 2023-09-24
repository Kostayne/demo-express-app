build:
	docker build -t demo-express-app .

run:
	docker run -it -p 3015:3015 -v ./data.db:/app/data.db --init demo-express-app