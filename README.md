# Real Estate Full-Stack Application

A complete real estate management application with a landing page and admin panel for managing projects, clients, contact forms, and newsletter subscriptions.

## 🚀 Features

### Landing Page
- **Our Projects Section**: Display all projects fetched from the backend
- **Happy Clients Section**: Display client testimonials
- **Contact Form**: Submit contact inquiries
- **Newsletter Subscription**: Subscribe to newsletter
- **Responsive Design**: Mobile-friendly interface

### Admin Panel
- **Project Management**: Add, view, edit, and delete projects
- **Client Management**: Add, view, edit, and delete client testimonials
- **Contact Form Details**: View all contact form submissions
- **Newsletter Management**: View and manage newsletter subscribers
- **Dashboard**: Overview statistics

### Backend Features
- **RESTful API**: Complete CRUD operations
- **Image Upload**: File upload with image cropping (bonus feature)
- **Data Validation**: Input validation and error handling
- **Security**: Rate limiting, CORS, and security headers
- **Database**: MongoDB with Mongoose ODM

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript (ES6+)**: Vanilla JavaScript with async/await
- **Responsive Design**: Mobile-first approach

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling
- **Multer**: File upload handling
- **Sharp**: Image processing and cropping

## 📁 Project Structure

```
real-estate-app/
├── frontend/
│   ├── index.html          # Landing page
│   ├── admin.html          # Admin panel
│   ├── css/
│   │   ├── style.css       # Landing page styles
│   │   └── admin.css       # Admin panel styles
│   ├── js/
│   │   ├── script.js       # Landing page functionality
│   │   └── admin.js        # Admin panel functionality
│   └── assets/
│       ├── images/         # Project and client images
│       └── icons/          # UI icons
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   └── config/         # Configuration files
│   ├── uploads/            # Uploaded images
│   ├── package.json        # Dependencies
│   ├── server.js           # Main server file
│   └── .env.example        # Environment variables template
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-app
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/real-estate
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the Backend Server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

5. **Frontend Setup**
   - Open `frontend/index.html` in your browser for the landing page
   - Open `frontend/admin.html` in your browser for the admin panel

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get a single project
- `POST /projects` - Create a new project (requires image upload)
- `PUT /projects/:id` - Update a project
- `DELETE /projects/:id` - Delete a project

#### Clients
- `GET /clients` - Get all clients
- `GET /clients/:id` - Get a single client
- `POST /clients` - Create a new client (requires image upload)
- `PUT /clients/:id` - Update a client
- `DELETE /clients/:id` - Delete a client

#### Contacts
- `GET /contacts` - Get all contact submissions
- `GET /contacts/:id` - Get a single contact
- `POST /contacts` - Create a new contact submission
- `DELETE /contacts/:id` - Delete a contact

#### Newsletters
- `GET /newsletters` - Get all newsletter subscribers
- `GET /newsletters/:id` - Get a single subscriber
- `POST /newsletters` - Subscribe to newsletter
- `DELETE /newsletters/:id` - Delete a subscription

### Request/Response Format

#### Create Project
```javascript
// Request (multipart/form-data)
{
  "name": "Luxury Villa",
  "description": "Beautiful villa with ocean view",
  "image": File
}

// Response
{
  "success": true,
  "message": "Project created successfully",
  "data": {
    "_id": "64a1b2c3d4e5f6789012345",
    "name": "Luxury Villa",
    "description": "Beautiful villa with ocean view",
    "image": "/uploads/project-1234567890.jpg",
    "createdAt": "2023-07-01T12:00:00.000Z"
  }
}
```

## 🎨 Features Implementation

### Image Cropping (Bonus Feature)
The application includes automatic image cropping functionality:
- Original images are automatically cropped to 450x350 pixels
- Maintains aspect ratio and center focus
- Reduces file size for better performance

### Data Validation
- Email format validation
- Required field validation
- File type and size validation
- Duplicate email prevention

### Security Features
- Rate limiting (100 requests per 15 minutes)
- CORS configuration
- Security headers with Helmet
- Input sanitization

## 🌐 Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### Backend Deployment
The backend can be deployed to:
- Heroku
- AWS EC2
- Google Cloud Platform
- DigitalOcean

### Database
- **MongoDB Atlas**: Recommended for production
- **Local MongoDB**: For development

## 📱 Responsive Design

The application is fully responsive:
- Desktop: Full functionality
- Tablet: Optimized layout
- Mobile: Touch-friendly interface

## 🔧 Configuration

### Environment Variables
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/real-estate

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# Image Cropping Configuration
CROP_WIDTH=450
CROP_HEIGHT=350
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file

2. **Image Upload Error**
   - Ensure `uploads` directory exists
   - Check file permissions

3. **CORS Error**
   - Verify `FRONTEND_URL` in `.env` file
   - Check frontend URL matches

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository.

---

**Note**: This project was created for educational and evaluation purposes. All images and assets are used for demonstration purposes only.
