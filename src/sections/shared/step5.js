import { Button, FormControl, InputLabel, MenuItem, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import CustomButton from "./components/CustomButton";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Step5 = ({ onPrevious, handleSubmit, formData, setFormData }) => {
  const { theme } = useContext(ThemesShareFormContext);
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      Preference_Date: formData.Preference_Date || [],
    },
    onSubmit: (values, helpers) => {
      try {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...values,
        }));
        // handleSubmit();
      } catch (error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      Preference_Date: [tempDate],
    }));
    console.log(formik.values);
  }, [tempDate]);

  const handleDateChange = (e) => {
    setDate(e.value);
    const isoDate = e.value.toISOString();
    setTempDate(isoDate); // Atualize o estado local temporário
    formik.setFieldValue("Preference_Date", isoDate);
  };

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
                A disbonibilidade dos horários vai de acordo com agenda do tatuador
              </Typography>
            </Box>
            <Calendar
              value={date}
              onChange={handleDateChange}
              inline
              inputId="dates"
              dateFormat="dd/mm/yy"
              selectionMode="single"
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
