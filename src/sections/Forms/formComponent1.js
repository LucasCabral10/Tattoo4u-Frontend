import {
  Grid,
  Switch,
  TextField,
  Typography,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export const FormComponent1 = ({ formData, setFormData, handleSubmit }) => {
  const [dates, setDates] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [files, setFiles] = useState([]);
  const [filesLink, setFilesLink] = useState([]);
  const [uploading, setUploading] = useState(true);
  const [progress, setProgress] = useState(0);

  //imagens do formulário
  useEffect(() => {
    const imageLinks = filesLink.map((file) => file.url);
    setFormData((prevFormData) => ({
      ...prevFormData,
      Image_Drawing: imageLinks,
    }));
    console.log("file link:", filesLink);
  }, [filesLink, setFormData]);

  const handleFileChange = async (event) => {
    const filesEvent = event.target.files;
    const files = event.target.files;
    setProgress(0);
    setUploading(true);
    for (const file of files) {
      const reader = new FileReader();

      const formData = new FormData();
      formData.append("image", file);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      reader.onload = async () => {
        setProgress(10);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProgress(30);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setProgress(60);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProgress(80);
        try {
          const response = await axios.post("http://localhost:3333/api/upload", formData, config);
          const imageLink = response.data;
          console.log("Link da imagem:", imageLink);
          setFilesLink((prevFilesLink) => prevFilesLink.concat(imageLink));
          setProgress(100);
          setUploading(false);
        } catch (error) {
          console.error("Erro ao enviar imagem:", error);
        }
      };
      reader.readAsDataURL(file);
    }
    setFiles((prevFiles) => prevFiles.concat(...filesEvent));
  };

  const handleSwitchChange = () => {
    setShowImageInput(!showImageInput);
  };

  const renderImagePreview = () => {
    return files.map((file, index) => {
      if (uploading && index === files.length - 1) {
        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              bgcolor: "#f0f0f0",
              mb: 2,
              mr: 2,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress
              variant="determinate"
              sx={{ display: "flex", position: "absolute", zIndex: 2, top: 40, left: 47 }}
              value={progress}
            />
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${file.name}`}
              style={{ maxWidth: "100px", maxHeight: "100px", opacity: 0.5 }}
            />
            <IconButton
              sx={{ color: "red", width: "20px", height: "20px", mt: 2 }}
              onClick={() => handleDeleteImage(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      } else {
        return (
          <Box
            key={index}
            sx={{
              position: "relative",
              bgcolor: "#f0f0f0",
              mb: 2,
              mr: 2,
              borderRadius: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${file.name}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <IconButton
              sx={{ color: "red", width: "20px", height: "20px", mt: 2 }}
              onClick={() => handleDeleteImage(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
    });
  };

  const handleDeleteImage = async (index) => {
    try {
      if (filesLink && filesLink.length > 0) {
        const deletedImageUrl = filesLink[index]["url"];
        const fileName = deletedImageUrl.substring(deletedImageUrl.lastIndexOf("/") + 1);
        await axios.put(`http://localhost:3333/api/upload/${fileName}`);
        setFilesLink((prevFilesLink) => {
          const updatedFilesLink = [...prevFilesLink];
          updatedFilesLink.splice(index, 1);
          return updatedFilesLink;
        });
      }
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles.splice(index, 1);
        return updatedFiles;
      });
    } catch (error) {
      console.error("Erro ao excluir imagem:", error);
    }
  };

  //datas do formulário
  useEffect(() => {
    if (dates && dates.length > 0) {
      const datesString = JSON.stringify(dates.map((date) => date && date.toISOString()));
      setFormData((prevFormData) => ({
        ...prevFormData,
        Preference_Date: datesString,
      }));
    }
  }, [dates, setFormData]);

  //Submit do formulário
  const handleInputChange = async (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    console.log("Formulário:", formData);
  };

  //Switches do formulário
  const CustomSwitch = ({ text, name, checked, onChange }) => {
    return (
      <Grid container sx={{ mt: 2 }}>
        <Grid xs={11}>
          <Typography variant="h6">{text}</Typography>
        </Grid>
        <Grid xs={1}>
          <Switch
            name={name}
            checked={checked}
            onChange={onChange}
            defaultChecked
            color="success"
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Nome do formulário*
      </Typography>
      <TextField fullWidth name="name" value={formData.name} onChange={handleInputChange} />

      <Box sx={{ mt: 4 }}>
        <Box>
          <Grid container alignItems="center" sx={{ mt: 2 }}>
            <Grid xs={9.8}>
              <Typography variant="h6">Datas da agenda aberta</Typography>
            </Grid>
            <Grid xs={2.2}>
              <span className="p-float-label">
                <Calendar
                  value={dates}
                  onChange={(e) => setDates(e.value)}
                  selectionMode="range"
                  readOnlyInput
                  inputId="dates"
                />
                <label htmlFor="datas">Escolha as datas </label>
              </span>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Box>
          <Grid container alignItems="center" sx={{ mt: 2 }}>
            <Grid xs={11}>
              <Typography variant="h6">Desenhos próprios</Typography>
            </Grid>
            <Grid xs={1}>
              <Switch checked={showImageInput} onChange={handleSwitchChange} color="success" />
            </Grid>
          </Grid>
        </Box>
        {showImageInput && (
          <label htmlFor="fileInput">
            <Box sx={{ mt: 1, display: "flex", flexDirection: "row" }}>{renderImagePreview()}</Box>
            <Box
              sx={{
                border: "1px solid #000",
                borderRadius: "4px",
                padding: "16px",
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <Typography variant="h6">Clique para adicionar imagens</Typography>
            </Box>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              multiple
            />
          </label>
        )}
      </Box>
      <CustomSwitch
        text="Nome do cliente"
        name="client_name"
        checked={formData.client_name}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="E-mail do cliente"
        name="client_email"
        checked={formData.client_email}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Telefone/Whatsapp do cliente"
        name="client_phone"
        checked={formData.client_phone}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Cidade do cliente"
        name="Client_city"
        checked={formData.Client_city}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Estado do cliente"
        name="Client_state"
        checked={formData.Client_state}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Data de nascimento do clinte"
        name="Client_BornDate"
        checked={formData.Client_BornDate}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Ideia da tatuagem"
        name="Ideia_Tattoo"
        checked={formData.Ideia_Tattoo}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Referência para a tatuagem"
        name="Ref_Tattoo"
        checked={formData.Ref_Tattoo}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Local da tatuagem"
        name="Place_Tattoo"
        checked={formData.Place_Tattoo}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="Tamanho da tatuagem"
        name="Size_Tattoo"
        checked={formData.Size_Tattoo}
        onChange={handleInputChange}
      />
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse", mt: 5 }}>
        <Button sx={{}} variant="contained" onClick={handleSubmit}>
          Criar formulário
        </Button>
      </Box>
    </>
  );
};
