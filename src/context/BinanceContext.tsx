import React, { createContext, useContext, useState, ReactNode } from "react";

export type SymbolTicker = {
    symbol: string;
    price: string;
    bidPrice: string;
    askPrice: string;
    priceChangePercent: string;
};

type BinanceContextType = {
    availableSymbols: string[];
    selectedSymbols: string[];
    tickers: Record<string, SymbolTicker | undefined>;
    setAvailableSymbols: (symbols: string[]) => void;
    addSymbol: (symbol: string) => void;
    removeSymbol: (symbol: string) => void;
    updateTicker: (ticker: SymbolTicker) => void;
};

const BinanceContext = createContext<BinanceContextType | undefined>(undefined);

export const useBinance = () => {
    const context = useContext(BinanceContext);
    if (!context)
        throw new Error("useBinance must be used within BinanceProvider");
    return context;
};

export const BinanceProvider = ({ children }: { children: ReactNode }) => {
    const [availableSymbols, setAvailableSymbols] = useState<string[]>([]);
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
    const [tickers, setTickers] = useState<Record<string, SymbolTicker>>({});

    const addSymbol = (symbol: string) => {
        setSelectedSymbols((prev) =>
            prev.includes(symbol) ? prev : [...prev, symbol]
        );
    };

    const removeSymbol = (symbol: string) => {
        setSelectedSymbols((prev) => prev.filter((s) => s !== symbol));
        setTickers((prev) => {
            const updated = { ...prev };
            delete updated[symbol];
            return updated;
        });
    };

    const updateTicker = (ticker: SymbolTicker) => {
        setTickers((prev) => ({ ...prev, [ticker.symbol]: ticker }));
    };

    return (
        <BinanceContext.Provider
            value={{
                availableSymbols,
                setAvailableSymbols,
                selectedSymbols,
                addSymbol,
                removeSymbol,
                tickers,
                updateTicker,
            }}
        >
            {children}
        </BinanceContext.Provider>
    );
};