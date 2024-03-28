import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FormsCardsYourforms } from "src/sections/Forms/forms-cards-yourforms";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingForm } from "src/sections/Forms/LoadingForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Page = () => {
  const [formData, setFormData] = useState(null);
  const { data: session } = useSession();
  const token = session.token;
  const userId = session.id;
  const [loading, setLoading] = useState(false); // muda para true quando deleta

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && userId) {
          const apiUrl = `https://tattoo4ubackend.onrender.com/api/form/allconsult/${userId}`;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(apiUrl, config);
          setFormData(response.data);
          setLoading(false);
        } else {
          console.error("Nenhum usuário autenticado encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };
    fetchData();
  }, [loading]);

  const router = useRouter();
  const onClickHandler = () => {
    router.push("/form/newform");
  };
  return (
    <>
      <Head>
        <title>Seus Fomulários</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <div>
                  <Typography variant="h4">Seus Formulários</Typography>
                </div>
              </Grid>
              <Grid xs={8} container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button variant="outlined">Aparencia</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={onClickHandler}>
                    Adicionar Formulário
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <div>
              {formData === null ? (
                <LoadingForm />
              ) : formData.length === 0 ? (
                <Typography variant="h4">Crie seu primeiro formulário</Typography>
              ) : (
                formData.map((formDataItem, index) => (
                  <FormsCardsYourforms
                    key={index}
                    formData={formDataItem}
                    setLoading={setLoading}
                  />
                ))
              )}
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
