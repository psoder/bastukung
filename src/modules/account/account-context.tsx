import { createContext, ReactNode, useContext } from "react";
import { Booking, Family, User } from "types";

type AccountContextType = {
  user: User;
  bookings: Booking[];
  family?: Family;
};

const AccountContext = createContext<AccountContextType | undefined>(undefined);

const AccountContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: AccountContextType;
}) => {
  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};

const useAccountContext = () => {
  const accountContext = useContext(AccountContext);
  if (!accountContext) {
    throw new Error(
      "useAccountContext must be used whithin a AccountContextProvider."
    );
  }
  return accountContext;
};

export { useAccountContext, AccountContextProvider };
