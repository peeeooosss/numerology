"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { ToolResult } from "./tool-types";

interface ToolState {
  result: ToolResult | null;
  setResult: (r: ToolResult | null) => void;
}

const ToolContext = createContext<ToolState>({ result: null, setResult: () => {} });

export function useToolContext() {
  return useContext(ToolContext);
}

export function ToolProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<ToolResult | null>(null);
  return (
    <ToolContext.Provider value={{ result, setResult }}>
      {children}
    </ToolContext.Provider>
  );
}
