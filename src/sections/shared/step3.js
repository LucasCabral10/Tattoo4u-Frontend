import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomTextField from "./components/CustomTextField";
import CustomSelect from "./components/CustomSelect";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext, useState } from "react";
import CustomButton from "./components/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Step3 = ({ onNext, onPrevious, setFormData, formData }) => {
  const { theme } = useContext(ThemesShareFormContext);
  const [isDateFieldActive, setDateFieldActive] = useState(false);

  const formik = useFormik({
    initialValues: {
      client_name: formData.client_name || "",
      Client_BornDate: formData.Client_BornDate || "",
      Client_state: formData.Client_state || "",
      Client_city: formData.Client_city || "",
    },
    validationSchema: Yup.object({
      client_name: Yup.string().max(255).required("Nome é obrigatório"),
      Client_BornDate: Yup.string().max(255).required("Data de nascimento é obrigatório"),
      Client_state: Yup.string().max(255).required("Estado é obrigatório"),
      Client_city: Yup.string().max(255).required("Cidade é obrigatório"),
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
        }}
      >
        <Container sx={{ pt: 4 }}>
          <Stack spacing={2}>
            <CustomTextField
              label="Diga seu nome"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.client_name}
              name={"client_name"}
              {...formik.getFieldProps("client_name")}
              error={formik.touched.client_name && Boolean(formik.errors.client_name)}
              helperText={formik.touched.client_name && formik.errors.client_name}
            />
            <CustomTextField
              label="Data de nascimente"
              fullWidt
              type={isDateFieldActive ? "date" : "text"}
              onFocus={() => setDateFieldActive(true)}
              onBlur={() => setDateFieldActive(false)}
              onChange={formik.handleChange}
              value={formik.values.Client_BornDate}
              name={"Client_BornDate"}
              {...formik.getFieldProps("Client_BornDate")}
              error={formik.touched.Client_BornDate && Boolean(formik.errors.Client_BornDate)}
              helperText={formik.touched.Client_BornDate && formik.errors.Client_BornDate}
            />
            <FormControl variant="filled" fullWidth>
              <InputLabel
                id="select-label"
                sx={{
                  color: theme.textFieldColorText,
                  "&.Mui-focused": { color: theme.textFieldColorText },
                }}
              >
                Estado
              </InputLabel>
              <CustomSelect
                labelId="select-label"
                label="Estado"
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.Client_state}
                name={"Client_state"}
                {...formik.getFieldProps("Client_state")}
                error={formik.touched.Client_state && Boolean(formik.errors.Client_state)}
                helperText={formik.touched.Client_state && formik.errors.Client_state}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "200px", // Defina a altura máxima que você deseja
                      overflow: "auto", // Adicione a barra de rolagem quando o conteúdo exceder a altura máxima
                    },
                  },
                }}
              >
                <MenuItem value="SP">São Paulo</MenuItem>
                <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                <MenuItem value="MG">Minas Gerais</MenuItem>
                <MenuItem value="ES">Espírito Santo</MenuItem>
                <MenuItem value="SC">Santa Catarina</MenuItem>
                <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                <MenuItem value="PR">Paraná</MenuItem>
                <MenuItem value="GO">Goiás</MenuItem>
                <MenuItem value="DF">Distrito Federal</MenuItem>
                <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                <MenuItem value="MT">Mato Grosso</MenuItem>
                <MenuItem value="RO">Rondônia</MenuItem>
                <MenuItem value="AC">Acre</MenuItem>
                <MenuItem value="AM">Amazonas</MenuItem>
                <MenuItem value="RR">Roraima</MenuItem>
                <MenuItem value="PA">Pará</MenuItem>
                <MenuItem value="AP">Amapá</MenuItem>
                <MenuItem value="TO">Tocantins</MenuItem>
                <MenuItem value="BA">Bahia</MenuItem>
                <MenuItem value="SE">Sergipe</MenuItem>
                <MenuItem value="AL">Alagoas</MenuItem>
                <MenuItem value="PE">Pernambuco</MenuItem>
                <MenuItem value="PB">Paraíba</MenuItem>
                <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                <MenuItem value="CE">Ceará</MenuItem>
                <MenuItem value="PI">Piauí</MenuItem>
                <MenuItem value="MA">Maranhão</MenuItem>
              </CustomSelect>
            </FormControl>
            <CustomTextField
              label="Cidade"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.Client_city}
              name={"Client_city"}
              {...formik.getFieldProps("Client_city")}
              error={formik.touched.Client_city && Boolean(formik.errors.Client_city)}
              helperText={formik.touched.Client_city && formik.errors.Client_city}
            />
          </Stack>
        </Container>
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
  );
};
