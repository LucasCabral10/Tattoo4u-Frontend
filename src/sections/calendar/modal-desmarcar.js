import { Modal, Box, Card, Stack, Typography, Button } from "@mui/material";
import { Bounce, toast } from "react-toastify";
import { sharedSchedule } from "src/pages/routes";
import { error } from "src/theme/colors";

const ModalDesmarcar = ({ open, onClose, customer, session, removeCustomer }) => {
  const handleDescamarcarAction = async () => {
    const scheduleData = { Schedule: "" };
    await sharedSchedule(session, customer.id, scheduleData);

    removeCustomer(customer.id);
    onClose();
    notify();
  };

  const notify = () => {
    toast.success("Sessão desmarcada!", {
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
            <Typography variant="h6">Você realmente deseja desmarcar está sessão?</Typography>
            <Stack spacing={1}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: error.main,
                  "&:hover": {
                    bgcolor: error.dark,
                  },
                }}
                onClick={handleDescamarcarAction}
              >
                Desmarcar
              </Button>

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

export default ModalDesmarcar;
