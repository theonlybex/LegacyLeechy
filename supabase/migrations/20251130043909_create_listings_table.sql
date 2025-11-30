/*
  # Create listings table for marketplace

  1. New Tables
    - `listings`
      - `id` (uuid, primary key) - Unique identifier for each listing
      - `title` (text) - Listing title
      - `description` (text) - Detailed description of the item
      - `price` (decimal) - Price of the item
      - `category` (text) - Category name (Electronics, Fashion & Accessories, etc.)
      - `image_url` (text) - URL to the item image
      - `condition` (text) - Item condition (New, Like New, Good, Fair)
      - `location` (text) - Location of the item
      - `created_at` (timestamptz) - When the listing was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `listings` table
    - Add policy for anyone to read listings (public marketplace)
*/

CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price decimal(10, 2) NOT NULL,
  category text NOT NULL,
  image_url text,
  condition text DEFAULT 'Good',
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view listings"
  ON listings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert sample data
INSERT INTO listings (title, description, price, category, image_url, condition, location) VALUES
  ('iPhone 14 Pro', 'Latest iPhone in excellent condition with original box and accessories', 899.99, 'Electronics', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'San Francisco, CA'),
  ('MacBook Pro 16"', 'M2 Pro chip, 32GB RAM, 1TB SSD. Perfect for developers', 2499.00, 'Electronics', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'New York, NY'),
  ('Sony WH-1000XM5', 'Premium noise-canceling headphones with case', 349.99, 'Electronics', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Los Angeles, CA'),
  ('iPad Air 2024', 'Latest iPad Air with Apple Pencil included', 649.00, 'Electronics', 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600', 'New', 'Austin, TX'),
  ('Designer Leather Jacket', 'Genuine leather jacket from premium brand, size M', 299.99, 'Fashion & Accessories', 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Miami, FL'),
  ('Luxury Watch Collection', 'Vintage automatic watch in perfect condition', 1200.00, 'Fashion & Accessories', 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'Chicago, IL'),
  ('Designer Sunglasses', 'Ray-Ban Aviator sunglasses with case', 120.00, 'Fashion & Accessories', 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Seattle, WA'),
  ('Garden Furniture Set', 'Complete outdoor patio set with 6 chairs and table', 450.00, 'Home & Garden', 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Portland, OR'),
  ('Modern Floor Lamp', 'Scandinavian design floor lamp, perfect condition', 89.99, 'Home & Garden', 'https://images.pexels.com/photos/1910472/pexels-photo-1910472.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'Denver, CO'),
  ('Indoor Plant Collection', 'Set of 5 large indoor plants with decorative pots', 150.00, 'Home & Garden', 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Boston, MA'),
  ('Mountain Bike', 'Trek mountain bike with full suspension, barely used', 800.00, 'Sports & Outdoors', 'https://images.pexels.com/photos/3945636/pexels-photo-3945636.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'Boulder, CO'),
  ('Camping Tent', '4-person tent with rainfly and stakes included', 120.00, 'Sports & Outdoors', 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Phoenix, AZ'),
  ('Rare Book Collection', 'First edition classics in excellent condition', 450.00, 'Books & Media', 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Philadelphia, PA'),
  ('Vinyl Record Player', 'Vintage turntable with modern features', 280.00, 'Books & Media', 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'Nashville, TN'),
  ('Gaming Console Bundle', 'PlayStation 5 with 3 games and extra controller', 550.00, 'Collectibles', 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=600', 'Like New', 'San Diego, CA'),
  ('Vintage Camera', 'Classic 35mm film camera in working condition', 320.00, 'Collectibles', 'https://images.pexels.com/photos/821748/pexels-photo-821748.jpeg?auto=compress&cs=tinysrgb&w=600', 'Good', 'Atlanta, GA');
