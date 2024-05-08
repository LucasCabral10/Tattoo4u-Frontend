import {
  Box,
  Button,
  Card,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { neutral } from "src/theme/colors";
import { indigo } from "src/theme/colors";
import { motion } from "framer-motion";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import SendIcon from "@mui/icons-material/Send";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { sharedSchedule } from "src/pages/routes";
import ModalCalendar from "./modal-calendar";
import ModalDelete from "./modal-delete";
import CustomerInfo from "./custumer-info";

export const RespostasTable = (props) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleModalDeleteOpen = () => setModalDeleteOpen(true);
  const handleModalDeleteClose = () => setModalDeleteOpen(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleSaveSession = (date, time) => {
    const selectedDate = date;
    const selectedTime = time;

    if (selectedDate && selectedTime) {
      const sessionDateTime = new Date(selectedDate);
      sessionDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      const formattedSessionDateTime = sessionDateTime.toISOString();

      const scheduleData = {
        Schedule: formattedSessionDateTime,
      };

      sharedSchedule(props.session, props.customer.id, scheduleData);

      props.updateCustomer(props.customer.id, {
        Schedule: formattedSessionDateTime,
        Status: false,
      });
    } else {
      console.error("Por favor, selecione data e horário da sessão");
    }
  };

  return (
    <div>
      <ModalDelete
        open={modalDeleteOpen}
        onClose={handleModalDeleteClose}
        customer={props.customer}
        handleDelete={props.handleDelete}
      />
      <ModalCalendar
        open={modalOpen}
        onClose={handleModalClose}
        handleSaveSession={(date, time) => handleSaveSession(date, time)}
      />
      <Box
        component={motion.div} // Add motion animation
        initial={{ height: "100%" }}
        animate={{ height: open ? "100%" : "auto" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        sx={{
          bgcolor: open ? indigo.lightest : "white",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Grid container>
            <Grid xs={0.6} display="flex" alignItems="center">
              <Checkbox
                onChange={(event) => {
                  if (event.target.checked) {
                    props.setSelected((prevSelected) => [...prevSelected, props.customer.id]); // Adiciona o Id da resposta na lista
                  } else {
                    props.setSelectAll(false);
                    props.setSelected(
                      (prevSelected) => prevSelected.filter((item) => item !== props.customer.id) // Retira o Id da resposta na lista
                    );
                  }
                }}
                checked={
                  props.selectAll ? props.selectAll : props.selected.includes(props.customer.id)
                }
              />
            </Grid>
            <Grid xs={11.4}>
              <Box onClick={() => setOpen((prevOpen) => !prevOpen)}>
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent={"space-between"}
                >
                  <Typography variant="h6">{props.customer.client_name}</Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {props.customer.Status && (
                      <Chip color="success" size="small" icon={<TagFacesIcon />} label="Novo" />
                    )}
                    {props.customer.Schedule && (
                      <Chip color="primary" size="small" icon={<TagFacesIcon />} label="Agendado" />
                    )}
                    <IconButton
                      component={motion.div}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                      aria-label="edit"
                      size="large"
                      color="gray"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpen((prevOpen) => !prevOpen);
                      }}
                    >
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
          {open && (
            <Card sx={{ bgcolor: neutral.lightest, p: 2, mt: 2 }}>
              <Stack direction="column" spacing={1}>
                <CustomerInfo title="Ideia da tatuagem:" info={props.customer.Ideia_Tattoo} />
                <CustomerInfo title="Telefone:" info={props.customer.client_phone} />
                <CustomerInfo title="Nome:" info={props.customer.client_name} />
                <CustomerInfo title="Data de nascimento:" info={props.customer.Client_BornDate} />
                <CustomerInfo title="Cidade:" info={props.customer.Client_city} />
                <CustomerInfo title="Estado:" info={props.customer.Client_state} />
                <CustomerInfo title="Local da tatuagem:" info={props.customer.Place_Tattoo} />
                <CustomerInfo title="Tamanho da tatuagem:" info={props.customer.Size_Tattoo} />
                <CustomerInfo title="Data de preferência:" info={props.customer.Preference_Date} />
                <Stack direction="column" spacing={2} width={"100%"}>
                  {props.customer.Ref_Tattoo.length > 0 && (
                    <>
                      <Typography variant="subtitle1">Imagens de referência:</Typography>
                      <Stack direction="row" spacing={2}>
                        {props.customer.Ref_Tattoo.map((link, linkIndex) => (
                          <>
                            <Box
                              sx={{
                                bgcolor: neutral[100],
                                width: 100,
                                p: 1,
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <img width={"100%"} key={linkIndex} src={link} alt="Tattoo" />
                            </Box>
                          </>
                        ))}
                      </Stack>
                    </>
                  )}
                </Stack>
                <Stack direction="row-reverse" spacing={2} mt={2}>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    href="https://wa.me//5565993269490?text=Tenho%20interesse%20em%20comprar%20seu%20carro"
                    target="_blank"
                  >
                    Contato
                  </Button>
                  <div>
                    {props.customer.Schedule ? (
                      <Button
                        variant="outlined"
                        endIcon={<CalendarMonthIcon />}
                        onClick={() => handleModalOpen()}
                      >
                        Remarcar
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        endIcon={<CalendarMonthIcon />}
                        onClick={() => handleModalOpen()}
                      >
                        Marcar na agenda
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleModalDeleteOpen()}
                  >
                    Excluir
                  </Button>
                </Stack>
              </Stack>
            </Card>
          )}
        </Box>
      </Box>
    </div>
  );
};
