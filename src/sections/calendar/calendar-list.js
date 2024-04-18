import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { indigo, neutral, success } from "src/theme/colors";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

//TODO: LIMPAR FILTRO DE DATA
//TODO: ADICIONAR BOTÃO DE FILTROS LADO DIREITO
//TODO: FAZER BARRA DE PESQUISA FUNCIONAR

export const CalendarList = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [allDate, setAllDate] = useState(false);

  // Função para formatar a data no formato dd/MM e especificar o dia correspondente
  const formatDate = (date) => {
    const options = { weekday: "long", day: "2-digit", month: "2-digit" };
    return date.toLocaleDateString("pt-BR", options);
  };

  // Função para verificar se a data é hoje
  const isToday = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Filtrar inicialmente compromissos a partir da data atual
  const filteredCalendar = props.calendar.filter((item) => {
    const itemDate = new Date(item.Preference_Date);
    const today = new Date();
    // Defina o horário de hoje para 00:00:00 para incluir compromissos de hoje
    today.setHours(0, 0, 0, 0);
    // Defina o horário do item para 00:00:00 para comparar com o horário de hoje
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= today;
  });

  // Ordena os itens por sequência de datas
  let sortedCalendar;
  if (allDate === false) {
    // Se allDate for true, ordenar todos os compromissos filtrados
    sortedCalendar = filteredCalendar.sort(
      (a, b) => new Date(a.Preference_Date) - new Date(b.Preference_Date)
    );
  } else {
    // Se allDate for false, ordenar todos os compromissos da props.calendar
    sortedCalendar = props.calendar.sort(
      (a, b) => new Date(a.Preference_Date) - new Date(b.Preference_Date)
    );
  }

  // Agrupar os dados por data
  const groupedCalendar = sortedCalendar.reduce((acc, curr) => {
    const formattedDate = formatDate(new Date(curr.Preference_Date));
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(curr);
    return acc;
  }, {});

  const handleDateChange = (date) => {
    setSelectedDate(formatDate(date));
  };

  const handleAllDateChange = () => {
    setAllDate(!allDate); // Inverte o valor atual de allDate
    console.log(allDate);
  };

  const renderDays = () => {
    const renderAppointment = (item, index) => (
      <Box
        key={index}
        sx={{
          mt: 2,
          p: 2,
          bgcolor: isToday(item.Preference_Date) ? indigo.main : neutral[100],
          borderRadius: 1,
        }}
      >
        <Grid container>
          <Grid item xs={3} display="flex" alignItems="center">
            <Typography
              variant="subtitle1"
              sx={{ color: isToday(item.Preference_Date) ? "#fff " : "#000" }}
            >
              13:00
            </Typography>
          </Grid>
          <Grid item xs={7} display="flex" alignItems="center">
            <Typography
              variant="body1"
              sx={{ color: isToday(item.Preference_Date) ? "#fff " : "#000" }}
            >
              {item.client_name}{" "}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              variant="contained"
              color="primary"
              sx={{
                color: isToday(item.Preference_Date) ? "#fff " : success.main,
                "&:hover": { bgcolor: indigo[700] },
              }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    );

    if (selectedDate !== null) {
      const filteredData = groupedCalendar[selectedDate];
      if (!filteredData || filteredData.length === 0) {
        return <Typography>Nenhum compromisso encontrado para a data selecionada</Typography>;
      }
      return (
        <div>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {selectedDate}
          </Typography>
          {filteredData.map(renderAppointment)}
        </div>
      );
    } else {
      // Renderizar todos os compromissos se nenhuma data estiver selecionada
      const days = Object.entries(groupedCalendar).map(([date, data]) => (
        <div key={date}>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            {isToday(data[0].Preference_Date) && <span style={{ color: neutral }}>HOJE - </span>}
            {date}
          </Typography>
          {data.map(renderAppointment)}
        </div>
      ));
      return days;
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Button variant="text" onClick={handleAllDateChange}>
            Ver agendas antigas
          </Button>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
          <Stack direction="column" spacing={2}>
            {renderDays()}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
