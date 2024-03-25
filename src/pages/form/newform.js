import { Card, CardContent, TextField, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRef, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { FormComponent1 } from "src/sections/Forms/formComponent1";
import { FormComponent2 } from "src/sections/Forms/formComponent2";
import { FormComponent3 } from "src/sections/Forms/formComponent3";
import { FormComponent4 } from "src/sections/Forms/formComponent4";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/router";

const Page = () => {
  const { data: session } = useSession();
  const userId = session.id;
  const route = useRouter();
  const [formIndex, setFormIndex] = useState(1);
  const [fileInput, setFileInput] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    userId: userId,
    Preference_Date: "",
    client_name: false,
    client_email: false,
    client_phone: false,
    Client_city: false,
    Client_state: false,
    Client_BornDate: false,
    Your_Drawing: {},
    Image_Drawing: [],
    Ideia_Tattoo: false,
    Ref_Tattoo: false,
    Place_Tattoo: false,
    Size_Tattoo: false,
    ativo: true,
  });

  const handleSubmit = async () => {
    const notify = () => {
      toast.success("Formulário criado com sucesso!", {
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
      const token = session.accessToken;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("http://localhost:3333/api/form", formData, config);

      route.push("/form");
      console.log("Formulário criado com sucesso:", response);
      console.log("Formulário:", formData);
      notify();
      return response;
    } catch (error) {
      console.log(formData);
      console.error("Erro ao enviar dados para a API:", error);
    }
  };
  const handleFormChange = (index) => {
    setFormIndex(index);
    console.log("formIndex", formIndex);
  };

  const CustomButton = ({ title, body, onClick, isActive }) => {
    return (
      <Box
        sx={{
          border: "1px solid #000",
          borderRadius: "4px",
          padding: "16px",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
          backgroundColor: isActive ? "#e0e0e0" : "initial",
        }}
        onClick={onClick}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{body}</Typography>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Novo formulário</title>
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
            <div>
              <Typography variant="h4">Novo formulário de orçamento</Typography>
            </div>
            <div>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Modelos de formulário
                  </Typography>
                  <Box sx={{ display: "flex", gap: "16px" }}>
                    <CustomButton
                      title="Agenda do mês"
                      body="Defina datas e horários disponisveis na agenda."
                      isActive={formIndex === 1}
                      onClick={() => handleFormChange(1)}
                    />
                    <CustomButton
                      title="Flash"
                      body="Defina regras, tenha controle de horários e desenhos."
                      isActive={formIndex === 2}
                      onClick={() => handleFormChange(2)}
                    />
                    <CustomButton
                      title="Vale"
                      body="1 vale corresponde a X horas"
                      isActive={formIndex === 3}
                      onClick={() => handleFormChange(3)}
                    />
                    <CustomButton
                      title="Personalizado"
                      body="Defina datas e horários disponisveis na agenda."
                      isActive={formIndex === 4}
                      onClick={() => handleFormChange(4)}
                    />
                  </Box>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent>
                  {formIndex === 1 && (
                    <FormComponent1
                      setFormData={setFormData}
                      formData={formData}
                      handleSubmit={handleSubmit}
                    />
                  )}
                  {formIndex === 2 && (
                    <FormComponent2
                      setFormData={setFormData}
                      formData={formData}
                      setFileInput={setFileInput}
                    />
                  )}
                  {formIndex === 3 && (
                    <FormComponent3 setFormData={setFormData} formData={formData} />
                  )}
                  {formIndex === 4 && (
                    <FormComponent4 setFormData={setFormData} formData={formData} />
                  )}
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
