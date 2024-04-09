import { useContext, createContext, useState } from "react";
import { Theme, ThemeContextTypes } from "../shared/types";

const darkTheme: Theme = {
  backgrounds: {
    main: "bg-t1-main-bg-dark-blue",
    toggle: "bg-t1-keypad-bg-dark-blue",
    screen: "bg-t1-screen-bg-dark-blue",
  },
  keys: {
    keyOne: "bg-t1-key-bg-dark-blue",
    keyOneShadow: "t1-key-shadow-dark-blue",
    toggle: "bg-t1-toggle-bg-red",
    toggleShadow: "t1-key-shadow-dar-red",
    keyTwo: "bg-t1-key-bg-light-grayish-orange",
    keyTwoShadow: "t1-key-shadow-grayish-orange",
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
    keyOneShadow: "t2-key-shadow-very-dark-cyan",
    toggle: "bg-t2-toggle-bg-orange",
    toggleShadow: "t2-key-shadow-dark-orange",
    keyTwo: "bg-t2-key-bg-light-grayish-yellow",
    keyTwoShadow: "t2-key-shadow-dark-grayish-orange",
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
    keyOneShadow: "t3-key-shadow-magenta",
    toggle: "bg-t3-toggle-bg-cyan",
    toggleShadow: "t3-key-shadow-cyan",
    keyTwo: "bg-t3-key-bg-dark-violet",
    keyTwoShadow: "t3-key-shadow-magenta",
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
      "useThemeContext must be used inside the ThmeContextWrapper element."
    );
  }

  return isThemeContext;
};

interface Props {
  children: React.ReactNode;
}
