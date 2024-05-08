import { Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";

const CustomerInfo = ({ title, info }) => {
  return (
    <Stack direction="column" width="100%">
      <Typography variant="subtitle1">{title}</Typography>
      <Typography variant="body1" sx={{ wordWrap: "break-word" }}>
        {info}
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </Stack>
  );
};

export default CustomerInfo;
