import { Card, CardContent, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FormComponentUpdate } from "src/sections/Forms/formComponentUpdate";
import formConsult from "../../routes";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Bounce, toast } from "react-toastify";

export async function getServerSideProps({ query }) {
  const formId = query.id;
  const data = await formConsult(formId);
  return {
    props: {
      data: data,
    },
  };
}

const Page = ({ data }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session.id;

  const [formData, setFormData] = useState({
    name: data.name,
    userId: userId,
    Preference_Date: "",
    client_name: data.client_name,
    client_email: data.client_email,
    client_phone: data.client_phone,
    Client_city: data.Client_city,
    Client_state: data.Client_state,
    Client_BornDate: data.Client_BornDate,
    Ideia_Tattoo: data.Ideia_Tattoo,
    Ref_Tattoo: data.Ref_Tattoo,
    Place_Tattoo: data.Place_Tattoo,
    Size_Tattoo: data.Size_Tattoo,
  });

  const notify = () => {
    toast.success("Edição salva com sucesso", {
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

  const handleSubmit = async () => {
    const formId = data.id;
    try {
      const token = session.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `https://tattoo4ubackend.onrender.com/api/form/update/${formId}`,
        formData,
        config
      );
      router.push("/form");
      notify();
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
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
            <Typography variant="h4"> Seus Formulários</Typography>
            <Card>
              <CardContent>
                <FormComponentUpdate
                  setFormData={setFormData}
                  formData={formData}
                  handleSubmit={handleSubmit}
                />
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
