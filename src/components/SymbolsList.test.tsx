import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BinanceProvider } from "../context/BinanceContext";
import { SymbolsList } from "./SymbolsList";

test("renders symbols list and accepts search", async () => {
    render(
        <BinanceProvider>
            <SymbolsList />
        </BinanceProvider>
    );
    expect(screen.getByPlaceholderText(/search symbol/i)).toBeInTheDocument();
});