// import { useEffect } from 'react';
// import { useEffect, useState } from 'react';
import axios from "axios";
import { createContext, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();


export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";

    const navigate = useNavigate();
    const {user} = useUser();
    const {getToken} = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [ showHotelReg, setShowHotelReg] = useState(false);
    const [searchCities, setSearchCities] = useState([]);

    const fetchUser = async () =>{
        try {
            const token = await getToken();
            if(!token) return;
            console.log("Token",token);
            
            const {data} = await axios.get("/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(data.success){
                setIsOwner(data.role === 'hotelOwner');
                setSearchCities(data.recentSearchCities);
            }else{
                setTimeout(() => {
                    fetchUser()
                }, 5000);   
            }
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if(user){
            fetchUser();
        }
    }, [user]);
    
    const value = {

        currency,
        isOwner,
        setIsOwner,
        showHotelReg,
        setShowHotelReg,
        user,
        getToken,
        navigate,
        axios, searchCities, setSearchCities

    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);