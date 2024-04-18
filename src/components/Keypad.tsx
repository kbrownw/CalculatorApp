import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useThemeContext } from "../context/ThemeContext";
import Key from "./Key";
import KeyEqual from "./KeyEqual";
import KeyWithText from "./KeyWithText";
import { MathOperation } from "../shared/types";

const Keypad = () => {
  const { total, setTotal, setScreenData } = useAppContext();
  const [prevTotal, setPrevTotal] = useState("0");
  const [operation, setOperation] = useState<"+" | "-" | "*" | "/" | null>(
    null
  );
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");
  const { theme } = useThemeContext();

  const setAndShowTotal = (value: string) => {
    setTotal(dataSizeFix(value));
    setScreenData(dataSizeFix(value));
  };

  const appendData = (value: string) => {
    if (total === "0") {
      if (value === ".") {
        setTotal("0.");
        setScreenData("0.");
      } else if (value === "0") {
        return;
      } else {
        setAndShowTotal(value);
      }
    } else {
      let appendedTotal = total + value;
      if (value === ".") {
        setTotal(dataSizeFix(total) + value);
        setScreenData(dataSizeFix(total) + value);
      } else {
        setAndShowTotal(appendedTotal);
      }
    }
  };

  const dataSizeFix = (value: string) => {
    const numberValue = Number(value);
    if (value.length > 13) {
      if (value.indexOf(".") === -1) {
        return numberValue.toExponential(5);
      } else {
        const valueArr = value.split(".");
        if (valueArr[0].length > 9) {
          return numberValue.toExponential(5);
        } else {
          return numberValue.toFixed(13 - valueArr[0].length);
        }
      }
    } else {
      if (value.indexOf(".") === -1) {
        return numberValue.toString();
      } else {
        const valueArr = value.split(".");
        return numberValue.toFixed(valueArr[1].length);
      }
    }
  };

  const deleteData = () => {
    if (total) {
      let totalArr = total.toString().split("");
      totalArr.pop();
      let newTotal = Number(totalArr.join(""));
      setTotal(dataSizeFix(newTotal.toString()));
      setScreenData(dataSizeFix(newTotal.toString()));
    }
  };

  const runArithmetic = (
    value1: string | number,
    value2: string | number,
    operation: MathOperation["operation"]
  ) => {
    if (operation === "+") {
      return (Number(value1) + Number(value2)).toString();
    } else if (operation === "-") {
      return (Number(value1) - Number(value2)).toString();
    } else if (operation === "*") {
      return (Number(value1) * Number(value2)).toString();
    } else if (operation === "/") {
      return (Number(value1) / Number(value2)).toString();
    } else {
      return "0";
    }
  };

  const numberPress = (value: string) => {
    if (operation) {
      if (operatorLastKey()) {
        setPrevTotal(total);
        if (value === ".") {
          setTotal("0.");
          setScreenData("0.");
        } else {
          setAndShowTotal(value);
        }
      } else {
        appendData(value);
      }
    } else {
      appendData(value);
    }
    setLastKeyPressed(value);
  };

  const operatorLastKey = () => {
    if (
      lastKeyPressed === "+" ||
      lastKeyPressed === "-" ||
      lastKeyPressed === "*" ||
      lastKeyPressed === "/"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const operationFunction = (newOperation: MathOperation["operation"]) => {
    if (lastKeyPressed !== operation) {
      if (operation) {
        setPrevTotal(total);
        setAndShowTotal(runArithmetic(prevTotal, total, operation));
        setOperation(newOperation);
      } else {
        setPrevTotal(total);
        setOperation(newOperation);
      }
    }
    setLastKeyPressed(newOperation);
  };

  return (
    <div
      className={`grid grid-cols-[repeat(4,_minmax(55px,_1fr))] gap-4 p-4 rounded-xl ${theme.backgrounds.toggle}
      md:grid-cols-[repeat(4,_minmax(100px,_1fr))] md:gap-8 md:p-8`}
    >
      <Key
        text="7"
        keyFunction={() => {
          numberPress("7");
        }}
      />
      <Key
        text="8"
        keyFunction={() => {
          numberPress("8");
        }}
      />
      <Key
        text="9"
        keyFunction={() => {
          numberPress("9");
        }}
      />
      <KeyWithText
        text="DEL"
        keyFunction={() => {
          deleteData();
        }}
      />
      <Key
        text="4"
        keyFunction={() => {
          numberPress("4");
        }}
      />
      <Key
        text="5"
        keyFunction={() => {
          numberPress("5");
        }}
      />
      <Key
        text="6"
        keyFunction={() => {
          numberPress("6");
        }}
      />
      <Key
        text="+"
        keyFunction={() => {
          operationFunction("+");
        }}
      />
      <Key
        text="1"
        keyFunction={() => {
          numberPress("1");
        }}
      />
      <Key
        text="2"
        keyFunction={() => {
          numberPress("2");
        }}
      />
      <Key
        text="3"
        keyFunction={() => {
          numberPress("3");
        }}
      />
      <Key
        text="-"
        keyFunction={() => {
          operationFunction("-");
        }}
      />
      <Key
        text="."
        keyFunction={() => {
          if (operatorLastKey()) {
            numberPress(".");
          } else if (!total.includes(".")) {
            numberPress(".");
          }
        }}
      />
      <Key
        text="0"
        keyFunction={() => {
          numberPress("0");
        }}
      />
      <Key
        text="/"
        keyFunction={() => {
          operationFunction("/");
        }}
      />
      <Key
        text="x"
        keyFunction={() => {
          operationFunction("*");
        }}
      />
      <KeyWithText
        text="RESET"
        keyFunction={() => {
          setPrevTotal("0");
          setTotal("0");
          setScreenData("0");
          setOperation(null);
        }}
        style={{ gridColumn: "1/ span 2", width: "auto" }}
      />
      <KeyEqual
        text="="
        keyFunction={() => {
          if (
            lastKeyPressed === "+" ||
            lastKeyPressed === "-" ||
            lastKeyPressed === "*" ||
            lastKeyPressed === "/"
          ) {
            return;
          }
          if (operation) {
            setAndShowTotal(runArithmetic(prevTotal, total, operation));
            setPrevTotal("0");
            setOperation(null);
          }
        }}
      />
    </div>
  );
};

export default Keypad;
