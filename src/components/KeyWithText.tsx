import { CSSProperties } from "react";
import { useThemeContext } from "../context/ThemeContext";

interface Props {
  style?: CSSProperties;
  text: string;
  keyFunction: () => void;
}

const KeyWithText = ({ style, text, keyFunction }: Props) => {
  const { theme } = useThemeContext();
  const keyClasses = `${theme.keys.keyOne} ${theme.keys.keyOneShadow} ${theme.text.white}`;

  return (
    <button
      className={`w-14 h-14 text-[20px] pt-1 ${keyClasses} leading-none rounded-md`}
      style={style}
      onClick={keyFunction}
    >
      {text}
    </button>
  );
};

export default KeyWithText;
