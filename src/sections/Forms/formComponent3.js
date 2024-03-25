import { Grid, Switch, TextField, Typography, IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import DeleteIcon from "@mui/icons-material/Delete";


export const FormComponent3 = () => {
    const [formData, setFormData] = useState({});
    const [dates, setDates] = useState(null);
    const [showImageInput, setShowImageInput] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const CustomSwitch = ({ text }) => {
        const [checked, setChecked] = useState(true);

        const handleChange = (event) => {
            setChecked(event.target.checked);
        };
        return (
            <Grid
                container
                sx={{ mt: 2 }}>
                <Grid
                    xs={11}
                >
                    <Typography variant="h6">{text}</Typography>
                </Grid>
                <Grid
                    xs={1}
                >
                    <Switch
                        checked={checked}
                        onChange={handleChange}
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
            <Box key={index}
                sx={{
                    position: "relative",
                    bgcolor: '#f0f0f0',
                    mb: 2, mr: 2,
                    borderRadius: 2,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${file.name}`}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <IconButton
                    sx={{ color: 'red', width: '20px', height: '20px', mt:2}}
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
            <Typography variant="h6" sx={{mb: 1}}>Nome do formulário*</Typography>
            <TextField
                fullWidth
                label="Escreva o nome do formulário aqui"
                name="name"

                onChange={handleInputChange}
            />

            <Box sx={{ mt: 4 }}>
                <Box>
                    <Grid
                        container
                        alignItems="center"
                        sx={{ mt: 2 }}>
                        <Grid
                            xs={9.8}>
                            <Typography variant="h6">Datas da agenda aberta</Typography>
                        </Grid>
                        <Grid xs={2.2}>
                        <span className="p-float-label">
                            <Calendar
                                value={dates}
                                onChange={(e) =>
                                    setDates(e.value)}
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
                    <Grid
                        container
                        alignItems="center"
                        sx={{ mt: 2 }}>
                        <Grid
                            xs={11}>
                            <Typography variant="h6">Desenhos próprios</Typography>
                        </Grid>
                        <Grid xs={1}>
                            <Switch
                                checked={showImageInput}
                                onChange={handleSwitchChange}
                                color="success" />
                        </Grid>
                    </Grid>
                </Box>
                {showImageInput && (
                    <label htmlFor="fileInput">
                        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row' }}>
                            {renderImagePreview()}
                        </Box>
                        <Box sx={{
                            border: '1px solid #000',
                            borderRadius: '4px',
                            padding: '16px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: '#f0f0f0', },
                        }}>

                            <Typography variant="h6">Clique para adicionar imagens</Typography>
                        </Box>
                        <input id="fileInput" type="file" style={{ display: 'none' }} onChange={handleFileChange} multiple />
                    </label>
                )}
            </Box>
            <CustomSwitch text="Nome do cliente" />
            <CustomSwitch text="E-mail do cliente" />
            <CustomSwitch text="Telefone/Whatsapp do cliente" />
            <CustomSwitch text="Cidade e Estado do cliente" />
            <CustomSwitch text="Data de nascimento do clinte" />
            <CustomSwitch text="Ideia da tatuagem" />
            <CustomSwitch text="Referência para a tatuagem" />
            <CustomSwitch text="Local da tatuagem" />

        </>
    )
}