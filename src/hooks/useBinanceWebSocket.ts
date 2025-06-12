import { useEffect, useRef } from "react";
import { useBinance } from "../context/BinanceContext";

export const useBinanceWebSocket = () => {
    const { selectedSymbols, updateTicker } = useBinance();
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Feche qualquer WebSocket anterior antes de criar um novo
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }

        if (selectedSymbols.length === 0) {
            return; // Nenhum símbolo para acompanhar
        }

        const formatted = selectedSymbols
            .map((sym) => sym.toLowerCase() + "@ticker")
            .join("/");

        const url = `wss://stream.binance.com:9443/stream?streams=${formatted}`;
        ws.current = new window.WebSocket(url);

        ws.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const ticker = data.data || data;
                if (!ticker.s) return;

                updateTicker({
                    symbol: ticker.s,
                    price: ticker.c,
                    bidPrice: ticker.b,
                    askPrice: ticker.a,
                    priceChangePercent: ticker.P,
                });
            } catch (e) {
                // Proteção contra mensagens inesperadas
            }
        };

        ws.current.onerror = (e) => {
            // Opcional: adicione log ou tratamento de erro
        };

        // Cleanup para fechar o WebSocket ao desmontar/ou mudar os símbolos acompanhados
        return () => {
            if (ws.current) {
                ws.current.close();
                ws.current = null;
            }
        };
    }, [selectedSymbols.join(",")]);
};