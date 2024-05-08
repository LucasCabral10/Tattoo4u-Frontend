import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "src/guards/auth-guard";
import { ThemeProviderShared } from "src/sections/shared/context/themeContext";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  const session = pageProps.session;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Tattoo4u</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <ThemeProviderShared>
            <CssBaseline />
            <SessionProvider session={session}>
              <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
            </SessionProvider>
          </ThemeProviderShared>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
