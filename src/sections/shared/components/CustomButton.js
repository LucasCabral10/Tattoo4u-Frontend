import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { ThemesShareFormContext } from "../context/themeContext";
import { useContext } from "react";

const CustomButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-contained": {
    backgroundColor: theme.secondaryColor,
    color: theme.primaryColor,
  },
  "&.MuiButton-contained:hover": {
    backgroundColor: theme.bgColorHover,
    color: theme.textColorHover,
  },
  "&.MuiButton-text": {
    color: theme.secondaryColor,
  },
  "&.MuiButton-text:hover": {
    color: theme.bgColorHover,
  },
}));

const ThemeButton = (props) => {
  const { theme } = useContext(ThemesShareFormContext);

  return <CustomButton theme={theme} {...props} />;
};

export default ThemeButton;
