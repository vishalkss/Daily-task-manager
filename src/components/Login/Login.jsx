import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import RegistrationForm from "./Registration";
import Modal from "@material-ui/core/Modal";
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header/Header";
import { Switch, Route, LocalStorage, Redirect, BrowserRouter as Router } from 'react-router-dom'
const baseURL = "http://localhost:3001/api/v1/";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function rand() {
  return Math.round(Math.round() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = (props) => {
  const classes = useStyles();
  const [formStatus, setFormStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setloggedin] = useState(false);

  console.log("i am gere");

  const handleFormStatus = () => {
    setFormStatus(true);
  };

  const closeFrom = () => {
    setFormStatus(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fromBody = (
    <div style={modalStyle} className={classes.modalStyle}>
      <h2 id="simple-modal-title">Add user</h2>
    </div>
  );

  const loginUser = (email, password) => {
    console.log("loginuser", email, password);
    axios({
      method: "post",
      url: baseURL + "login/sign-in",
      headers: { "Content-Type": "application/json" },
      data: {
        email: email,
        password: password,
      },
    })
      .then(function (response) {
        let data = response.data;
        localStorage.setItem("token", data.token);
        setloggedin(true);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(function (error) {
        console.log("error", error);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    loginUser(email, password);
  };

  if (loggedin) {
    return <Redirect to="/Tasks" />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {!formStatus && (
        <div className={classes.paper} onSubmit={handleSubmit}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleFormStatus}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
      {!formStatus && (
        <Box mt={8}>
          <Copyright />
        </Box>
      )}
      <Modal
        open={formStatus}
        onClose={handleFormStatus}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            SignUp
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <RegistrationForm handleClose={setFormStatus}></RegistrationForm>
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

export default Login;
