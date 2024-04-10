import { useThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { Theme } from "../shared/types";

interface Props {
  textColor: string;
  theme: Theme;
}

const Header = ({ textColor, theme }: Props) => {
  const { setThemeFunction } = useThemeContext();

  return (
    <div className={`flex justify-between items-end ${textColor}`}>
      <h1 className="leading-[0.75]">calc</h1>
      <div className="flex items-end gap-4">
        <p className="text-xs">THEME</p>
        <ThemeToggle theme={theme} setThemeFunction={setThemeFunction} />
      </div>
    </div>
  );
};

export default Header;
