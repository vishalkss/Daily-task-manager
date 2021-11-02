import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Checkbox from "@material-ui/core/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { useForm, Controller } from "react-hook-form";

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

const EditTask = (props) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [date, setDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     UpdateTask();
//   };

  let taskData = props.data; 
  console.log("taskData", taskData, date);

  const closeForm = () => {
    props.handleClose(false);
  };

  const handleDate = (data) => {
      taskData.due_date = data;
      setDate(data);
  }
   const onSubmit = (data1) => {
    console.log("data1", data1, date);
     const token = localStorage.getItem("token");
     axios({
       method: "put",
       url: baseURL + "tasks/update-task/" + props.data._id,
       headers: {
         "Content-Type": "application/json",
         "x-access-token": token,
       },
       data: {
         name: data1.name,
         description: data1.description,
         due_date: data1.due_date,
         is_completed: checked,
       },
     })
       .then(function (response) {
         let data = response.data;
         console.log("data", data);
         toast.success(data.message, {
           position: "top-center",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           toastId: "success1",
         });
         setTimeout(() => {
           closeForm();
         }, 2000);
       })
       .catch(function (error) {
         console.log("error", error.message);
         toast.error(error.message, {
           position: "top-center",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           toastId: "error1",
         });
       });
   };

  const [checked, setChecked] = React.useState(taskData.is_completed);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue={taskData.name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Task Name"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Name required" }}
        />
        <Controller
          name="description"
          control={control}
          defaultValue={taskData.description}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Description"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          //   rules={{ required: "description required" }}
        />
        <Controller
          name="due_date"
          control={control}
          defaultValue={taskData.due_date}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Due Date"
              variant="filled"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              id="date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          rules={{ required: "Due date required" }}
        />
        <Controller
          name="is_completed"
          control={control}
          defaultValue={taskData.is_completed}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="topping">
              Completetion Status
              <Checkbox
                color="primary"
                checked={checked}
                onChange={handleChange}
              />
            </div>
          )}
        />
        <div>
          <Button variant="contained" onClick={closeForm}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            // onClick={UpdateTask}
          >
            UPDATE
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditTask;
