import { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { AccountModalContext } from "../structure/ModalProviders";

const FinanceModal = ({ open, onClose, onSubmit }) => {
  const { setIsAccountModal } = useContext(AccountModalContext);
  const [finance, setFinance] = useState({
    name: "",
    balance: "",
    goal: "",
    saved: "",
    monthly_amount: "",
    goal_date: "",
    month_left: "",
  });

  const handleChange = (e) => {
    setFinance({ ...finance, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    //onSubmit(finance);
    onClose();
    setIsAccountModal(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Finance</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Balance"
          name="balance"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Goal"
          name="goal"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Saved"
          name="saved"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Monthly Amount"
          name="monthly_amount"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Goal Date (Unix)"
          name="goal_date"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
        <TextField
          label="Months Left"
          name="month_left"
          type="number"
          fullWidth
          margin="dense"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinanceModal;
