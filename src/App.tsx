import { useEffect, useState } from "react";
import { useThemeContext } from "./context/ThemeContext";
import Header from "./components/Header";
import Screen from "./components/Screen";
import Keypad from "./components/Keypad";

function App() {
  const { theme, selectedTheme, setSelectedTheme } = useThemeContext();
  const backgroundColor = theme.backgrounds.main;
  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedTheme = localStorage.getItem("theme");
  const [textColor, setTextColor] = useState<string>("");

  useEffect(() => {
    if (selectedTheme != undefined) {
      if (selectedTheme === 0) {
        setTextColor(theme.text.white);
      } else if (selectedTheme === 1 && theme.text.dark) {
        setTextColor(theme.text.dark);
      } else {
        if (theme.text.light) {
          setTextColor(theme.text.light);
        }
      }
    }
  }, [selectedTheme]);

  useEffect(() => {
    if (storedTheme) {
      setSelectedTheme(Number(storedTheme));
    } else if (systemDarkMode) {
      setSelectedTheme(0);
    } else {
      setSelectedTheme(1);
    }
  }, []);

  return (
    <div
      className={`flex items-center min-h-[100vh] ${backgroundColor} font-LeagueSpartan text-[32px]`}
    >
      <main className="flex flex-col gap-6 max-w-[750px] mx-auto">
        <Header theme={theme} textColor={textColor} />
        <Screen theme={theme} textColor={textColor} />
        <Keypad />
      </main>
    </div>
  );
}

export default App;
