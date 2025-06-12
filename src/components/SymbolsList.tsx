import React, { useEffect, useState } from "react";
import { useBinance } from "../context/BinanceContext";

export const SymbolsList: React.FC = () => {
    const {
        availableSymbols,
        setAvailableSymbols,
        selectedSymbols,
        addSymbol,
    } = useBinance();
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (availableSymbols.length > 0) return;

        fetch("https://api.binance.com/api/v3/exchangeInfo")
            .then((resp) => resp.json())
            .then((data) => {
                if (data.symbols) {
                    setAvailableSymbols(
                        data.symbols
                            .filter((s: any) => s.status === "TRADING")
                            .map((s: any) => s.symbol)
                    );
                }
            });
        // eslint-disable-next-line
    }, []);

    const filtered = availableSymbols.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ flex: 1, minWidth: 250 }}>
            <h3>All Symbols</h3>
            <input
                placeholder="Search symbol..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", marginBottom: 8 }}
            />
            <ul style={{ maxHeight: 400, overflowY: "auto", padding: 0 }}>
                {filtered.map((symbol) => (
                    <li
                        key={symbol}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            listStyle: "none",
                            padding: "5px 0",
                        }}
                    >
                        <span>{symbol}</span>
                        <button
                            onClick={() => addSymbol(symbol)}
                            disabled={selectedSymbols.includes(symbol)}
                            style={{ marginLeft: 10 }}
                        >
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};