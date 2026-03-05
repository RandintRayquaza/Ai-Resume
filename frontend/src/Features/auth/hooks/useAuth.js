import { useContext } from "react";
import { AuthContext } from "../state/auth.context";
import { login, register, logout, getME } from "../services/auth.api";

const useAuth = () =>{
    const context = useContext(AuthContext);
    const { user, setUser, loading, setloading } = context;

    const setAuthToken = (token) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem("token", token);
        }
    };

    const clearAuthToken = () => {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem("token");
        }
    };

    const handleLogin = async ({ email, password }) => {
        setloading(true);
        try {
            const response = await login({ email, password });

            if (response?.token) {
                setAuthToken(response.token);
                const me = await getME();
                setUser(me?.user ?? null);
                return { ...response, user: me?.user ?? null };
            }

            setUser(response?.user ?? null);
            return response;
      
        }
        catch (error) {
            console.error("Login error:", error);
            throw error;
        }
        finally {
            setloading(false);
        }
    };
    
    const handleRegister = async ({ username, email, password }) => {
        setloading(true);
        try {
            const response = await register({ username, email, password });

            if (response?.token) {
                setAuthToken(response.token);
                const me = await getME();
                setUser(me?.user ?? null);
                return { ...response, user: me?.user ?? null };
            }

            setUser(response?.user ?? null);
            return response;
      
        }
        catch (error) {
            console.error("Register error:", error);
            throw error;
        }
        finally {
            setloading(false);
        }
    };

    const handleLogout = async () => {
        setloading(true);
        try {
            await logout();
            clearAuthToken();
            setUser(null);
        }
        catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
        finally {
            setloading(false);
        }   
    };

    const fetchCurrentUser = async () => {
        setloading(true);
        try {
            const response = await getME();
            setUser(response?.user ?? null);
            return response;
        }
        catch (error) {
            console.error("Fetch current user error:", error);
            throw error;
        }
        finally {
            setloading(false);
        }   
    }

    return { handleLogin , handleRegister, handleLogout, fetchCurrentUser, user, loading };
}

export default useAuth;