export interface Theme {
  backgrounds: {
    main: string;
    toggle: string;
    screen: string;
  };
  keys: {
    keyOne: string;
    keyOneShadow: string;
    toggle: string;
    toggleShadow: string;
    keyTwo: string;
    keyTwoShadow: string;
  };
  text: {
    light?: string;
    dark?: string;
    white: string;
  };
}

export interface ThemeContextTypes {
  selectedTheme: number;
  setSelectedTheme: (value: number) => void;
  setThemeFunction: () => void;
  theme: Theme;
}
