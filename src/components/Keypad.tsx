import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useThemeContext } from "../context/ThemeContext";
import Key from "./Key";
import KeyEqual from "./KeyEqual";
import KeyWithText from "./KeyWithText";
import { MathOperation } from "../shared/types";

const Keypad = () => {
  const {
    appendData,
    deleteData,
    total,
    setTotal,
    setScreenData,
    runArithmetic,
    setAndShowTotal,
  } = useAppContext();
  const [prevTotal, setPrevTotal] = useState(0);
  const [operation, setOperation] = useState<"+" | "-" | "*" | "/" | null>(
    null
  );
  const [lastKeyPressed, setLastKeyPressed] = useState<string>("");
  const { theme } = useThemeContext();

  const numberPress = (value: string) => {
    setLastKeyPressed(value);
    if (operation) {
      setPrevTotal(total);
      // This doesn't work
      if (
        lastKeyPressed === "+" ||
        lastKeyPressed === "-" ||
        lastKeyPressed === "*" ||
        lastKeyPressed === "/"
      ) {
        setAndShowTotal(Number(value));
      } else {
        appendData(value);
      }
      appendData(value);
    } else {
      appendData(value);
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
      className={`grid grid-cols-4 gap-4 p-4 rounded-xl ${theme.backgrounds.toggle}`}
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
      <Key text="+" keyFunction={() => {}} />
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
      <Key text="." keyFunction={() => {}} />
      <Key
        text="0"
        keyFunction={() => {
          numberPress("0");
        }}
      />
      <Key text="/" keyFunction={() => {}} />
      <Key text="x" keyFunction={() => {}} />
      <KeyWithText
        text="RESET"
        keyFunction={() => {
          setPrevTotal(0);
          setTotal(0);
          setScreenData("0");
          setOperation(null);
        }}
        style={{ gridColumn: "1/ span 2", width: "auto" }}
      />
      <KeyEqual
        text="="
        keyFunction={() => {
          if (operation) {
            setAndShowTotal(runArithmetic(prevTotal, total, operation));
            setPrevTotal(0);
            setOperation(null);
          }
        }}
      />
    </div>
  );
};

export default Keypad;
