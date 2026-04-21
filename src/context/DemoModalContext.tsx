"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import type { ModalConfig } from "@/types/lead";

interface DemoModalContextType {
  isOpen: boolean;
  config: ModalConfig;
  open:   (config?: Partial<ModalConfig>) => void;
  close:  () => void;
}

const DEFAULT_CONFIG: ModalConfig = {
  intent: "demo",
  role:   "general",
};

const DemoModalContext = createContext<DemoModalContextType | null>(null);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>(DEFAULT_CONFIG);

  const open = (override?: Partial<ModalConfig>) => {
    setConfig({ ...DEFAULT_CONFIG, ...override });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <DemoModalContext.Provider value={{ isOpen, config, open, close }}>
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) throw new Error("useDemoModal must be used inside DemoModalProvider");
  return ctx;
}
