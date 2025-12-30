import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {  useEffect, useState } from "react";
import { useMemo } from "react";
import DialogContentText from "@mui/material/DialogContentText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTast } from "./Context/ToastContext";
import { useTodo } from "./Context/TodoContext";

export default function TodoList() {
  const [titleInput, setTitleInput] = useState("");
  const { showHightTost } = useTast();
  const [activeBtn, setActiveBtn] = useState("all");
  const [todo, setTodo] = useState({});
  const [DialogDelete, setDialogDelete] = useState(false);
  const [DialogUpdate, setDialogUpdate] = useState(false);
  const { todos, dispatch } = useTodo();

  const comdleted = useMemo(() => {
    return todos.filter((data) => {
      return data.isCompleted;
    });
  }, [todos]);

  const noComdleted = useMemo(() => {
    return todos.filter((data) => {
      return !data.isCompleted;
    });
  }, [todos]);

  const all = useMemo(() => {
    return todos.map((t) => {
      return t;
    });
  }, [todos]);

  let todoList = all;

  if (activeBtn === "comdleted") {
    todoList = comdleted;
  } else if (activeBtn === "no-comdleted") {
    todoList = noComdleted;
  } else {
    todoList = all;
  }

  function handleAddClick() {
    dispatch({ type: "added", payload: { title: titleInput } });
    setTitleInput("");
    showHightTost("تمت الأضافه بنجاح");
  }

  function showPoppDelet(id) {
    setDialogDelete(true);
    setTodo(id);
  }

  function handleDleteConfirm() {
    dispatch({ type: "deleted", payload: { id: todo.id } });
    setDialogDelete(false);
    showHightTost("تم الحذف بنجاح");
  }

  function showPoppUpdate(id) {
    setTodo(id);
    setDialogUpdate(true);
  }

  function closePoppDelete() {
    setDialogDelete(false);
  }

  function handelUpdateConfirm() {
    dispatch({ type: "updated", payload: todo });
    setDialogUpdate(false);
    showHightTost("تم التعديل بنجاح");
  }

  const todoContent = todoList.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showPoppDelet={showPoppDelet}
        showPoppUpdate={showPoppUpdate}
      />
    );
  });

  useEffect(() => {
    dispatch({ type: "get" });
  },[]);

  return (
    <>
      <Card sx={{ maxWidth: "100%", textAlign: "center" }}>
        <CardContent>
          <Typography gutterBottom variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider style={{ marginTop: "-20px" }} />
          <ToggleButtonGroup
            style={{ direction: "ltl", marginTop: "30px" }}
            exclusive
            aria-label="text alignment"
            value={activeBtn}
            onChange={(e) => setActiveBtn(e.target.value)}
            color="primary"
          >
            <ToggleButton value={"no-comdleted"}>الغير منجز </ToggleButton>
            <ToggleButton value={"comdleted"}>المنجز</ToggleButton>
            <ToggleButton value={"all"}>الكل</ToggleButton>
          </ToggleButtonGroup>

          <div
            style={{ maxHeight: "58vh", overflow: "auto", marginTop: "20px" }}
          >
            {todoContent}
          </div>

          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => handleAddClick()}
                disabled={titleInput.length === 0}
              >
                اضافه
              </Button>
            </Grid>
            <Grid size={8}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* {DELETE MODAL} */}

      <Dialog
        style={{ direction: "rtl" }}
        open={DialogDelete}
        onClose={closePoppDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePoppDelete}>إغلاق</Button>
          <Button onClick={handleDleteConfirm} autoFocus>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* {DELETE MODAL} */}
      {/* {UPDATE MODAL} */}

      <Dialog
        style={{ direction: "rtl" }}
        open={DialogUpdate}
        onClose={() => setDialogUpdate(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمه</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="التفاصيل"
            fullWidth
            variant="standard"
            value={todo.details}
            onChange={(e) => setTodo({ ...todo, details: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogUpdate(false)}>إغلاق</Button>
          <Button onClick={handelUpdateConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/* {UPDATE MODAL} */}
    </>
  );
}
