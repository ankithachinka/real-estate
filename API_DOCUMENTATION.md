# API Documentation

## Base URL
```
http://localhost:5000/api
```

## General Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Projects API

### Get All Projects
```http
GET /api/projects
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "name": "Luxury Villa",
      "description": "Beautiful villa with ocean view",
      "image": "/uploads/project-1234567890.jpg",
      "createdAt": "2023-07-01T12:00:00.000Z",
      "updatedAt": "2023-07-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Get Single Project
```http
GET /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "Luxury Villa",
    "description": "Beautiful villa with ocean view",
    "image": "/uploads/project-1234567890.jpg",
    "createdAt": "2023-07-01T12:00:00.000Z",
    "updatedAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Create Project
```http
POST /api/projects
Content-Type: multipart/form-data
```

**Request Body:**
```
name: "Luxury Villa"
description: "Beautiful villa with ocean view"
image: File (image file)
```

**Response:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "Luxury Villa",
    "description": "Beautiful villa with ocean view",
    "image": "/uploads/project-1234567890.jpg",
    "createdAt": "2023-07-01T12:00:00.000Z",
    "updatedAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Update Project
```http
PUT /api/projects/:id
Content-Type: multipart/form-data
```

**Request Body:**
```
name: "Updated Luxury Villa"
description: "Updated description"
image: File (optional)
```

### Delete Project
```http
DELETE /api/projects/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

## Clients API

### Get All Clients
```http
GET /api/clients
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012346",
      "name": "John Doe",
      "description": "Excellent service and professional team",
      "designation": "CEO",
      "image": "/uploads/client-1234567891.jpg",
      "createdAt": "2023-07-01T12:00:00.000Z",
      "updatedAt": "2023-07-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Client
```http
POST /api/clients
Content-Type: multipart/form-data
```

**Request Body:**
```
name: "John Doe"
description: "Excellent service and professional team"
designation: "CEO"
image: File (image file)
```

### Update Client
```http
PUT /api/clients/:id
Content-Type: multipart/form-data
```

### Delete Client
```http
DELETE /api/clients/:id
```

## Contacts API

### Get All Contacts
```http
GET /api/contacts
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012347",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "mobile": "+1234567890",
      "city": "New York",
      "createdAt": "2023-07-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Contact
```http
POST /api/contacts
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@example.com",
  "mobile": "+1234567890",
  "city": "New York"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789012347",
    "fullName": "Jane Smith",
    "email": "jane@example.com",
    "mobile": "+1234567890",
    "city": "New York",
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Delete Contact
```http
DELETE /api/contacts/:id
```

## Newsletters API

### Get All Newsletters
```http
GET /api/newsletters
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012348",
      "email": "subscriber@example.com",
      "isActive": true,
      "createdAt": "2023-07-01T12:00:00.000Z"
    }
  ],
  "count": 1
}
```

### Create Newsletter Subscription
```http
POST /api/newsletters
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "subscriber@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "_id": "64a1b2c3d4e5f6789012348",
    "email": "subscriber@example.com",
    "isActive": true,
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
}
```

### Delete Newsletter Subscription
```http
DELETE /api/newsletters/:id
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 409 | Conflict (duplicate resource) |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## File Upload

- **Max File Size**: 5MB
- **Supported Formats**: JPG, PNG, GIF, SVG
- **Auto Cropping**: Images are automatically cropped to 450x350 pixels
- **Storage**: Files are stored in `/uploads` directory

## Search Endpoints

### Search Projects
```http
GET /api/projects/search?query=luxury
```

### Search Clients
```http
GET /api/clients/search?query=john
```

### Search Contacts
```http
GET /api/contacts/search?query=jane
```

### Search Newsletters
```http
GET /api/newsletters/search?query=subscriber
```

## Statistics Endpoints

### Contact Statistics
```http
GET /api/contacts/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalContacts": 150,
    "contactsThisMonth": 25,
    "contactsByCity": [
      { "_id": "New York", "count": 45 },
      { "_id": "Los Angeles", "count": 32 }
    ]
  }
}
```

### Newsletter Statistics
```http
GET /api/newsletters/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSubscribers": 500,
    "activeSubscribers": 480,
    "inactiveSubscribers": 20,
    "subscribersThisMonth": 75,
    "subscriptionTrends": [
      { "_id": { "year": 2023, "month": 6 }, "count": 60 },
      { "_id": { "year": 2023, "month": 7 }, "count": 75 }
    ]
  }
}
```

## Export Endpoints

### Export Newsletter Subscribers
```http
GET /api/newsletters/export?format=csv
```

**Response**: CSV file download with email addresses and subscription dates

## Health Check

### API Health
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Real Estate API is running",
  "timestamp": "2023-07-01T12:00:00.000Z"
}
```
