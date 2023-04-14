import React, { createContext, ReactNode, useContext, useState } from 'react';

const StateContext = createContext({} as any);

export const StateContextProvider = ({ children }: { children: ReactNode }) => {

    const [newVoter, setNewVoter] = useState({
        isActive: false,
        fName: "",
        lName: "",
        aadhaar: "",
        voterid: "",
        phone: ""
    });

    return (
        <StateContext.Provider value={
            {
                newVoter,
                setNewVoter
            }
        }>
            {children}
        </StateContext.Provider>
    );
};


export const useStateContext = () => useContext(StateContext);