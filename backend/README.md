# Hotel Kalsubai Gate Point - Backend API

A comprehensive Spring Boot 3.x backend application for Hotel Kalsubai Gate Point management system.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Room Management**: Complete room booking and management system
- **Menu Management**: Restaurant menu with categories and pricing
- **Gallery Management**: Image gallery with categorization
- **Blog System**: Content management for blog posts
- **Feedback System**: Guest reviews and ratings
- **Contact Management**: Contact information and form handling
- **Admin Dashboard**: Complete admin panel for managing all aspects

## 🛠️ Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **MySQL** Database
- **Maven** Build Tool
- **Swagger/OpenAPI** for API Documentation

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hotel-kalsubai-backend
```

### 2. Database Setup
Create a MySQL database:
```sql
CREATE DATABASE hotel_kalsubai;
```

### 3. Configure Application Properties
Update `src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/hotel_kalsubai?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password

# JWT Configuration
app.jwt.secret=your_jwt_secret_key_here
app.jwt.expiration=86400000

# CORS Configuration
app.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

### 4. Build and Run
```bash
# Build the project
mvn clean compile

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

Once the application is running, access the Swagger UI at:
```
http://localhost:8080/swagger-ui/html
```

## 🔐 Default Admin Credentials

- **Username**: `admin`
- **Password**: `hello` (BCrypt encoded in database)

## 📁 Project Structure

```
src/main/java/com/hotelkalsubai/
├── config/              # Configuration classes
├── controller/          # REST Controllers
│   └── admin/          # Admin-specific controllers
├── dto/                # Data Transfer Objects
├── entity/             # JPA Entities
├── repository/         # JPA Repositories
├── security/           # Security configuration
├── service/            # Business logic services
└── HotelKalsubaiApplication.java
```

## 🌐 API Endpoints

### Public Endpoints (No Authentication Required)
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/menu` - Get menu items
- `GET /api/rooms` - Get available rooms
- `GET /api/gallery` - Get gallery images
- `GET /api/blog` - Get blog posts
- `GET /api/feedback` - Get approved feedback
- `POST /api/booking` - Create booking
- `POST /api/contact` - Submit contact form

### Protected Endpoints (Authentication Required)
- `GET /api/user/profile` - Get user profile

### Admin Endpoints (Admin Role Required)
- `GET /api/admin/bookings` - Manage bookings
- `POST /api/admin/rooms` - Add/edit rooms
- `POST /api/admin/menu` - Add/edit menu items
- `POST /api/admin/gallery` - Upload images
- `POST /api/admin/blog` - Create blog posts
- `GET /api/admin/feedback` - Manage feedback

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Role-based Access**: USER and ADMIN roles
- **CORS Configuration**: Configurable cross-origin requests
- **Input Validation**: Comprehensive request validation

## 📊 Database Schema

### Key Entities:
- **User**: User accounts with roles
- **Room**: Hotel room information
- **Booking**: Room reservations
- **MenuItem**: Restaurant menu items
- **BlogPost**: Blog articles
- **GalleryImage**: Photo gallery
- **Feedback**: Guest reviews
- **ContactInfo**: Hotel contact details

## 🧪 Testing

Run tests with:
```bash
mvn test
```

## 🚀 Deployment

### Production Configuration
1. Update `application.properties` for production database
2. Set secure JWT secret
3. Configure proper CORS origins
4. Build production JAR:
```bash
mvn clean package -DskipTests
```

### Docker Deployment (Optional)
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/hotel-kalsubai-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📝 Sample Data

The application includes sample data for:
- Default admin user
- Sample rooms and amenities
- Menu items
- Gallery images
- Blog posts
- Contact information

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and queries:
- Email: info@hotelkalsubai.com
- Phone: +91 98765 43210

---

**Hotel Kalsubai Gate Point** - Your Gateway to Maharashtra's Highest Peak