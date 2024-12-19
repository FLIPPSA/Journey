import React, { createContext, useState, useEffect } from 'react';
import { fetchAllDomains, fetchAllTasksets } from './common';

const GlobalDataContext = createContext();

export const GlobalDataProvider = ({ children }) => {
    const [domains, setDomains] = useState(null); 
    const [tasksets, setTasksets] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            const fetchedDomains = await fetchAllDomains();
            const fetchedTasksets = await fetchAllTasksets();
            setDomains(fetchedDomains);
            setTasksets(fetchedTasksets);
        };
        fetchData();
    }, []);

    return (
        <GlobalDataContext.Provider value={{ domains, tasksets }}>
            {children}
        </GlobalDataContext.Provider>
    );
};

export default GlobalDataContext;