import { useState, useEffect } from "react";
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
    setTotal(value);
    setScreenData(value.toLocaleString());
  };

  const appendData = (value: string) => {
    if (!total) {
      setScreenData(value);
      setTotal(value);
    } else {
      let appendedTotal = Number(total.toString() + value);
      setScreenData(appendedTotal.toLocaleString());
      setTotal(appendedTotal.toString());
    }
  };

  const deleteData = () => {
    if (total) {
      let totalArr = total.toString().split("");
      totalArr.pop();
      let newTotal = Number(totalArr.join(""));
      setTotal(newTotal.toString());
      setScreenData(newTotal.toLocaleString());
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
      if (
        lastKeyPressed === "+" ||
        lastKeyPressed === "-" ||
        lastKeyPressed === "*" ||
        lastKeyPressed === "/"
      ) {
        setPrevTotal(total);
        setAndShowTotal(value);
      } else {
        appendData(value);
      }
    } else {
      appendData(value);
    }
    setLastKeyPressed(value);
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

  useEffect(() => {
    console.log("Previous Totla: ", prevTotal);
    console.log("Current total: ", total);
    console.log("Operation: ", operation);
  }, [prevTotal, total, operation]);

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
          if (!total.toString().includes(".")) {
            console.log("500.0", (5003930404039321.003223).toExponential(7));
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
