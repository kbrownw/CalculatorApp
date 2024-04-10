import { createContext, useContext, useState } from "react";
import { AppContextTypes } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextWrapper = ({ children }: Props) => {
  const [screenData, setScreenData] = useState<string>("0");
  const [total, setTotal] = useState<number>(0);

  const appendData = (value: string) => {
    if (!total) {
      setScreenData(value);
      setTotal(Number(value));
    } else {
      let appendedTotal = Number(total.toString() + value);
      setScreenData(appendedTotal.toLocaleString());
      setTotal(appendedTotal);
    }
  };

  const deleteData = () => {
    if (total) {
      let totalArr = total.toString().split("");
      totalArr.pop();
      let newTotal = Number(totalArr.join(""));
      setTotal(newTotal);
      setScreenData(newTotal.toLocaleString());
    }
  };

  return (
    <AppContext.Provider
      value={{
        screenData,
        setScreenData,
        total,
        setTotal,
        appendData,
        deleteData,
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
