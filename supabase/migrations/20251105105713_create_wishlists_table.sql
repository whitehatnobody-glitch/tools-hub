/*
  # Create Wishlists Table
  
  1. New Tables
    - `wishlists`
      - `id` (uuid, primary key) - Unique identifier for the wishlist item
      - `user_id` (uuid, not null) - Reference to the user who added the item
      - `product_id` (text, not null) - ID of the product
      - `product_data` (jsonb, not null) - Complete product information
      - `added_at` (timestamptz, default now()) - Timestamp when item was added
      - Unique constraint on (user_id, product_id) to prevent duplicates
  
  2. Security
    - Enable RLS on `wishlists` table
    - Add policy for authenticated users to view their own wishlist items
    - Add policy for authenticated users to add items to their wishlist
    - Add policy for authenticated users to delete items from their wishlist
*/

-- Create wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id text NOT NULL,
  product_data jsonb NOT NULL,
  added_at timestamptz DEFAULT now(),
  CONSTRAINT wishlists_user_product_unique UNIQUE (user_id, product_id)
);

-- Enable RLS
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own wishlist items
CREATE POLICY "Users can view own wishlist items"
  ON wishlists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can add items to their own wishlist
CREATE POLICY "Users can add to own wishlist"
  ON wishlists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete items from their own wishlist
CREATE POLICY "Users can delete from own wishlist"
  ON wishlists
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_added_at ON wishlists(added_at DESC);