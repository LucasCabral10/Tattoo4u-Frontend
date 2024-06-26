import { Button, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { indigo, neutral, error, success } from "src/theme/colors";
import { useState } from "react";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalCalendar from "./modal-calendar";
import ModalDesmarcar from "./modal-desmarcar";

export const RenderDays = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (type, itemId) => {
    if (type === "calendar") {
      setModalOpen(`calendar_${itemId}`);
    } else if (type === "desmarcar") {
      setModalOpen(`desmarcar_${itemId}`);
    }
  };

  const handleModalClose = () => setModalOpen(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));

  const formatTimeIso = (timeISO) => {
    const data = new Date(timeISO);
    // Formato de hora desejado (por exemplo, HH:MM:SS)
    return `${data.getHours()}:${data.getMinutes()}`;
  };

  const renderAppointment = (item, index) => (
    <Box
      key={index}
      sx={{
        mt: 2,
        p: 2,
        bgcolor: props.isToday(item.Schedule) ? indigo.main : neutral[100],
        borderRadius: 1,
      }}
    >
      <ModalCalendar
        open={modalOpen === `calendar_${item.id}`}
        onClose={handleModalClose}
        item={item}
        session={props.session}
        updateCustomer={props.updateCustomer}
      />

      <ModalDesmarcar
        open={modalOpen === `desmarcar_${item.id}`}
        onClose={handleModalClose}
        customer={item}
        session={props.session}
        removeCustomer={props.removeCustomer}
      />

      <Grid container>
        <Grid item xl={1} xs={2} display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ color: props.isToday(item.Schedule) ? "#fff " : "#000" }}
          >
            {formatTimeIso(item.Schedule)}
          </Typography>
        </Grid>
        <Grid item xl={6} xs={9} display="flex" alignItems="center">
          <Typography
            variant="body1"
            sx={{ color: props.isToday(item.Schedule) ? "#fff " : "#000" }}
          >
            {item.client_name}{" "}
          </Typography>
        </Grid>
        <Grid item xl={5} xs={1}>
          {isXl ? (
            <Stack spacing={1} width={"100%"} direction={"row-reverse"}>
              <Button
                variant="contained"
                color="error"
                type="desmarcar"
                sx={{
                  color: (theme) => (props.isToday(item.Schedule) ? error.main : "#fff"),
                  bgcolor: (theme) => (props.isToday(item.Schedule) ? "#fff" : error.main),
                  "&:hover": {
                    bgcolor: indigo[700],
                    color: "#fff",
                  },
                }}
                onClick={() => handleModalOpen("desmarcar", item.id)}
              >
                Desmarcar
              </Button>
              <Button
                variant="contained"
                sx={{
                  color: (theme) => (props.isToday(item.Schedule) ? indigo.dark : "#fff"),
                  bgcolor: (theme) => (props.isToday(item.Schedule) ? "#fff" : indigo),
                  "&:hover": {
                    bgcolor: indigo[700],
                    color: "#fff",
                  },
                }}
                onClick={() => handleModalOpen("calendar", item.id)}
              >
                Mudar data
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<WhatsAppIcon />}
                href="https://wa.me//5565993269490?text=Tenho%20interesse%20em%20comprar%20seu%20carro"
                target="_blank"
                sx={{
                  color: (theme) => (props.isToday(item.Schedule) ? success.main : "#fff"),
                  bgcolor: (theme) => (props.isToday(item.Schedule) ? "#fff" : indigo),
                  "&:hover": {
                    bgcolor: indigo[700],
                    color: "#fff",
                  },
                }}
              >
                Contato
              </Button>
            </Stack>
          ) : (
            <Stack direction={"row-reverse"}>
              <IconButton
                sx={{
                  color: (theme) => (props.isToday(item.Schedule) ? "#fff" : indigo.dark),
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <WhatsAppIcon />
                  </ListItemIcon>
                  Contato
                </MenuItem>
                <MenuItem onClick={() => handleModalOpen("calendar", item.id)}>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  Mudar data
                </MenuItem>
                <MenuItem onClick={() => handleModalOpen("desmarcar", item.id)}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Desmarcar
                </MenuItem>
              </Menu>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  if (props.selectedDate !== null) {
    const filteredData = props.groupedCalendar[props.selectedDate];
    if (!filteredData || filteredData.length === 0) {
      return <Typography>Nenhum compromisso encontrado para a data selecionada</Typography>;
    }
    return (
      <div>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {props.selectedDate}
        </Typography>
        {filteredData.map(renderAppointment)}
      </div>
    );
  } else {
    // Renderizar todos os compromissos se nenhuma data estiver selecionada
    const days = Object.entries(props.groupedCalendar).map(([date, data]) => (
      <div key={date}>
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {props.isToday(data[0].Schedule) && <span style={{ color: neutral }}>HOJE - </span>}
          {date}
        </Typography>
        {data.map(renderAppointment)}
      </div>
    ));
    return days;
  }
};
