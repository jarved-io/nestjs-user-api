# nestjs-user-api
Nest.js User Management API with JWT Authentication, TypeORM, PostgreSQL, and comprehensive unit tests. Features CRUD operations, input validation, and proper error handling.
# Nest.js User Management API

A robust REST API built with Nest.js, TypeORM, and PostgreSQL featuring JWT authentication, CRUD operations, and comprehensive unit tests.

## Features

✅ **CRUD Operations** - Complete Create, Read, Update, Delete functionality  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Authorization Guards** - Protected routes with JWT verification  
✅ **Input Validation** - Request validation using class-validator  
✅ **Error Handling** - Comprehensive error handling with appropriate HTTP status codes  
✅ **TypeORM Integration** - Database operations with PostgreSQL  
✅ **Unit Tests** - Test coverage for services  
✅ **Password Hashing** - Secure password storage with bcrypt  
✅ **Clean Architecture** - Well-organized, maintainable code structure

## Tech Stack

- **Framework:** Nest.js 10
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator & class-transformer
- **Testing:** Jest
- **Language:** TypeScript

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   └── login.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   └── auth.service.spec.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.service.spec.ts
├── app.module.ts
└── main.ts
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/nestjs-user-api.git
cd nestjs-user-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE nestjs_api;
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_api
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=1d
NODE_ENV=development
PORT=3000
```

### 5. Run the Application

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### Register a New User
```http
POST /users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### User Management (Protected Routes)

All routes below require the `Authorization: Bearer <token>` header.

#### Get All Users
```http
GET /users
Authorization: Bearer <your-jwt-token>
```

#### Get User by ID
```http
GET /users/:id
Authorization: Bearer <your-jwt-token>
```

#### Update User
```http
PATCH /users/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "isActive": true
}
```

#### Delete User
```http
DELETE /users/:id
Authorization: Bearer <your-jwt-token>
```

## Testing

Run unit tests:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:cov
```

Watch mode:
```bash
npm run test:watch
```

## Validation Rules

### User Registration
- **email**: Must be a valid email address (required)
- **password**: Minimum 6 characters (required)
- **firstName**: String (required)
- **lastName**: String (required)

### User Update
- **email**: Valid email (optional)
- **password**: Minimum 6 characters (optional)
- **firstName**: String (optional)
- **lastName**: String (optional)
- **isActive**: Boolean (optional)

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials or missing token)
- `404` - Not Found
- `409` - Conflict (duplicate email)
- `500` - Internal Server Error

Example error response:
```json
{
  "statusCode": 400,
  "message": [
    "email must be an email",
    "password must be longer than or equal to 6 characters"
  ],
  "error": "Bad Request"
}
```

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 10
- **JWT Authentication**: Stateless authentication using JSON Web Tokens
- **Input Validation**: All inputs are validated and sanitized
- **Route Protection**: Sensitive routes are protected with JWT guards
- **Password Exclusion**: Password fields are excluded from API responses

## Git Workflow

### Initialize Repository

```bash
git init
git add .
git commit -m "Initial commit: Nest.js API with JWT authentication"
git branch -M main
git remote add origin https://github.com/yourusername/nestjs-user-api.git
git push -u origin main
```

### Recommended Commit Messages

- `feat: add user authentication`
- `fix: resolve validation error handling`
- `test: add unit tests for user service`
- `docs: update README with API documentation`
- `refactor: improve error handling`

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow Nest.js best practices
- Use DTOs for data validation
- Implement proper error handling
- Write descriptive commit messages

### Testing Strategy
- Write unit tests for all services
- Test both success and error cases
- Mock external dependencies
- Aim for >80% code coverage

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database exists

### JWT Authentication Errors
- Verify JWT_SECRET is set in `.env`
- Check token expiration settings
- Ensure Bearer token is included in headers

### Validation Errors
- Check request body matches DTO requirements
- Ensure Content-Type header is set to `application/json`

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Swagger documentation
- [ ] E2E tests
- [ ] Docker containerization


## Author

Devraj Moollya -https://github.com/jarved-io
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

**Note:** Remember to change the `JWT_SECRET` in production and never commit your `.env` file to version control.
