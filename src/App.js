import "./App.css";
import { AuthState } from "./states/AuthState";
import ProtectedRoutes from "./protectedRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./components/Front";
import Dashboard from "./components/Dashboard";
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
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/home/:serverId" element={<Dashboard />} />
              <Route path="/home/:serverId/:channelId" element={<Dashboard />} />
            <Route path="/" element={<Front />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;
