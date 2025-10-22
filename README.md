# E-commerce API

A simple Node.js + Express API for managing product data with CORS support and system monitoring.

## Features

- ✅ Express server running on port 4000
- ✅ Product management (GET, POST, PUT, DELETE)
- ✅ CORS middleware enabled
- ✅ JSON request/response handling
- ✅ System information logging on startup
- ✅ HTTP request logging (method and URL)
- ✅ Error handling middleware

## Installation

\`\`\`bash
npm install
\`\`\`

## Running the Server

### Development (with auto-reload)
\`\`\`bash
npm run dev
\`\`\`

### Production
\`\`\`bash
npm start
\`\`\`

The server will start on `http://localhost:4000`

## API Endpoints

### Get All Products
\`\`\`
GET /products
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "count": 3,
  "data": [
    { "id": 1, "name": "Laptop", "price": 999.99, "category": "Electronics" }
  ]
}
\`\`\`

### Get Single Product
\`\`\`
GET /products/:id
\`\`\`

### Add New Product
\`\`\`
POST /products
Content-Type: application/json

{
  "name": "Product Name",
  "price": 99.99,
  "category": "Category Name"
}
\`\`\`

### Update Product
\`\`\`
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 149.99,
  "category": "Updated Category"
}
\`\`\`

### Delete Product
\`\`\`
DELETE /products/:id
\`\`\`

## System Information

When the server starts, it displays:
- Platform (Windows, Linux, macOS, etc.)
- CPU cores count
- Total and free memory
- System architecture

## Request Logging

Every HTTP request is logged to the console with:
- Timestamp
- HTTP method (GET, POST, PUT, DELETE)
- Request URL

## Example Usage

\`\`\`bash
# Get all products
curl http://localhost:4000/products

# Add a new product
curl -X POST http://localhost:4000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","price":299.99,"category":"Electronics"}'

# Update a product
curl -X PUT http://localhost:4000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Laptop","price":1299.99}'

# Delete a product
curl -X DELETE http://localhost:4000/products/1
\`\`\`

## Project Structure

\`\`\`
ecommerce-api/
├── server.js           # Main server file
├── routes/
│   └── products.js     # Product routes
├── package.json        # Dependencies
└── README.md          # Documentation
