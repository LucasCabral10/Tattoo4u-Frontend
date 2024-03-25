import { Grid, Switch, TextField, Typography, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import DeleteIcon from "@mui/icons-material/Delete";

export const FormComponentUpdate = ({ formData, setFormData, handleSubmit }) => {
  const [dates, setDates] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    if (dates && dates.length > 0) {
      const datesString = JSON.stringify(dates.map((date) => date && date.toISOString()));
      setFormData((prevFormData) => ({
        ...prevFormData,
        Preference_Date: datesString,
      }));
    }
  }, [dates, setFormData]);

  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

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

  const handleSwitchChange = () => {
    setShowImageInput(!showImageInput);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const renderImagePreview = () => {
    return selectedFiles.map((file, index) => (
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
    ));
  };

  const handleDeleteImage = (index) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Nome do formulário*
      </Typography>
      <TextField
        fullWidth
        label="Escreva o nome do formulário aqui"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
      />

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
        name="Preference_Date"
        checked={formData.Preference_Date}
        onChange={handleInputChange}
      />
      <CustomSwitch
        text="E-mail do cliente"
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
