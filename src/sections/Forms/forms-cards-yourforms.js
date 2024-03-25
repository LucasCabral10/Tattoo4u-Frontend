import React from "react";
import { Card, CardContent, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import DeleteIcon from "@mui/icons-material/Delete";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

export const FormsCardsYourforms = ({ formData, setLoading }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const token = session.accessToken;

  const onCLickHandlerDelete = async () => {
    const notify = () => {
      toast.warning("Formulário excluido", {
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
    try {
      const api = `https://tattoo4ubackend.onrender.com/api/form/delete/${formData.id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(api, config);

      setLoading(true);
      notify();
      return response;
    } catch (error) {}
  };

  const onCLickHandlerEdit = () => {
    router.push(`/form/editform/${formData.id}`);
  };

  const notify = () => {
    toast.success("Link copiado com sucesso!", {
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

  const copyLinkToClipboard = () => {
    const link = `http://localhost:3000/?/forms/id=${formData.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        console.log("Link copiado para a área de transferência: ", link);
        notify();
      })
      .catch((error) => {
        console.error("Erro ao copiar o link: ", error);
      });
  };

  const ativo = true;

  return (
    <Card sx={{ margin: "16px 0" }}>
      <CardContent sx={{ p: 4 }}>
        <Grid container alignItems="center">
          <Grid xs>
            <Stack direction="row" spacing={2}>
              <FiberManualRecordIcon sx={{ color: ativo ? "green" : "red" }} />
              <Typography variant="h6">{ativo ? "Ativo" : "Inativo"}</Typography>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6">{formData.name}</Typography>
          </Grid>
          <Grid xs display="flex" justifyContent="flex-end">
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="edit"
                size="large"
                color="gray"
                onClick={onCLickHandlerDelete}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit" size="large" color="gray" onClick={onCLickHandlerEdit}>
                <ModeEditOutlinedIcon />
              </IconButton>
              <IconButton aria-label="link" size="large" color="gray" onClick={copyLinkToClipboard}>
                <LinkOutlinedIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
