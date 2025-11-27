import { createContext, useContext, useState, type ReactNode } from 'react';

interface MagicContextType {
    isMagicMode: boolean;
    toggleMagicMode: () => void;
}

const MagicContext = createContext<MagicContextType | undefined>(undefined);

export const MagicProvider = ({ children }: { children: ReactNode }) => {
    const [isMagicMode, setIsMagicMode] = useState(false);

    const toggleMagicMode = () => {
        setIsMagicMode(prev => !prev);
    };

    return (
        <MagicContext.Provider value={{ isMagicMode, toggleMagicMode }}>
            {children}
        </MagicContext.Provider>
    );
};

export const useMagic = () => {
    const context = useContext(MagicContext);
    if (context === undefined) {
        throw new Error('useMagic must be used within a MagicProvider');
    }
    return context;
};
