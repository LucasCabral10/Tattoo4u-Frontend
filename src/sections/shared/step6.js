import { Box, Container, Stack } from "@mui/system";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { motion } from "framer-motion";

export const Step6 = ({ onNext, onPrevious }) => {
  const { theme } = useContext(ThemesShareFormContext);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxHeight: "calc(100vh)",
          bgcolor: theme.primaryBackgroundColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "scroll",
        }}
      >
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 200 }}
          transition={{ duration: 0.5, delay: 1 }} // Adjust duration as needed
        >
          <Container
            averflow="scroll"
            sx={{
              pt: 4,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <motion.svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.5 85.5C57.5782 85.5 67.2437 81.4964 74.3701 74.3701C81.4964 67.2437 85.5 57.5782 85.5 47.5C85.5 37.4218 81.4964 27.7563 74.3701 20.6299C67.2437 13.5036 57.5782 9.5 47.5 9.5C37.4218 9.5 27.7563 13.5036 20.6299 20.6299C13.5036 27.7563 9.5 37.4218 9.5 47.5C9.5 57.5782 13.5036 67.2437 20.6299 74.3701C27.7563 81.4964 37.4218 85.5 47.5 85.5ZM65.1082 41.3582C65.9735 40.4624 66.4523 39.2625 66.4415 38.0171C66.4306 36.7717 65.9311 35.5803 65.0504 34.6996C64.1697 33.8189 62.9783 33.3194 61.7329 33.3085C60.4875 33.2977 59.2876 33.7765 58.3918 34.6418L42.75 50.2835L36.6082 44.1418C35.7124 43.2765 34.5125 42.7977 33.2671 42.8085C32.0217 42.8194 30.8303 43.3189 29.9496 44.1996C29.0689 45.0803 28.5694 46.2717 28.5585 47.5171C28.5477 48.7625 29.0265 49.9624 29.8918 50.8582L39.3918 60.3582C40.2825 61.2487 41.4905 61.749 42.75 61.749C44.0095 61.749 45.2175 61.2487 46.1082 60.3582L65.1082 41.3582Z"
                fill="white"
              />
            </motion.svg>
            <Typography
              variant="subtitle1"
              sx={{ color: theme.secondaryColor, textAlign: "center" }}
            >
              Parabéns, seu pedido de orçamento foi enviado com sucesso!
            </Typography>
          </Container>
        </motion.div>
        <motion.div
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1 }} // Adjust duration as needed
        >
          <Container
            sx={{
              bgcolor: theme.secondaryColor,
              width: "100%",
              pt: 3,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          >
            <Stack spacing={3}>
              <Button
                variant="text"
                size="large"
                fullWidth
                onClick={onNext}
                endIcon={<KeyboardArrowUpIcon />}
              >
                Saiba mais
              </Button>
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
            </Stack>
          </Container>
        </motion.div>
      </Box>
    </div>
  );
};
