import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { RespostasSearch } from "src/sections/respostas/respostas-search";
import { RespostasTable } from "src/sections/respostas/respostas-table";
import { useSession } from "next-auth/react";
import { sharedConsult, sharedDelete } from "./routes";
import { LoadingForm } from "src/sections/Forms/LoadingForm";

const Page = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await sharedConsult(session);
      setCustomer(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    sharedDelete(session, id);
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
              {customer === null ? (
                <LoadingForm />
              ) : customer.length === 0 ? (
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle1">Nenhuma resposta encontrada</Typography>
                  <Typography variant="subtitle2" textAlign="center">
                    Crie um formulário e comece a receber seus orçamentos
                  </Typography>
                  <Button variant="contained" sx={{ mt: 3 }}>
                    Criar um formulário
                  </Button>
                </Stack>
              ) : (
                customer.map((customer) => (
                  <RespostasTable
                    key={customer.id}
                    customer={customer}
                    handleDelete={handleDelete}
                  />
                ))
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
