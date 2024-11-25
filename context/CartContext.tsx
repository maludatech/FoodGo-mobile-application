import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [deliveryFee, setDeliveryFee] = useState(0);

  // Initialize cart from SecureStore
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await SecureStore.getItemAsync("cart");
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    };

    loadCart();
  }, []);

  // Save cart to SecureStore whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await SecureStore.setItemAsync("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart:", error);
      }
    };

    saveCart();
  }, [cart]);

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
  console.log("Cart:", cart);

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
