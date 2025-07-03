-- Insert default admin user
INSERT INTO users (username, email, password, is_email_verified, created_at, updated_at) 
VALUES ('admin', 'admin@hotel.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert admin role
INSERT INTO user_roles (user_id, role) 
SELECT u.id, 'ROLE_ADMIN' FROM users u WHERE u.email = 'admin@hotel.com'
ON CONFLICT DO NOTHING;

-- Insert user role for admin
INSERT INTO user_roles (user_id, role) 
SELECT u.id, 'ROLE_USER' FROM users u WHERE u.email = 'admin@hotel.com'
ON CONFLICT DO NOTHING;

-- Insert default contact information
INSERT INTO contact_info (phone, email, address, whatsapp_number, opening_hours, updated_at)
VALUES ('+91 98765 43210', 'info@hotelkalsubai.com', 
        'Near Kalsubai Peak Base, Akole, Ahmednagar, Maharashtra 422601',
        '+91 98765 43210', '24/7 Open - Restaurant: 6:00 AM - 10:00 PM', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, category, price, description, image_url, is_available, created_at, updated_at)
VALUES 
('Paneer Butter Masala', 'veg', 180.00, 'Rich and creamy paneer curry with aromatic spices', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, NOW(), NOW()),
('Dal Tadka', 'veg', 120.00, 'Yellow lentils tempered with cumin, garlic, and fresh coriander', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', true, NOW(), NOW()),
('Chicken Biryani', 'nonveg', 220.00, 'Aromatic basmati rice with tender chicken pieces', 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg', true, NOW(), NOW()),
('Butter Chicken', 'nonveg', 250.00, 'Creamy tomato-based chicken curry with rich butter and cream', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', true, NOW(), NOW()),
('Gulab Jamun', 'extras', 60.00, 'Sweet milk dumplings soaked in rose-flavored sugar syrup', 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample rooms
INSERT INTO rooms (name, type, description, price_per_night, max_occupancy, is_available, created_at, updated_at)
VALUES 
('Mountain View Standard', 'standard', 'Comfortable standard room with beautiful mountain views', 2500.00, 2, true, NOW(), NOW()),
('Deluxe Valley View', 'deluxe', 'Spacious deluxe room with panoramic valley views', 3500.00, 3, true, NOW(), NOW()),
('Kalsubai Peak Suite', 'suite', 'Luxurious suite with direct views of Kalsubai Peak', 5000.00, 4, true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample gallery images
INSERT INTO gallery_images (image_url, category, title, description, uploaded_at)
VALUES 
('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', 'Building', 'Hotel Exterior', 'Beautiful exterior view of the hotel', NOW()),
('https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg', 'Rooms', 'Comfortable Rooms', 'Well-appointed guest rooms', NOW()),
('https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg', 'Restaurant', 'Dining Area', 'Spacious dining area with mountain views', NOW()),
('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 'Views', 'Mountain Views', 'Spectacular mountain scenery', NOW())
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, image_url, author, excerpt, is_published, created_at, updated_at)
VALUES 
('Kalsubai Trekking Tips', 'Complete guide to trekking Maharashtra''s highest peak...', 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg', 'Rajesh Patil', 'Essential tips for conquering Kalsubai Peak', true, NOW(), NOW()),
('Local Attractions Near Kalsubai', 'Discover the hidden gems around our hotel...', 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg', 'Priya Sharma', 'Explore the beautiful attractions near Kalsubai', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample feedback
INSERT INTO feedback (guest_name, guest_email, rating, comment, is_approved, submitted_at)
VALUES 
('Amit Kumar', 'amit@example.com', 5, 'Amazing experience! Great hospitality and beautiful views.', true, NOW()),
('Priya Sharma', 'priya@example.com', 4, 'Comfortable stay with excellent food. Highly recommended!', true, NOW()),
('Rajesh Patil', 'rajesh@example.com', 5, 'Perfect location for Kalsubai trek. Staff was very helpful.', true, NOW())
ON CONFLICT DO NOTHING;