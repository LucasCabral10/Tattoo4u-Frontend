import { Box, Button, Card, Modal, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { signOut } from "next-auth/react";
import { Router } from "next/router";

const SessionExpiredModal = ({ isOpen, onClose }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ p: 4 }}>
          <Stack spacing={4}>
            <Typography variant="h6">Sua sessão acabou, faça o login novamente!</Typography>
            <Button variant="contained" onClick={onClose}>
              Ir para login
            </Button>
          </Stack>
        </Card>
      </Box>
    </Modal>
  );
};

export default SessionExpiredModal;
