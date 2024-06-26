import { CSSProperties } from "react";
import { useThemeContext } from "../context/ThemeContext";

interface Props {
  style?: CSSProperties;
  text: string;
  keyFunction: () => void;
}

const KeyEqual = ({ style, text, keyFunction }: Props) => {
  const { theme, selectedTheme } = useThemeContext();
  const textColor = selectedTheme === 2 ? theme.text.dark : theme.text.white;
  const keyClasses = `${textColor} ${theme.keys.toggle} ${theme.keys.toggleShadow} ${theme.keys.toggleHover}`;

  return (
    <button
      className={`col-span-2 h-14 pt-1 ${keyClasses} text-[30px] leading-none rounded-md md:text-[32px] md:h-16 md:rounded-xl`}
      style={style}
      onClick={keyFunction}
    >
      {text}
    </button>
  );
};

export default KeyEqual;
