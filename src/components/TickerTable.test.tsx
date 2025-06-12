import React from "react";
import { render } from "@testing-library/react";
import { BinanceProvider } from "../context/BinanceContext";
import { TickerTable } from "./TickerTable";

test("renders empty ticker table when no symbols", () => {
    const { getByText } = render(
        <BinanceProvider>
            <TickerTable />
        </BinanceProvider>
    );
    expect(getByText(/add symbols to watch/i)).toBeInTheDocument();
});