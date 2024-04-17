import { CSSProperties } from "react";
import { useThemeContext } from "../context/ThemeContext";

interface Props {
  style?: CSSProperties;
  text: string;
  keyFunction: () => void;
}

const Key = ({ style, text, keyFunction }: Props) => {
  const { theme, selectedTheme } = useThemeContext();
  const numberColor = selectedTheme === 2 ? theme.text.light : theme.text.dark;
  const numberKeyClasses = `${numberColor} ${theme.keys.keyTwo} ${theme.keys.keyTwoShadow} ${theme.keys.keyTwoHover}`;

  return (
    <button
      className={`w-full h-14 pt-1 ${numberKeyClasses} text-[30px] leading-none rounded-md md:text-[38px] md:h-16 md:rounded-xl`}
      style={style}
      onClick={keyFunction}
    >
      {text}
    </button>
  );
};

export default Key;
