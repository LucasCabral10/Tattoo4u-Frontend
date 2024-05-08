import { Modal, Box, Card, Stack, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { error, neutral } from "src/theme/colors";

const ModalDelete = ({ open, onClose, customer, selected, handleDelete, handleDeleteSelected }) => {
  const [loading, setLoading] = useState(false);
  const handleDeleteAction = async () => {
    if (customer) {
      await handleDelete(customer.id);
    }
    if (selected) {
      setLoading(true);
      await handleDeleteSelected(selected);
    }
    setLoading(false);
    onClose();
    notify();
  };

  const notify = () => {
    toast.success("Resposta excluída!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Card sx={{ p: 3 }}>
          <Stack spacing={5} direction={"column"}>
            <Typography variant="h6">Você realmente deseja excluir a(s) resposta(s):</Typography>
            <Stack spacing={1}>
              <Box sx={{ width: "100%", position: "relative" }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: loading ? neutral[400] : error.main,
                    "&:hover": {
                      bgcolor: error.dark,
                    },
                  }}
                  onClick={handleDeleteAction}
                >
                  Excluir
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      //color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
              <Button variant="contained" color="inherit" onClick={onClose}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
