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
 
   
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/real-estate
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the Backend Server**
   ```bash
   npm start
   
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





