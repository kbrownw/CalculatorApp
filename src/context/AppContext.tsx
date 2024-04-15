import { createContext, useContext, useState } from "react";
import { AppContextTypes, MathOperation } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

export const AppContextWrapper = ({ children }: Props) => {
  const [screenData, setScreenData] = useState<string>("0");
  const [total, setTotal] = useState<number>(0);

  const setAndShowTotal = (value: number) => {
    setTotal(value);
    setScreenData(value.toLocaleString());
  };

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

  const runArithmetic = (
    value1: number,
    value2: number,
    operation: MathOperation["operation"]
  ) => {
    if (operation === "+") {
      return value1 + value2;
    } else if (operation === "-") {
      return value1 - value2;
    } else if (operation === "*") {
      return value1 * value2;
    } else if (operation === "/") {
      return value1 / value2;
    } else {
      return 0;
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
        runArithmetic,
        setAndShowTotal,
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
