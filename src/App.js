import TodoList from "./Components/TodoList";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TodoProvider from "./Components/Context/TodoContext";
import { TastProjeder } from "./Components/Context/ToastContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },
  palette: {
    primary: {
      main: "#b71c1c",
    },
  },
});

export default function DisabledAccordion() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#191b1f",
        }}
      >
        <Container maxWidth="sm">
          <TodoProvider>
            <TastProjeder>
              <TodoList />
            </TastProjeder>
          </TodoProvider>
        </Container>
      </div>
    </ThemeProvider>
  );
}
