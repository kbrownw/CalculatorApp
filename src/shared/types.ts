export interface Theme {
  backgrounds: {
    main: string;
    toggle: string;
    screen: string;
  };
  keys: {
    keyOne: string;
    keyOneHover: string;
    keyOneShadow: string;
    toggle: string;
    toggleHover: string;
    toggleShadow: string;
    keyTwo: string;
    keyTwoHover: string;
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

export interface AppContextTypes {
  screenData: string;
  setScreenData: (value: string) => void;
  total: string;
  setTotal: (value: string) => void;
}

export interface MathOperation {
  operation: "+" | "-" | "*" | "/";
}
