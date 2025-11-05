import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { WishlistItem, Product } from '../types';

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
}

type WishlistAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ITEMS'; payload: WishlistItem[] }
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
} | null>(null);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ITEMS':
      return { ...state, items: action.payload, isLoading: false };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.product.id !== action.payload) };
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    isLoading: false
  });

  const { state: authState } = useAuth();

  useEffect(() => {
    if (!authState.isAuthenticated || !authState.user) {
      dispatch({ type: 'SET_ITEMS', payload: [] });
      return;
    }

    loadWishlist();
  }, [authState.isAuthenticated, authState.user]);

  const loadWishlist = async () => {
    if (!authState.user) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials not configured');
        dispatch({ type: 'SET_ITEMS', payload: [] });
        return;
      }

      const response = await fetch(`${supabaseUrl}/rest/v1/wishlists?user_id=eq.${authState.user.id}&select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const wishlistItems: WishlistItem[] = data.map((item: any) => ({
          product: item.product_data,
          addedAt: new Date(item.added_at)
        }));
        dispatch({ type: 'SET_ITEMS', payload: wishlistItems });
      } else {
        dispatch({ type: 'SET_ITEMS', payload: [] });
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      dispatch({ type: 'SET_ITEMS', payload: [] });
    }
  };

  const addToWishlist = async (product: Product) => {
    if (!authState.user) {
      console.warn('User must be authenticated to add to wishlist');
      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials not configured');
        return;
      }

      const wishlistItem = {
        user_id: authState.user.id,
        product_id: product.id,
        product_data: product,
        added_at: new Date().toISOString()
      };

      const response = await fetch(`${supabaseUrl}/rest/v1/wishlists`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(wishlistItem)
      });

      if (response.ok) {
        dispatch({
          type: 'ADD_ITEM',
          payload: {
            product,
            addedAt: new Date()
          }
        });
      } else {
        const errorText = await response.text();
        console.error('Error adding to wishlist:', errorText);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (!authState.user) return;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials not configured');
        return;
      }

      const response = await fetch(
        `${supabaseUrl}/rest/v1/wishlists?user_id=eq.${authState.user.id}&product_id=eq.${productId}`,
        {
          method: 'DELETE',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        dispatch({ type: 'REMOVE_ITEM', payload: productId });
      } else {
        console.error('Error removing from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId: string) => {
    return state.items.some(item => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider value={{
      state,
      dispatch,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
