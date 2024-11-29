import {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

interface User {
  userId: string;
  fullName: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  deliveryAddress: string;
}

interface AuthContextType {
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
}

// Define action types for better type checking in the reducer
type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Initialize the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Define the reducer function with appropriate types
export const authReducer = (
  state: { user: User | null },
  action: AuthAction
) => {
  switch (action.type) {
    case "LOGIN":
      SecureStore.setItemAsync("isLoggedIn", "true");
      AsyncStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload }; // Update user state
    case "LOGOUT":
      SecureStore.deleteItemAsync("isLoggedIn");
      AsyncStorage.removeItem("user");
      return { ...state, user: null }; // Set user to null
    default:
      return state; // Return current state for unrecognized action types
  }
};

// Initializer function to retrieve user from AsyncStorage
const getInitialUserState = async () => {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Define the context provider
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    // Retrieve user state from AsyncStorage on component mount
    const initializeUser = async () => {
      const user = await getInitialUserState();
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    };

    initializeUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
