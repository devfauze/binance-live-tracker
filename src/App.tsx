import React from "react";
import "./App.css"
import { BinanceProvider } from "./context/BinanceContext";
import { SymbolsList } from "./components/SymbolsList";
import { TickerTable } from "./components/TickerTable";
import { useBinanceWebSocket } from "./hooks/useBinanceWebSocket";

const Main: React.FC = () => {
  useBinanceWebSocket();

  return (
      <div className="app-root">
        <header>
          <h2>Binance Live Ticker</h2>
        </header>
        <main className="layout">
          <div className="panel">
            <SymbolsList />
          </div>
          <div className="panel">
            <TickerTable />
          </div>
        </main>
        <footer style={{ textAlign: "center", padding: 10, fontSize: 12 }}>
          <i>Test mini-app for Binance WebSocket</i>
        </footer>
      </div>
  );
};

const App = () => (
    <BinanceProvider>
      <Main />
    </BinanceProvider>
);

export default App;