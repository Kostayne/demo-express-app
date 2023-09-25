build:
	docker build -t demo-express-app .

run:
	docker run -it -p 3015:3015 -v ./data.db:/app/data.db --init demo-express-app

build_test:
	docker build -t demo-express-app-test --target test .

test:
	docker run demo-express-app-test