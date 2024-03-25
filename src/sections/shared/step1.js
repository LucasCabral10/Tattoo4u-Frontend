import { Avatar, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { Box, Container, Stack, width } from "@mui/system";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext } from "react";
import CustomButton from "./components/CustomButton";
import { WhiteLogo } from "src/components/whiteLogo";

export const Step1 = ({ onNext }) => {
  const { theme } = useContext(ThemesShareFormContext);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        bgcolor: theme.secundaryColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Container
        sx={{
          py: 4,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar alt="Remy Sharp" src=" " sx={{ width: 100, height: 100 }} />
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          Tattoo4u
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
          {" "}
          Realismo, black work
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ mt: 2 }}>
          {" "}
          Cachorro, gato e um bom papo
        </Typography>

        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          {" "}
          Sobre o artista
        </Typography>
        <Typography variant="body1" align="center" sx={{ mt: 2 }}>
          {" "}
          A tatuagem é uma das formas de modificação do corpo mais conhecidas e cultuadas do mundo.
          Trata-se de uma arte permanente feita na pele humana que, tecnicamente, consiste em uma
          aplicação subcutânea obtida através da introdução de pigmentos por agulhas.
        </Typography>
      </Container>
      <Container
        sx={{
          pt: 5,
          pb: 3,
          bgcolor: theme.primaryColor,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CustomButton sx={{ mb: 10 }} variant="contained" size="large" fullWidth onClick={onNext}>
          Quero solicitar meu orçamento
        </CustomButton>
        <Stack spacing={1}>
          <Typography variant="subtitle1" align="center" color={"white"}>
            from
          </Typography>
          <WhiteLogo />
        </Stack>
      </Container>
    </Box>
  );
};
