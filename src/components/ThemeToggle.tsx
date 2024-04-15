import { Theme } from "../shared/types";
import { motion } from "framer-motion";

interface Props {
  theme: Theme;
  setThemeFunction: () => void;
  selectedTheme: number;
}

const ThemeToggle = ({ theme, setThemeFunction, selectedTheme }: Props) => {
  const switchPositionArr = [{ x: "0" }, { x: "14px" }, { x: "33px" }];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-[11px] justify-center text-sm">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
      <button
        onClick={setThemeFunction}
        className={`relative h-5 w-[47px] rounded-full ${theme.backgrounds.toggle}`}
      >
        <motion.div
          initial={switchPositionArr[selectedTheme]}
          animate={switchPositionArr[selectedTheme]}
          className={`absolute top-[2px] h-4 w-4 rounded-full ${theme.keys.toggle}`}
        ></motion.div>
      </button>
    </div>
  );
};

export default ThemeToggle;
