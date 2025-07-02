# Hotel Kalsubai Gate Point - Full Stack Website

A complete hotel management website built with React.js frontend and designed to integrate with Spring Boot backend.

## 🏨 About Hotel Kalsubai Gate Point

Located at the base of Kalsubai Peak (Maharashtra's highest summit), this hotel offers comfortable accommodation and authentic local cuisine for trekkers and tourists.

## 🚀 Frontend Features

### Public Website
- **Home Page**: Hero section, about us, statistics, location with Google Maps
- **Menu Page**: Categorized menu (Veg/Non-Veg/Extras) with pricing
- **Gallery**: Image grid with lightbox functionality
- **Facilities**: Detailed facility information (camping, washrooms, bonfire, etc.)
- **Contact**: Contact form, WhatsApp integration, location map
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth transitions using Framer Motion

### Admin Panel
- **Admin Login**: Secure authentication system
- **Dashboard**: Overview with statistics
- **Menu Management**: Add/edit/delete menu items
- **Gallery Management**: Upload/manage hotel images
- **Locked Pro Features**: Room booking, payments, reviews (with upgrade prompts)

### Additional Features
- **WhatsApp Integration**: Floating WhatsApp button
- **Mobile Responsive**: Optimized for all devices
- **SEO Friendly**: Proper meta tags and structure
- **Fast Loading**: Optimized images and code splitting

## 🛠️ Tech Stack

### Frontend
- **React.js 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Lucide React** for icons

### Backend (To be implemented)
- **Spring Boot** with Java
- **Spring Data JPA** for database operations
- **Spring Security** for authentication
- **MySQL/H2** database
- **Swagger/OpenAPI** for API documentation

## 📦 Installation & Setup

### Frontend Setup
```bash
# Clone the repository
git clone <repository-url>
cd hotel-kalsubai-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Setup (To be implemented)
```bash
# Navigate to backend directory
cd backend

# Run Spring Boot application
./mvnw spring-boot:run

# Or using Gradle
./gradlew bootRun
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WHATSAPP_NUMBER=+919876543210
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Admin Credentials (Demo)
- **Username**: admin
- **Password**: admin123

## 📱 API Endpoints (Spring Boot - To be implemented)

### Public APIs
- `GET /api/menu` - Get menu items
- `GET /api/gallery` - Get gallery images
- `GET /api/contact` - Get contact information
- `POST /api/booking` - Create booking request
- `POST /api/contact` - Submit contact form

### Admin APIs (Protected)
- `POST /api/admin/login` - Admin authentication
- `POST /api/admin/menu` - Add/update menu items
- `POST /api/admin/gallery` - Upload gallery images
- `DELETE /api/admin/menu/{id}` - Delete menu item
- `DELETE /api/admin/gallery/{id}` - Delete gallery image

## 🎨 Design Features

- **Color Scheme**: Warm amber and orange tones representing hospitality
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Card-based design with proper spacing
- **Animations**: Smooth page transitions and hover effects
- **Mobile-First**: Responsive design for all screen sizes

## 🔒 Security Features

- **Admin Authentication**: Login required for admin features
- **Form Validation**: Client-side and server-side validation
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Sanitization**: Protection against XSS attacks

## 📊 Pro Features (Locked)

The following features show upgrade prompts:
- **Advanced Room Booking Management**
- **Payment Gateway Integration**
- **Multi-language Support** (English, Hindi, Marathi)
- **Reviews & Feedback System**
- **Advanced Analytics & Reports**
- **Booking Calendar Management**

## 🚀 Deployment

### Frontend Deployment
- Build: `npm run build`
- Deploy to: Netlify, Vercel, or any static hosting service

### Backend Deployment
- Package: `./mvnw clean package`
- Deploy to: AWS, Heroku, or any cloud platform

## 📞 Contact Information

- **Phone**: +91 98765 43210
- **Email**: info@hotelkalsubai.com
- **Address**: Near Kalsubai Peak Base, Akole, Ahmednagar, Maharashtra 422601

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Images from Pexels for gallery and backgrounds
- Lucide React for beautiful icons
- Tailwind CSS for rapid styling
- Framer Motion for smooth animations

---

**Note**: This is the frontend implementation. The Spring Boot backend needs to be developed separately according to the API specifications mentioned above.