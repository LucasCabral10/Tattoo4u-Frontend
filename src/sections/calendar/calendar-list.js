import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { indigo, neutral } from "src/theme/colors";
import SendIcon from "@mui/icons-material/Send";

export const CalendarList = (props) => {
  const days = [
    { date: "17/08", title: "Amanhã", time: "13:00", event: "Nenhum evento para amanhã" },
    { date: "17/08", title: "Quarta", time: "13:00", event: "Nenhum evento para amanhã" },
    { date: "17/08", title: "Quarta", time: "13:00", event: "Nenhum evento para amanhã" },
  ];

  const renderDay = (day) => (
    <div>
      <Typography variant="h6">
        {day.date} - {day.title}
      </Typography>
      <Box sx={{ mt: 2, p: 2, bgcolor: neutral[100], borderRadius: 1 }}>
        <Grid container>
          <Grid item xs={3} display="flex" alignItems="center">
            <Typography variant="subtitle1">{day.time}</Typography>
          </Grid>
          <Grid item xs={7} display="flex" alignItems="center">
            <Typography variant="body1">{day.event}</Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              variant="contained"
              color="primary"
              sx={{ "&:hover": { bgcolor: indigo[700] } }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
  return (
    <>
      <Card>
        <CardContent>
          <Stack direction="column" spacing={2}>
            {days.map((day, index) => (
              <div key={index}>{renderDay(day)}</div>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
