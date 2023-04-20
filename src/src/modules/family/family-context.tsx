import { createContext, ReactNode, useContext } from "react";
import { Family } from "@/types";

type FamilyContextType = Family;

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

const FamilyProvider = ({ children, value }: { children: ReactNode; value: FamilyContextType }) => {
    return <FamilyContext.Provider value={value}>{children}</FamilyContext.Provider>;
};

const useFamily = () => {
    const familyContext = useContext(FamilyContext);
    if (!familyContext) {
        throw new Error("useFamily must be inside of a FamilyProvider.");
    }
    return familyContext;
};

export { FamilyProvider, useFamily };
