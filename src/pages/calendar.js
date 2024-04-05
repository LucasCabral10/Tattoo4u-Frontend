import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CalendarList } from "src/sections/calendar/calendar-list";

const Page = () => {
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
            <Stack spacing={1.5}>
              <CalendarList />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
