-- Insert default admin user
INSERT IGNORE INTO users (id, username, email, password, created_at, updated_at) 
VALUES (1, 'admin', 'admin@hotelkalsubai.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', NOW(), NOW());

-- Insert admin role
INSERT IGNORE INTO user_roles (user_id, role) VALUES (1, 'ROLE_ADMIN');

-- Insert default contact information
INSERT IGNORE INTO contact_info (id, phone, email, address, whatsapp_number, opening_hours, updated_at)
VALUES (1, '+91 98765 43210', 'info@hotelkalsubai.com', 
        'Near Kalsubai Peak Base, Akole, Ahmednagar, Maharashtra 422601',
        '+91 98765 43210', '24/7 Open - Restaurant: 6:00 AM - 10:00 PM', NOW());

-- Insert sample menu items
INSERT IGNORE INTO menu_items (id, name, category, price, description, image_url, is_available, created_at, updated_at)
VALUES 
(1, 'Paneer Butter Masala', 'veg', 180.00, 'Rich and creamy paneer curry with aromatic spices', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg', true, NOW(), NOW()),
(2, 'Dal Tadka', 'veg', 120.00, 'Yellow lentils tempered with cumin, garlic, and fresh coriander', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', true, NOW(), NOW()),
(3, 'Chicken Biryani', 'nonveg', 220.00, 'Aromatic basmati rice with tender chicken pieces', 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg', true, NOW(), NOW()),
(4, 'Butter Chicken', 'nonveg', 250.00, 'Creamy tomato-based chicken curry with rich butter and cream', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg', true, NOW(), NOW()),
(5, 'Gulab Jamun', 'extras', 60.00, 'Sweet milk dumplings soaked in rose-flavored sugar syrup', 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg', true, NOW(), NOW());

-- Insert sample rooms
INSERT IGNORE INTO rooms (id, name, type, description, price_per_night, max_occupancy, is_available, created_at, updated_at)
VALUES 
(1, 'Mountain View Standard', 'standard', 'Comfortable standard room with beautiful mountain views', 2500.00, 2, true, NOW(), NOW()),
(2, 'Deluxe Valley View', 'deluxe', 'Spacious deluxe room with panoramic valley views', 3500.00, 3, true, NOW(), NOW()),
(3, 'Kalsubai Peak Suite', 'suite', 'Luxurious suite with direct views of Kalsubai Peak', 5000.00, 4, true, NOW(), NOW());

-- Insert room amenities
INSERT IGNORE INTO room_amenities (room_id, amenity) VALUES
(1, 'Free WiFi'), (1, 'Air Conditioning'), (1, 'Mountain View'), (1, 'Private Bathroom'),
(2, 'Free WiFi'), (2, 'Air Conditioning'), (2, 'Valley View'), (2, 'Mini Bar'), (2, 'Balcony'),
(3, 'Free WiFi'), (3, 'Air Conditioning'), (3, 'Peak View'), (3, 'Mini Bar'), (3, 'Balcony'), (3, 'Living Area');

-- Insert room images
INSERT IGNORE INTO room_images (room_id, image_url) VALUES
(1, 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
(1, 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'),
(2, 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg'),
(2, 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
(3, 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'),
(3, 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg');

-- Insert sample gallery images
INSERT IGNORE INTO gallery_images (id, image_url, category, title, description, uploaded_at)
VALUES 
(1, 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', 'Building', 'Hotel Exterior', 'Beautiful exterior view of the hotel', NOW()),
(2, 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg', 'Rooms', 'Comfortable Rooms', 'Well-appointed guest rooms', NOW()),
(3, 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg', 'Restaurant', 'Dining Area', 'Spacious dining area with mountain views', NOW()),
(4, 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg', 'Views', 'Mountain Views', 'Spectacular mountain scenery', NOW());

-- Insert sample blog posts
INSERT IGNORE INTO blog_posts (id, title, content, image_url, author, excerpt, is_published, created_at, updated_at)
VALUES 
(1, 'Kalsubai Trekking Tips', 'Complete guide to trekking Maharashtra''s highest peak...', 'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg', 'Rajesh Patil', 'Essential tips for conquering Kalsubai Peak', true, NOW(), NOW()),
(2, 'Local Attractions Near Kalsubai', 'Discover the hidden gems around our hotel...', 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg', 'Priya Sharma', 'Explore the beautiful attractions near Kalsubai', true, NOW(), NOW());

-- Insert sample feedback
INSERT IGNORE INTO feedback (id, guest_name, guest_email, rating, comment, is_approved, submitted_at)
VALUES 
(1, 'Amit Kumar', 'amit@example.com', 5, 'Amazing experience! Great hospitality and beautiful views.', true, NOW()),
(2, 'Priya Sharma', 'priya@example.com', 4, 'Comfortable stay with excellent food. Highly recommended!', true, NOW()),
(3, 'Rajesh Patil', 'rajesh@example.com', 5, 'Perfect location for Kalsubai trek. Staff was very helpful.', true, NOW());