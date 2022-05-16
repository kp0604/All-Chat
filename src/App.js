import "./App.css";
import { AuthState } from "./states/AuthState";
import ProtectedRoutes from "./protectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front.js";
import Home from "./components/Home.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      light: grey[100],
      main: grey[200],
      dark: grey[800],
    },
    secondary: {
      light: grey[50],
      main: grey[300],
      dark: grey[400],
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@global": {
          "*": {
            "scrollbar-width": "thin",
          },
          "*::-webkit-scrollbar": {
            width: "4px",
            height: "4px",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Front />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/home/:serverId" element={<Home />} />
              <Route path="/home/:serverId/:channelId" element={<Home />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
