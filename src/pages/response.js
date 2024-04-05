import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RespostasSearch } from "src/sections/respostas/respostas-search";
import { RespostasTable } from "src/sections/respostas/respostas-table";
import axios from "axios";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    };

    const fetchForms = async () => {
      const response = await axios.get(
        `https://backend-4u-backend.fwhe6r.easypanel.host/api/shared/allconsult/${session.id}`,
        config
      );
      setCustomer(response.data);
    };

    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    };

    await axios.delete(
      `https://backend-4u-backend.fwhe6r.easypanel.host/api/shared/delete/${id}`,
      config
    );
    setCustomer(customer.filter((customer) => customer.id !== id));
  };

  return (
    <>
      <Head>
        <title>Respostas</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Respostas</Typography>
            <RespostasSearch />
            <Stack spacing={1.5}>
              {customer.length > 0 ? (
                customer.map((customer) => (
                  <RespostasTable
                    key={customer.id}
                    customer={customer}
                    handleDelete={handleDelete}
                  />
                ))
              ) : (
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle1">Nenhuma resposta encontrada</Typography>
                  <Typography variant="subtitle2" textAlign="center">
                    Crie um formulário e comece a receber seus orçamentos
                  </Typography>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Criar um formulário
                  </Button>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
