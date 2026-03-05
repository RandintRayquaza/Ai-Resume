import { useContext } from "react";
import { AuthContext } from "../state/auth.context";
import {login,register,logout,getME} from "../services/auth.service"
const useAuth = () =>{
    const context = useContext(AuthContext);
    const { user, setUser, loading, setloading } = context;
    

    const handleLogin = async (email, password) => {
        setloading(true);
        try {
            const response = await login(email, password);
            setUser(response.data.user);
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
    
    const handleRegister = async (name,email, password) => {
        setloading(true);
        try {
            const response = await register(name,email, password);
            setUser(response.data.user);
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
            setUser(response.data.user);
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