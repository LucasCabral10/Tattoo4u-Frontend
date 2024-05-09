import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CalendarList } from "src/sections/calendar/calendar-list";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { sharedConsult } from "./routes";
import { LoadingForm } from "src/sections/Forms/LoadingForm";
import { CalendarSearch } from "src/sections/calendar/calendar-search";

const Page = () => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState(null);

  const filteredData = customer ? customer.filter((item) => item.Schedule !== null) : null;

  useEffect(() => {
    const fetchData = async () => {
      const data = await sharedConsult(session);
      setCustomer(data);
    };
    fetchData();
  }, []);

  const updateCustomer = (customerId, updatedData) => {
    // Atualize os dados do cliente com o ID correspondente
    setCustomer((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, ...updatedData } : customer
      )
    );
  };
  const removeCustomer = (customerId) => {
    setCustomer((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Sua agenda</Typography>
            <CalendarSearch />
            <Stack spacing={1.5}>
              <div>
                {customer === null ? (
                  <LoadingForm />
                ) : customer.length === 0 ? (
                  <Typography variant="h4">
                    Você não tem nenhuma compromisso em sua agenda.
                  </Typography>
                ) : (
                  <>
                    <CalendarList
                      calendar={filteredData}
                      session={session}
                      updateCustomer={updateCustomer}
                      removeCustomer={removeCustomer}
                    />
                    {console.log(filteredData)}
                  </>
                )}
              </div>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
