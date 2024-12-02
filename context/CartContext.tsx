import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuthContext } from "./AuthContext";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  spicyLevel: number;
  toppings: [];
  sideOptions: [];
}

interface CartContextType {
  cart: Product[];
  deliveryFee: number;
  setDeliveryFee: (fee: number) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
// const { user } = useAuthContext();

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const userId = 12456773;
  // user?.userId;
  const [cart, setCart] = useState<Product[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Load cart from SecureStore based on userId
  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        setCart([]);
        return;
      }

      try {
        const storedCart = await SecureStore.getItemAsync(`cart_${userId}`);
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        } else {
          setCart([]); // Initialize an empty cart for a new user
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, [userId]);

  // Save cart to SecureStore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (!userId) return; // Skip saving if no user is logged in

      try {
        await SecureStore.setItemAsync(`cart_${userId}`, JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };

    saveCart();
  }, [cart, userId]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove a product from the cart
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update the quantity of a product in the cart
  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        deliveryFee,
        addToCart,
        removeFromCart,
        updateQuantity,
        setDeliveryFee,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
