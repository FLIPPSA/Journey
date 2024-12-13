import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const loadUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;