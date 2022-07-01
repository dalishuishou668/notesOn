import { useState, useContext, createContext } from 'react';

export const SetviewContext = createContext();

export const useSetview = () => useContext(SetviewContext);

export default function SetviewProvider({ children }){
    const [view, setView] = useState(false);

    return (
        <SetviewContext.Provider
            value={{ view, setView }}
        >
            {children}
        </SetviewContext.Provider>
    )
}
