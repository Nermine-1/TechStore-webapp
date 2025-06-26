# E-commerce Backend API

A robust RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management with categories
- Order processing
- Rating and review system
- Admin dashboard functionality
- Secure password handling
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)
- POST /api/products/:id/ratings - Add product rating

### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get single category
- POST /api/categories - Create category (admin only)
- PUT /api/categories/:id - Update category (admin only)
- DELETE /api/categories/:id - Delete category (admin only)

### Orders
- GET /api/orders - Get all orders (admin only)
- GET /api/orders/my-orders - Get user's orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create order
- PATCH /api/orders/:id/status - Update order status (admin only)

## Error Handling

The API uses a consistent error response format:
```json
{
  "message": "Error message",
  "errors": [] // Optional validation errors
}
```

## Security

- Passwords are hashed using bcrypt
- JWT authentication
- Input validation using express-validator
- CORS enabled
- Environment variables for sensitive data

## Development

To start the development server with hot reload:
```bash
npm run dev
```

## Production

To start the production server:
```bash
npm start
```

## License

MIT 