# Simple express app
Just a project for demonstrational purposes

## Install deps
```
npm i
```

## Dev mode
Start in development mode with hot reload
```
# locally
npm run dev

# in docker
docker compose -f ./docker-compose.dev.yml up --build
```

## Prod
Build and run in production mode
```
# locally
npm run build
npm run start

# in docker
docker compose up --build
```

## API
### [get] /api/todos?id=1
```json
{
    "title": "title",
    "description": "description",
    "fulfilled": true
}
```

### [get] /api/todos?limit=2&offset=0
```json
[
    {
        "id": 1,
        "title": "title",
        "description": "description",
        "fulfilled": true
    },

    {
        "id": 2,
        "title": "title 2",
        "description": "description 2",
        "fulfilled": false
    }
]
```

### [post] /api/todos
Body
```json
{
    "title": "title",
    "description": "description",
    "fulfilled": true
}
```

Response
```json
{
    "id": 1,
    "title": "title",
    "description": "description",
    "fulfilled": true
}
```

### [put] /api/todos
Body
```json
{
    "id": "1",
    "title": "new title",
    "description": "new description",
    "fulfilled": false
}
```
Response
```
HTTP 200
```

### [delete] /api/todos?id=1
```
HTTP 200
```