import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { ThemesShareFormContext } from "../context/themeContext";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.textFieldColorText, // Usando a cor primária do tema
  },
  "& .MuiInputLabel-root": {
    color: theme.textFieldColorLabel, // Usando a cor primária do tema
  },
  "& .MuiInputLabel-root:hover": {
    color: theme.textFieldColorLabelHover, // Usando a cor primária do tema
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.textFieldColorLabelFocused, // Usando a cor primária do tema
  },
  "& .MuiFilledInput-root:hover": {
    backgroundColor: theme.textFieldColorHover, // Cor de fundo do input
    color: "#fff", // Usando a cor primária do tema
  },
}));

const ThemedTextField = (props) => {
  const { theme } = useContext(ThemesShareFormContext);

  return <CustomTextField theme={theme} {...props} />;
};

export default ThemedTextField;
