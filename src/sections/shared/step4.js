import { Button, Hidden, IconButton, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CustomTextField from "./components/CustomTextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ThemesShareFormContext } from "./context/themeContext";
import { useContext, useEffect, useState } from "react";
import CustomButton from "./components/CustomButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

export const Step4 = ({ onNext, onPrevious, setFormData, formData }) => {
  const { theme } = useContext(ThemesShareFormContext);
  const [files, setFiles] = useState(
    formData.Image && formData.Image.length > 0 ? formData.Image : []
  );

  const formik = useFormik({
    initialValues: {
      Ideia_Tattoo: formData.Ideia_Tattoo || "",
      Image: formData.Image || [],
      Place_Tattoo: formData.Place_Tattoo || "",
      Size_Tattoo: formData.Size_Tattoo || "",
    },
    validationSchema: Yup.object({
      Ideia_Tattoo: Yup.string().max(255).required("Descreva sua ideia"),
      Image: Yup.array().max(255).required("Adicione uma imagem de referência"),
      Place_Tattoo: Yup.string().max(255).required("Região do corpo é obrigatório"),
      Size_Tattoo: Yup.number().required("Tamanho da tatuagem é obrigatório"),
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

  useEffect(() => {
    // Atualiza os valores do formulário com os arquivos
    formik.setValues((prevValues) => ({
      ...prevValues,
      Image: files,
    }));
  }, [files]);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => prevFiles.concat(...files));
  };

  const renderImagePreview = () => {
    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      } else {
        return text;
      }
    };
    return files.map((file, index) => (
      <Box
        key={index}
        sx={{
          position: "relative",
          bgcolor: "#fff",
          mb: 2,
          borderRadius: 0.7,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Box
            width={40}
            height={40}
            overflow={"hidden"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={0.7}
          >
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${file.name}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </Box>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {truncateText(file.name, 20)}
          </Typography>
        </Box>
        <IconButton
          sx={{ color: "red", width: "20px", height: "20px" }}
          onClick={() => handleDeleteImage(index)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ));
  };

  const handleDeleteImage = async (index) => {
    try {
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
    }
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
        <Container sx={{ pt: 4 }}>
          <Stack spacing={2}>
            <Box borderRadius={1} sx={{ p: 2, bgcolor: "white" }}>
              <Typography variant="subtitle1" align="center">
                Agora, descreva como você quer a sua tatuagem respondendo as perguntas abaixo.
              </Typography>
            </Box>
            <CustomTextField
              label="Descreva brevemente sua ideia"
              multiline
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.Ideia_Tattoo}
              name={"Ideia_Tattoo"}
              {...formik.getFieldProps("Ideia_Tattoo")}
              error={formik.touched.Ideia_Tattoo && Boolean(formik.errors.Ideia_Tattoo)}
              helperText={formik.touched.Ideia_Tattoo && formik.errors.Ideia_Tattoo}
            />
            <label htmlFor="fileInput">
              <Box
                sx={{
                  border: 1,
                  borderStyle: "dashed",
                  borderColor: "white",
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>{renderImagePreview()}</Box>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 0.6,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "coloumn",
                    cursor: "pointer",
                    p: 1,
                  }}
                >
                  <AddCircleIcon sx={{ fontSize: 30, color: "black" }} />
                  <Typography variant="subtitle1" sx={{ ml: 1 }}>
                    Adicionar imagem de referência
                  </Typography>

                  <input
                    id="fileInput"
                    name="Image"
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    onChange={handleFileChange}
                  />
                </Box>
              </Box>
            </label>
            <CustomTextField
              type="number"
              label="Tamanho da tatuagem (cm)"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.Size_Tattoo}
              name={"Size_Tattoo"}
              {...formik.getFieldProps("Size_Tattoo")}
              error={formik.touched.Size_Tattoo && Boolean(formik.errors.Size_Tattoo)}
              helperText={formik.touched.Size_Tattoo && formik.errors.Size_Tattoo}
            />
            <CustomTextField
              label="Região do corpo"
              fullWidth
              onChange={formik.handleChange}
              value={formik.values.Place_Tattoo}
              name={"Place_Tattoo"}
              {...formik.getFieldProps("Place_Tattoo")}
              error={formik.touched.Place_Tattoo && Boolean(formik.errors.Place_Tattoo)}
              helperText={formik.touched.Place_Tattoo && formik.errors.Place_Tattoo}
            />
          </Stack>
        </Container>
        <Container sx={{ pb: 10, pt: 5 }}>
          <Stack spacing={2}>
            <CustomButton
              variant="contained"
              size="large"
              fullWidth
              endIcon={<ArrowRightAltIcon />}
              type="submit"
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
