"use client";

import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
    return Object.entries(obj).reduce((acc, [key, val]) => {
        const fullKey = prefix ? `${prefix}-${key}` : key;
        if (typeof val === "string" || typeof val === "number") {
            acc[fullKey] = String(val);
        } else if (val !== null && typeof val === "object") {
            Object.assign(acc, flattenObject(val as Record<string, unknown>, fullKey));
        }
        return acc;
    }, {} as Record<string, string>);
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        const flat = flattenObject(theme as unknown as Record<string, unknown>, "theme");
        Object.entries(flat).forEach(([key, val]) => {
            document.documentElement.style.setProperty(`--${key}`, val);
        });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
