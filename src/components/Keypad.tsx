import { useAppContext } from "../context/AppContext";
import { useThemeContext } from "../context/ThemeContext";
import Key from "./Key";
import KeyWithText from "./KeyWithText";

const Keypad = () => {
  const { appendData, deleteData } = useAppContext();
  const { theme } = useThemeContext();

  return (
    <div
      className={`grid grid-cols-4 gap-4 p-4 rounded-xl ${theme.backgrounds.toggle}`}
    >
      <Key
        text="7"
        keyFunction={() => {
          appendData("7");
        }}
      />
      <Key
        text="8"
        keyFunction={() => {
          appendData("8");
        }}
      />
      <Key
        text="9"
        keyFunction={() => {
          appendData("9");
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
          appendData("4");
        }}
      />
      <Key
        text="5"
        keyFunction={() => {
          appendData("5");
        }}
      />
      <Key
        text="6"
        keyFunction={() => {
          appendData("6");
        }}
      />
      <Key text="+" keyFunction={() => {}} />
      <Key
        text="1"
        keyFunction={() => {
          appendData("1");
        }}
      />
      <Key
        text="2"
        keyFunction={() => {
          appendData("2");
        }}
      />
      <Key
        text="3"
        keyFunction={() => {
          appendData("3");
        }}
      />
      <Key text="-" keyFunction={() => {}} />
      <Key text="." keyFunction={() => {}} />
      <Key
        text="0"
        keyFunction={() => {
          appendData("0");
        }}
      />
      <Key text="/" keyFunction={() => {}} />
      <Key text="x" keyFunction={() => {}} />
    </div>
  );
};

export default Keypad;
