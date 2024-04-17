import { createContext, useContext, useState } from "react";
import { AppContextTypes } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextWrapper = ({ children }: Props) => {
  const [screenData, setScreenData] = useState<string>("0");
  const [total, setTotal] = useState<string>("0");

  return (
    <AppContext.Provider
      value={{
        screenData,
        setScreenData,
        total,
        setTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const isAppContext = useContext(AppContext);

  if (!isAppContext) {
    throw new Error(
      "useAppContext must be used inside the AppContextWrapper element."
    );
  }

  return isAppContext;
};
