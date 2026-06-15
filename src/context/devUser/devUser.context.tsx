"use client";

import { createContext, useContext, useState } from "react";

type DevProfile = {
    id: string;
    name: string;
};

const DEV_PROFILES: DevProfile[] = [
    { id: "admin", name: "Administrador" },
    { id: "user", name: "Usuário" },
    { id: "viewer", name: "Visualizador" },
];

type DevUserContextData = {
    activeProfile: DevProfile;
    profiles: DevProfile[];
    setActiveProfile: (profile: DevProfile) => void;
};

const DevUserContext = createContext<DevUserContextData>({} as DevUserContextData);

export function DevUserProvider({ children }: { children: React.ReactNode }) {
    const [activeProfile, setActiveProfile] = useState<DevProfile>(DEV_PROFILES[0]);

    return (
        <DevUserContext.Provider value={{ activeProfile, profiles: DEV_PROFILES, setActiveProfile }}>
            {children}
        </DevUserContext.Provider>
    );
}

export function useDevUser() {
    return useContext(DevUserContext);
}
