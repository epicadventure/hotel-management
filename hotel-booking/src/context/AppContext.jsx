import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

// Set default Axios base URL
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "$";

    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchCities, setSearchCities] = useState([]);

    const MAX_RETRIES = 3;
    let retryCount = 0;

    const fetchUser = async () => {
        try {
            const token = await getToken();
            console.log("Token !!!! ",token);
            
            if (!token) return;

            const { data } = await axios.get("/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                setSearchCities(data.recentSearchCities || []);
            } else if (retryCount < MAX_RETRIES) {
                retryCount++;
                setTimeout(fetchUser, 5000); // Retry after 5 seconds
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error fetching user data");
        }
    };

    useEffect(() => {
        if (user) {
            fetchUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    

    const value = useMemo(() => ({
        currency,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        user,
        getToken,
        navigate,
        axios,
        searchCities,
        setSearchCities
    }), [currency, isOwner, showHotelReg, user, getToken, navigate, searchCities]);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
