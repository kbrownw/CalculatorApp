import { useEffect } from "react";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { theme, setSelectedTheme, setThemeFunction } = useThemeContext();
  const backgroundColor = theme.backgrounds.main;
  const systemDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const storedTheme = localStorage.getItem("theme");

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
    <main
      className={`flex items-center min-h-[100vh] ${backgroundColor} font-LeagueSpartan text-[32px]`}
    >
      <button
        className=" h-14 mx-auto bg-orange-300"
        onClick={setThemeFunction}
      >
        Change Background
      </button>
    </main>
  );
}

export default App;
