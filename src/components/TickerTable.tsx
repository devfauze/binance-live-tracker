import React from "react";
import { useBinance } from "../context/BinanceContext";

export const TickerTable: React.FC = () => {
    const { selectedSymbols, tickers, removeSymbol } = useBinance();

    if (selectedSymbols.length === 0)
        return <div style={{ flex: 2 }}>Add symbols to watch price updates.</div>;

    return (
        <div style={{ flex: 2, overflowX: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    minWidth: 450,
                }}
            >
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Last Price</th>
                    <th>Best Bid</th>
                    <th>Best Ask</th>
                    <th>Change %</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {selectedSymbols.map((symbol) => (
                    <tr key={symbol}>
                        <td>{symbol}</td>
                        <td>{tickers[symbol]?.price ?? "--"}</td>
                        <td>{tickers[symbol]?.bidPrice ?? "--"}</td>
                        <td>{tickers[symbol]?.askPrice ?? "--"}</td>
                        <td>
                            {tickers[symbol]?.priceChangePercent !== undefined
                                ? Number(tickers[symbol]!.priceChangePercent).toFixed(2) + " %"
                                : "--"}
                        </td>
                        <td>
                            <button onClick={() => removeSymbol(symbol)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};