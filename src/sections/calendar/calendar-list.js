import { Button, Card, CardContent, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import CancelIcon from "@mui/icons-material/Cancel";
import { RenderDays } from "./render-days";

//TODO: FAZER BARRA DE PESQUISA FUNCIONAR
//TODO: ATIVO ARA BOTÃO DE VER AGENDAS
//TODO: RESPONSIVO DO BOTÃO VER AGENDAS
//TODO: RESPONSIVO

export const CalendarList = (props) => {
  const [onFilter, setOnFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [valueDate, setValueDate] = useState(null);
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

  const handleClearFilter = () => {
    setOnFilter(false);
    setValueDate(null);
    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(formatDate(date));
    setValueDate(date);
    setOnFilter(true);
  };

  const handleAllDateChange = () => {
    setAllDate(!allDate); // Inverte o valor atual de allDate
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction={"row"}>
          <Button variant="outlined" onClick={handleAllDateChange}>
            Ver agendas antigas
          </Button>
          <Stack direction={"row"}>
            <DatePicker
              label="filtrar por dia"
              selected={selectedDate}
              value={valueDate}
              onChange={handleDateChange}
            />
            {onFilter && (
              <IconButton onClick={handleClearFilter} color="error">
                <CancelIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={2}>
          <RenderDays
            groupedCalendar={groupedCalendar}
            selectedDate={selectedDate}
            isToday={isToday}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};
