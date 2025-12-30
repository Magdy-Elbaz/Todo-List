import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodo } from "./Context/TodoContext";
import { useTast } from "./Context/ToastContext";

export default function Todo({ todo, showPoppDelet, showPoppUpdate }) {
  const { showHightTost } = useTast();
  const { dispatch } = useTodo();

  function handleCheck() {
    dispatch({ type: "isCompleted", payload: todo });
    if (todo.isCompleted) {
      showHightTost("المهمة صارت غير منجزه");
    } else {
      showHightTost("تم انجاز المهمة");
    }
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          maxWidth: "100%",
          backgroundColor: "#9e9e9e",
          marginTop: 4,
          color: "white",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "3px solid #b23c17",
                }}
                className="icon-btn"
                onClick={() => showPoppDelet(todo)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "3px solid #1769aa",
                }}
                className="icon-btn"
                onClick={() => {
                  showPoppUpdate(todo);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "3px solid #8bc34a",
                }}
                className="icon-btn"
                onClick={handleCheck}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
