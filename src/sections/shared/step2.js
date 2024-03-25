import { Button, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { AnimatePresence, motion } from "framer-motion";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomTextField from "./components/CustomTextField";
import CustomButton from "./components/CustomButton";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Step2 = ({ onNext, onPrevious, setFormData, formData }) => {
  const { theme } = useContext(ThemesShareFormContext);

  const formik = useFormik({
    initialValues: {
      client_email: formData.client_email || "",
      client_phone: formData.client_phone || "",
    },
    validationSchema: Yup.object({
      client_email: Yup.string().email().required("E-mail é obrigatório"),
      client_phone: Yup.string().required("Telefone é obrigatório"),
    }),
    onSubmit: (values, helpers) => {
      try {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...values,
        }));
        onNext();
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }} // Adjust duration as needed
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            maxHeight: "calc(100vh - 100px)",
            bgcolor: [theme.primaryColor],
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 1, ease: "easeOut" }} // Adjust duration as needed
            >
              <Container sx={{ pt: 4 }}>
                <Stack spacing={2}>
                  <Box borderRadius={1} sx={{ p: 2, bgcolor: "white" }}>
                    <Typography variant="subtitle1" align="center">
                      Primeiro, deixe aqui o e-mail e telefone que você deseja receber o meu
                      contato,
                      <br />
                      lembre-se de colocar os que você utiliza com frequência
                    </Typography>
                  </Box>
                  <CustomTextField
                    bgcolor="white"
                    label="E-mail"
                    fullWidth
                    name={"client_email"}
                    onChange={formik.handleChange}
                    value={formik.values.client_email}
                    {...formik.getFieldProps("client_email")}
                    error={formik.touched.client_email && Boolean(formik.errors.client_email)}
                    helperText={formik.touched.client_email && formik.errors.client_email}
                  />
                  <CustomTextField
                    type="tel"
                    label="Telefone"
                    fullWidth
                    name={"client_phone"}
                    onChange={formik.handleChange}
                    value={formik.values.client_phone}
                    {...formik.getFieldProps("client_phone")}
                    error={formik.touched.client_phone && Boolean(formik.errors.client_phone)}
                    helperText={formik.touched.client_phone && formik.errors.client_phone}
                  />
                </Stack>
              </Container>
            </motion.div>
          </AnimatePresence>
          <Container sx={{ pb: 10 }}>
            <Stack spacing={2}>
              <CustomButton
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                endIcon={<ArrowRightAltIcon />}
              >
                Continuar
              </CustomButton>
              <CustomButton variant="text" onClick={onPrevious} sx={{ p: 0, mb: 1.5 }}>
                Voltar
              </CustomButton>
            </Stack>
          </Container>
        </Box>
      </form>
    </motion.div>
  );
};
