import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";


const baseURL = "http://localhost:3001/api/v1/";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const AddTask = (props) => {
  const classes = useStyles();
  // create state variables for each input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateTask();
  };

  const closeForm = () => {
    props.handleClose(false);
  };

  const CreateTask = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: baseURL + "tasks/create",
      headers: { 
        "Content-Type": "application/json",
        "x-access-token": token
      },
      data: {
        name: name,
        description: description,
        due_date: date,
        is_completed: 0
      },
    })
      .then(function (response) {
        let data = response.data;
        console.log("data", data);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "success1",
        });
        closeForm();
      })
      .catch(function (error) {
        console.log("error", error.message);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "error1",
        });
      });
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Task Name"
          variant="filled"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Task description"
          variant="filled"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Due date"
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div>
          <Button variant="contained" onClick={closeForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={CreateTask}
          >
            ADD
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
