import React, { createContext, useState } from "react";
import { themes } from "../themes/themes";

export const ThemesShareFormContext = createContext();

export const ThemeProviderShared = ({ children }) => {
  const [theme, setTheme] = useState(themes.default);

  const changeTheme = (newTheme) => {
    setTheme(themes[newTheme]);
  };

  return (
    <ThemesShareFormContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemesShareFormContext.Provider>
  );
};
