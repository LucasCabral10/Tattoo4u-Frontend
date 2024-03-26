import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import CustomButton from "./components/CustomButton";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext } from "react";
import { useFormik } from "formik";
import CustomMobileDatePicker from "./components/CustomMobileDatePicker";

export const Step5 = ({ onPrevious, onNext, setFormData }) => {
  const { theme } = useContext(ThemesShareFormContext);

  const formik = useFormik({
    initialValues: {
      Preference_Date: [],
    },
    onSubmit: (values, helpers) => {
      try {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...values,
        }));
        onNext();
        //handleSubmit(); está no componente pai
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxHeight: "calc(100vh - 100px)",
          bgcolor: theme.primaryBackgroundColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: "scroll",
        }}
      >
        <Container averflow="scroll" sx={{ pt: 4 }}>
          <Stack spacing={2}>
            <Box borderRadius={1} sx={{ p: 2, bgcolor: "white" }}>
              <Typography variant="subtitle1" align="center">
                Escolha sua data de preferência, a disbonibilidade dos horários vai de acordo com
                agenda do tatuador
              </Typography>
            </Box>
            <CustomMobileDatePicker
              disablePast
              label="Data de preferência"
              onChange={(date) => {
                if (!date) return;
                const isoDate = date.toISOString();
                formik.setFieldValue("Preference_Date", isoDate);
              }}
            />
          </Stack>
        </Container>
        <Container sx={{ pb: 10, pt: 5 }}>
          <Stack spacing={2}>
            <CustomButton variant="contained" size="large" fullWidth type="submit">
              Finalizar
            </CustomButton>
            <CustomButton variant="text" onClick={onPrevious} sx={{ p: 0, mb: 1.5 }}>
              Voltar
            </CustomButton>
          </Stack>
        </Container>
      </Box>
    </form>
  );
};
