# Seva API Response Standarization

## Rest API Success Responses

**1- GET** - Get single item - HTTP Response Code: **200**

```javascript
    HTTP/1.1 200
    Content-Type: application/json
    {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
    }
```

**2- GET** - Get item list - HTTP Response Code: **200**

```javascript
    HTTP/1.1 200
    Pagination-Count: 100
    Pagination-Page: 5
    Pagination-Limit: 20
    Content-Type: application/json
    [
      {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
        },
      {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
      }
    ]
```

**3- POST** - Create a new item - HTTP Response Code: **201**

```javascript
    HTTP/1.1  201
    Location: /v1/items/12
    Content-Type: application/json
    {
      "message": "The model was created successfully",
      "data" : {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
      }
    }
```

**4- PUT** - Update an item - HTTP Response Code: **200**

> If updated entity is to be sent after the update

```javascript
    HTTP/1.1  200
    Content-Type: application/json
    {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
    }
```

**5- DELETE** - Delete an item - HTTP Response Code: **200**

> If deleted entity is to be clear on database

```javascript
    HTTP/1.1  200
    Content-Type: application/json
    {
        "id": 10,
        "modelName": "Model Test",
        "colorName": "Red",
        "price": 80000000
    }
```

## Rest API Error Responses

**1- GET** - HTTP Response Code: **404**

```javascript
    HTTP/1.1  404
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "The model does not exist"
          "code": 404,
        }
      ]
    }
```

**2- DELETE** - HTTP Response Code: **404**

```javascript
    HTTP/1.1  404
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "The model does not exist"
          "code": 404,
        }
      ]
    }
```

**3- POST** - HTTP Response Code: **400**

```javascript
    HTTP/1.1  400
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Invalid request parameter for downPayment type"
          "code": 400,
        },
        {
          "message": "Invalid request parameter for carBrandName value"
          "code": 400,
        }
      ]
    }
```

**4- PUT** - HTTP Response Code: **400/404**

```javascript
    HTTP/1.1  400
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Invalid request parameter for downPayment type"
          "code": 400,
        },
        {
          "message": "Invalid request parameter for carBrandName value"
          "code": 400,
        }
      ]
    }
    HTTP/1.1  404
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Field Model Test not found"
          "code": 404,
        }
      ]
    }
```

**5- VERB Unauthorized** - HTTP Response Code: **401**

```javascript
    HTTP/1.1  401
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Authentication credentials were missing or incorrect"
          "code": 401,
        }
      ]
    }
```

**6- VERB Forbidden** - HTTP Response Code: **403**

```javascript
    HTTP/1.1  403
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "The request is understood, but it has been refused or access is not allowed"
          "code": 403,
        }
      ]
    }
```

**7- VERB Conflict** - HTTP Response Code: **409**

```javascript
    HTTP/1.1  409
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Any message which should help the user to resolve the conflict"
          "code": 409,
        }
      ]
    }
```

**8- VERB Too Many Requests** - HTTP Response Code: **429**

```javascript
    HTTP/1.1  429
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "The request cannot be served due to the rate limit having been exhausted for the resource"
          "code": 429,
        }
      ]
    }
```

**9- VERB Internal Server Error** - HTTP Response Code: **500**

```javascript
    HTTP/1.1  500
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "Server not responding"
          "code": 500,
        }
      ]
    }
```

**10- VERB Service Unavailable** - HTTP Response Code: **503**

```javascript
    HTTP/1.1  503
    Content-Type: application/json
    {
      "errors": [
        {
          "message": "The server is up, but overloaded with requests. Try again later"
          "code": 500,
        }
      ]
    }
```
