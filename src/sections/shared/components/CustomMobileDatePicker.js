import React, { useContext } from "react";
import { styled } from "@mui/system";
import { ThemesShareFormContext } from "../context/themeContext";
import { MobileDatePicker } from "@mui/x-date-pickers";

const CustomMobileDatePicker = styled(MobileDatePicker)(({ theme }) => ({
  "& .MuiInputBase-input": {
    color: theme.textFieldColorText, // Usando a cor primária do tema
  },
  "& .MuiInputLabel-root": {
    color: theme.textFieldColorLabel, // Usando a cor primária do tema
  },
}));

const ThemedMobileDatePicker = (props) => {
  const { theme } = useContext(ThemesShareFormContext);

  return <CustomMobileDatePicker theme={theme} {...props} />;
};

export default ThemedMobileDatePicker;
