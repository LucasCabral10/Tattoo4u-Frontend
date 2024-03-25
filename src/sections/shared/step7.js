import { Box, Container, Stack } from "@mui/system";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext } from "react";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";

export const Step7 = ({ onNext, onPrevious }) => {
  const { theme } = useContext(ThemesShareFormContext);
  return (
    <div>
      <Box
        sx={{
          py: 4,
          width: "100%",
          height: "100vh",
          maxHeight: "calc(100vh)",
          bgcolor: "white",
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
        }}
      >
        <motion.div
          initial={{ y: 400 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }} // Adjust duration as needed
        >
          <Container>
            <Stack spacing={4}>
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                Dicas importantes da Tattoo4u para você não perder seu lugar na agenda:
              </Typography>
              <Box borderRadius={1} sx={{ p: 2, bgcolor: "#7749F8" }}>
                <Typography variant="body1" align="center" color={"white"}>
                  Primeiro, deixe aqui o e-mail e telefone que você deseja receber o meu contato,
                  <br />
                  lembre-se de colocar os que você utiliza com frequência
                </Typography>
              </Box>
              <Box borderRadius={1} sx={{ p: 2, bgcolor: "#7749F8" }}>
                <Typography variant="body1" align="center" color={"white"}>
                  Não se esqueça de acompanhar as redes sociais do seu tatuador, provavelmente ele
                  avisará quando está com agenda aberta ou respondendo os orçamentos.
                </Typography>
              </Box>
            </Stack>
          </Container>
        </motion.div>
      </Box>
    </div>
  );
};
