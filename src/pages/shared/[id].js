import { LinearProgress, Typography, linearProgressClasses } from "@mui/material";
import { Box, Container, Stack, styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Step1 } from "src/sections/shared/step1";
import { Step2 } from "src/sections/shared/step2";
import { Step3 } from "src/sections/shared/step3";
import { Step4 } from "src/sections/shared/step4";
import { Step5 } from "src/sections/shared/step5";
import { Step6 } from "src/sections/shared/step6";
import { Step7 } from "src/sections/shared/step7";
import formConsult from "../routes";
import { ThemesShareFormContext } from "src/sections/shared/context/themeContext";
import axios from "axios";

export async function getServerSideProps({ query }) {
  const formId = query.id;
  const data = await formConsult(formId);

  return {
    props: data,
  };
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === "neutral" ? 100 : 300],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#3f30dc" : "#3f30dc",
  },
}));

const Page = (data) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    formId: data.id,
  });

  const { changeTheme } = useContext(ThemesShareFormContext);
  changeTheme(data.Theme);

  useEffect(() => {
    setProgress((step - 2) * 33, 100);
  }, [step]);

  const handleNextStep = () => {
    if (step < 7) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const handleSubmit = async () => {
    console.log(formData);
    let data = new FormData();

    // Anexar campos ao formData
    for (let key in formData) {
      // Se o campo for "Image", adicione os arquivos diretamente
      if (key === "Image") {
        formData[key].forEach((file, index) => {
          data.append(`Image[${index}]`, file);
        });
      } else {
        // Para outros campos, adicione os valores normalmente
        data.append(key, formData[key]);
      }
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post("http://localhost:3333/api/shared/", data, config);
      setStep(6);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const stepName = [
    "Informações do Tatuador",
    "Informações de contato",
    "Meus dados",
    "Sobre a tatuagem",
    "Data de preferência",
  ];
  return (
    <div>
      {step > 1 && step < 6 && (
        <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 5, mb: 4 }}>
          <Container>
            <Stack spacing={3} width="100%">
              <Typography variant="h6">{`${stepName[step - 1]}`}</Typography>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Stack>
          </Container>
        </Box>
      )}
      {step === 1 && <Step1 onNext={handleNextStep} />}
      {step === 2 && (
        <Step2
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {step === 3 && (
        <Step3
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {step === 4 && (
        <Step4
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {step === 5 && (
        <Step5
          onPrevious={handlePreviousStep}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          formData={formData}
        />
      )}
      {step === 6 && <Step6 onPrevious={handlePreviousStep} onNext={handleNextStep} />}
      {step === 7 && <Step7 onPrevious={handlePreviousStep} onNext={handleNextStep} />}
    </div>
  );
};
export default Page;
