import { useContext, createContext, useState } from "react";
import { Theme, ThemeContextTypes } from "../shared/types";

interface Props {
  children: React.ReactNode;
}

const darkTheme: Theme = {
  backgrounds: {
    main: "bg-t1-main-bg-dark-blue",
    toggle: "bg-t1-keypad-bg-dark-blue",
    screen: "bg-t1-screen-bg-dark-blue",
  },
  keys: {
    keyOne: "bg-t1-key-bg-dark-blue",
    keyOneHover: "hover:bg-[hsl(223,31%,60%)]",
    keyOneShadow: "shadow-[0_5px_0_0_hsl(224,28%,35%)]",
    toggle: "bg-t1-toggle-bg-red",
    toggleHover: "hover:bg-[hsl(6,63%,65%)]",
    toggleShadow: "shadow-[0_5px_0_0_hsl(6,70%,34%)]",
    keyTwo: "bg-t1-key-bg-light-grayish-orange",
    keyTwoHover: "hover:bg-[hsl(23,16%,100%)]",
    keyTwoShadow: "shadow-[0_5px_0_0_hsl(28,16%,65%)]",
  },
  text: {
    dark: "text-t1-very-dark-grayish-blue",
    white: "text-white",
  },
};

const lightTheme: Theme = {
  backgrounds: {
    main: "bg-t2-main-bg-light-gray",
    toggle: "bg-t2-keypad-bg-grayish-red",
    screen: "bg-t2-screen-bg-very-light-gray",
  },
  keys: {
    keyOne: "bg-t2-key-bg-dark-cyan",
    keyOneShadow: "shadow-[0_5px_0_0_hsl(185,58%,25%)]",
    keyOneHover: "hover:bg-[hsl(185,42%,60%)]",
    toggle: "bg-t2-toggle-bg-orange",
    toggleHover: "hover:bg-[hsl(25,98%,65%)]",
    toggleShadow: "shadow-[0_5px_0_0_hsl(25,99%,27%)]",
    keyTwo: "bg-t2-key-bg-light-grayish-yellow",
    keyTwoHover: "hover:bg-[hsl(45,7%,100%)]",
    keyTwoShadow: "shadow-[0_5px_0_0_hsl(35,11%,61%)]",
  },
  text: {
    dark: "text-t2-very-dark-grayish-yellow",
    white: "text-white",
  },
};

const purpleTheme: Theme = {
  backgrounds: {
    main: "bg-t3-main-bg-dark-violet",
    toggle: "bg-t3-keypad-bg-dark-violet",
    screen: "bg-t3-keypad-bg-dark-violet",
  },
  keys: {
    keyOne: "bg-t3-key-bg-dark-violet",
    keyOneHover: "hover:bg-[hsl(281,89%,50%)]",
    keyOneShadow: "shadow-[0_5px_0_0_hsl(285,91%,52%)]",
    toggle: "bg-t3-toggle-bg-cyan",
    toggleHover: "hover:bg-[hsl(176,100%,65%)]",
    toggleShadow: "shadow-[0_5px_0_0_hsl(177,92%,70%)]",
    keyTwo: "bg-t3-key-bg-very-dark-violet",
    keyTwoHover: "hover:bg-[hsl(268,47%,50%)]",
    keyTwoShadow: "shadow-[0_5px_0_0_hsl(290,70%,36%)]",
  },
  text: {
    light: "text-t3-light-yellow",
    dark: "text-t3-dark-blue",
    white: "text-white",
  },
};

export const ThemeContext = createContext<ThemeContextTypes | undefined>(
  undefined
);

export const ThemeWrapper = ({ children }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState<number>(0);
  const themes: Theme[] = [darkTheme, lightTheme, purpleTheme];
  const theme: Theme = themes[selectedTheme];

  const setThemeFunction = () => {
    if (selectedTheme > 1) {
      setSelectedTheme(0);
      localStorage.setItem("theme", "0");
    } else {
      setSelectedTheme(selectedTheme + 1);
      localStorage.setItem("theme", (selectedTheme + 1).toString());
    }
  };

  return (
    <ThemeContext.Provider
      value={{ selectedTheme, setSelectedTheme, setThemeFunction, theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const isThemeContext = useContext(ThemeContext);

  if (!isThemeContext) {
    throw new Error(
      "useThemeContext must be used inside the ThemeContextWrapper element."
    );
  }

  return isThemeContext;
};
