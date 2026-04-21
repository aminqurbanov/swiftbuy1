"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type MockRole = "store" | "distributor";

const LEGACY_KEY = "swiftbuy_mock_role";
const SESSION_KEY = "swiftbuy_mock_session_v2";

interface PersistedSession {
  role: MockRole | null;
  distributorCompanyId: string | null;
}

interface MockSessionContextValue {
  role: MockRole | null;
  ready: boolean;
  /** Distribütor üçün şirkət slugu (məs. avrora) */
  distributorCompanyId: string | null;
  setRole: (r: MockRole | null) => void;
  loginAs: (r: MockRole) => void;
  /** Mağaza üçün — şirkət siz */
  loginAsStore: () => void;
  /** Distribütor: e-poçt/paroldan sonra */
  loginDistributorCompany: (companyId: string) => void;
  logout: () => void;
}

const MockSessionContext = createContext<MockSessionContextValue | null>(null);

function readPersisted(): PersistedSession {
  if (typeof window === "undefined") {
    return { role: null, distributorCompanyId: null };
  }
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const p = JSON.parse(raw) as Partial<PersistedSession>;
      if (p.role === "store" || p.role === "distributor") {
        return {
          role: p.role,
          distributorCompanyId:
            typeof p.distributorCompanyId === "string"
              ? p.distributorCompanyId
              : null,
        };
      }
    }
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy === "store" || legacy === "distributor") {
      return {
        role: legacy,
        distributorCompanyId: legacy === "distributor" ? null : null,
      };
    }
  } catch {
    /* ignore */
  }
  return { role: null, distributorCompanyId: null };
}

function writePersisted(s: PersistedSession) {
  try {
    if (s.role === null) {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LEGACY_KEY);
    } else {
      localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      localStorage.setItem(LEGACY_KEY, s.role);
    }
  } catch {
    /* ignore */
  }
}

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<MockRole | null>(null);
  const [distributorCompanyId, setDistributorCompanyId] = useState<
    string | null
  >(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const p = readPersisted();
    queueMicrotask(() => {
      setRoleState(p.role);
      setDistributorCompanyId(p.distributorCompanyId);
      setReady(true);
    });
  }, []);

  const persist = useCallback((r: MockRole | null, companyId: string | null) => {
    writePersisted({ role: r, distributorCompanyId: companyId });
  }, []);

  const setRole = useCallback(
    (r: MockRole | null) => {
      setRoleState(r);
      if (r === null) {
        setDistributorCompanyId(null);
        persist(null, null);
      } else if (r === "store") {
        setDistributorCompanyId(null);
        persist("store", null);
      } else {
        setDistributorCompanyId(null);
        persist("distributor", null);
      }
    },
    [persist]
  );

  const loginAs = useCallback(
    (r: MockRole) => {
      setRoleState(r);
      if (r === "store") {
        setDistributorCompanyId(null);
        persist("store", null);
      } else {
        setDistributorCompanyId(null);
        persist("distributor", null);
      }
    },
    [persist]
  );

  const loginAsStore = useCallback(() => {
    setRoleState("store");
    setDistributorCompanyId(null);
    persist("store", null);
  }, [persist]);

  const loginDistributorCompany = useCallback(
    (companyId: string) => {
      setRoleState("distributor");
      setDistributorCompanyId(companyId);
      persist("distributor", companyId);
    },
    [persist]
  );

  const logout = useCallback(() => {
    setRoleState(null);
    setDistributorCompanyId(null);
    persist(null, null);
  }, [persist]);

  const value = useMemo(
    () => ({
      role,
      ready,
      distributorCompanyId,
      setRole,
      loginAs,
      loginAsStore,
      loginDistributorCompany,
      logout,
    }),
    [
      role,
      ready,
      distributorCompanyId,
      setRole,
      loginAs,
      loginAsStore,
      loginDistributorCompany,
      logout,
    ]
  );

  return (
    <MockSessionContext.Provider value={value}>
      {children}
    </MockSessionContext.Provider>
  );
}

export function useMockSession() {
  const ctx = useContext(MockSessionContext);
  if (!ctx) {
    throw new Error("useMockSession must be used inside MockSessionProvider");
  }
  return ctx;
}
