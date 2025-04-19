import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

interface GlobalIterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void
}

export const GlobalContext = createContext<GlobalIterface | undefined>(
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) throw new Error("useGlobals whithit Provider ");
    return context;
}

