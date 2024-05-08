import React, { useState } from "react";
import { Modal, Box, Card, Stack, Typography, Button } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Bounce, toast } from "react-toastify";

const ModalCalendar = ({ open, onClose, handleSaveSession }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateChange = (date) => setSelectedDate(date);
  const handleTimeChange = (time) => setSelectedTime(time);

  const notify = () => {
    toast.success("Sessão marcada na agenda!", {
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

  const handleSaveSessionAction = () => {
    if (selectedDate && selectedTime) {
      handleSaveSession(selectedDate, selectedTime);
      notify();
      onClose();
    } else {
      console.error("Por favor, selecione data e horário da sessão");
    }
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
          <Stack spacing={3} direction={"column"}>
            <Typography variant="h6">Escolha a data e horário da sessão</Typography>
            <DatePicker
              label="Dia da sessão"
              selected={selectedDate}
              value={selectedDate}
              onChange={handleDateChange}
              disablePast
            />
            <TimePicker
              label="Horário da sessão"
              selected={selectedTime}
              value={selectedTime}
              onChange={handleTimeChange}
            />
            <Stack spacing={1} direction={"row-reverse"}>
              <Button variant="contained" color="success" onClick={handleSaveSessionAction}>
                Marcar sessão
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Cancelar
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
};

export default ModalCalendar;
