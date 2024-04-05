import { Grid, Switch, TextField, Typography, IconButton, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import DeleteIcon from "@mui/icons-material/Delete";

//Switches do formulário
const CustomSwitch = ({ text, name, checked, onChange }) => {
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid xs={11}>
        <Typography variant="h6">{text}</Typography>
      </Grid>
      <Grid xs={1}>
        <Switch name={name} checked={checked} onChange={onChange} defaultChecked color="success" />
      </Grid>
    </Grid>
  );
};

export const FormComponent1 = ({ formData, setFormData, handleSubmit }) => {
  const [dates, setDates] = useState(null);
  const [showImageInput, setShowImageInput] = useState(false);
  const [files, setFiles] = useState(
    formData.Image && formData.Image.length > 0 ? formData.Image : []
  );

  //Switch para upload de imagens
  const handleSwitchChange = () => {
    setShowImageInput(true);
  };

  //Adiciona as imagens ao array
  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => prevFiles.concat(...files));
  };

  //Retira as imagens do array
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

  //Visualização das imagens
  const renderImagePreview = () => {
    return files.map((file, index) => (
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

  //Manipulação de mudanças nos inputs
  const handleInputChange = async (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
    console.log("Formulário:", formData);
  };

  const switchData = [
    { text: "Nome do cliente", name: "client_name" },
    { text: "E-mail do cliente", name: "client_email" },
    { text: "Telefone/Whatsapp do cliente", name: "client_phone" },
    { text: "Cidade do cliente", name: "Client_city" },
    { text: "Estado do cliente", name: "Client_state" },
    { text: "Data de nascimento do cliente", name: "Client_BornDate" },
    { text: "Ideia da tatuagem", name: "Ideia_Tattoo" },
    { text: "Referência para a tatuagem", name: "Ref_Tattoo" },
    { text: "Local da tatuagem", name: "Place_Tattoo" },
    { text: "Tamanho da tatuagem", name: "Size_Tattoo" },
  ];

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
      {switchData.map((item, index) => (
        <CustomSwitch
          key={index}
          text={item.text}
          name={item.name}
          checked={formData[item.name]}
          onChange={handleInputChange}
        />
      ))}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "row-reverse", mt: 5 }}>
        <Button sx={{}} variant="contained" onClick={handleSubmit}>
          Criar formulário
        </Button>
      </Box>
    </>
  );
};
