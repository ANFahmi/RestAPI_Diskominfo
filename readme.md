
# Test Diskominfo API Endpoint

Test Diskominfo pembuatan API endpoint




## Project Setup

Clone the project

```bash
  git clone https://github.com/ANFahmi/RestAPI_Diskominfo.git
```

Go to the project directory

```bash
  cd my-project
```
Change file format from env to .env

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Demo

http://localhost:8080


## API Reference

#### List Products

```http
  GET /api/products
```

#### List Detail Products

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |


#### Create Products

```http
  POST /api/products
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**|
| `price`      | `int` | **Required** |
| `stock`      | `int` | **Required**|


#### Update Products

```http
  PUT /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Optional**|
| `price`      | `int` | **Optional** |
| `stock`      | `int` | **Optional**|


#### Delete Products

```http
  DELETE /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |

#### List Order

```http
  GET /api/orders
```

#### Detail Order

```http
  GET /api/orders/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |

#### Create Order

```http
  POST /api/orders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `products`      | `array` | **Required** |
| `id`      | `int` | **Required** |
| `quantity`      | `int` | **Required** |


#### Delete Order

```http
  DELETE /api/orders/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `int` | **Required**. Id of item to fetch |







