import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, massage }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {massage}
        </Alert>
      </Snackbar>
    </div>
  );
}
