import { Select } from "@mui/material";
import { styled } from "@mui/system";
import { ThemesShareFormContext } from "../context/themeContext";
import { useContext } from "react";

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    color: theme.textFieldColorText, // Cor do texto do input
  },

  "& .MuiSelect-select:focus": {
    color: theme.textFieldColorText, // Cor do texto do input
    backgroundColor: theme.textFieldColorBgHover,
  },
  "& .MuiInputLabel-root-focused": {
    color: "#fff", // Cor do texto do input
    backgroundColor: theme.textFieldColorBgHover,
  },
}));

const ThemedSelect = (props) => {
  const { theme } = useContext(ThemesShareFormContext);

  return <CustomSelect theme={theme} {...props} />;
};

export default ThemedSelect;
