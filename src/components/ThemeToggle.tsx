import { Theme } from "../shared/types";

interface Props {
  theme: Theme;
  setThemeFunction: () => void;
}

const ThemeToggle = ({ theme, setThemeFunction }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-[11px] justify-center text-sm">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <button
        onClick={setThemeFunction}
        className={`h-5 w-[47px] rounded-full ${theme.backgrounds.toggle}`}
      >
        <div className={`h-4 w-4 rounded-full ${theme.keys.toggle}`}></div>
      </button>
    </div>
  );
};

export default ThemeToggle;
