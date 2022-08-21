import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  closeModal,
  getLoginModal,
  getModal,
  signOrLog,
} from "../../features/commonInfo/commonInfoSlice";
import {
  getErrorMsg,
  resetErrorMsg,
  setLogin,
  setSignin,
} from "../../features/userInfo/userInfoSlice";
import { useDispatch, useSelector } from "react-redux";

import { Close } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "@mui/material";
import { useEffect, useState } from "react";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 700 },
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "auto",
};

function Login({ isLogin }) {
  const initialForm = {userName:'', password:'',email:''};
  const initialErrors = {userName:false, password:false, email:false}
  const initialErrorMsg = {userName:'', password:'',email:''}
  const [formValues,setFormValues] = useState(initialForm);
  const [errors,setErrors] = useState(initialErrors);
  const [errorMsg,setErrorMsg] = useState(initialErrorMsg);
  const open = useSelector(getModal);
  const loginModal = useSelector(getLoginModal);
  const error = useSelector(getErrorMsg);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModal());
    setFormValues(initialForm)
    
  };
  const handleModalChange = () => {
    setFormValues(initialForm);
    setErrors(initialErrors);
    setErrorMsg(initialErrorMsg);
    dispatch(signOrLog(!loginModal));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      setLogin({ userName: e.target[0].value, password: e.target[2].value })
    );
  };
  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(
      setSignin({
        userName: e.target[0].value,
        password: e.target[2].value,
        email: e.target[4].value,
        cart: {},
      })
    );
  };
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormValues({...formValues,[name]:value});
    validate(e.target)
  }
  const validate =(target)=>{
    const {name,value} = target;
    if(name === 'userName' && value.length < 3){
      setErrors({...errors,[name]:true});
      setErrorMsg({...errorMsg,[name]:'UserName should have 3 characters at least!'})
      return;
    }
    if(name === 'email' ){
      const regex = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      if(!regex.test(value)){
        setErrors({...errors,[name]:true});
        setErrorMsg({...errorMsg,[name]:'Please insert a valid email!'});
        return;
      }
    }
    if(name=== 'password'){
      if(value.length<4){
        setErrors({...errors,[name]:true});
        setErrorMsg({...errors,[name]:'Password should have at least 4 characters'})
        return
      }
    }
    setErrors({...errors,[name]:false});
    setErrorMsg({...errorMsg,[name]:''})
  }
  useEffect(() => {
    if (isLogin) {
      dispatch(closeModal());
    }
  }, [isLogin]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetErrorMsg());
    }, 3000);
  }, [error, isLogin]);

  if (loginModal) {
    return (
      <>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <IconButton onClick={handleClose} sx={{ top: 0, left: 0 }}>
              <Close />
            </IconButton>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h6" textAlign="center">
              Log in
            </Typography>
              <Box onSubmit={handleLogin} component="form" sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField required error={errors.userName} onChange={handleChange} name='userName' label="Username" />
                  </Grid>
                  <Grid
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField error={errors.password} required onChange={handleChange} name='password' label="Password" type="password" />
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "center", m: 1 }}
                    xs={12}
                  >
                    <Button
                      sx={{ width: "30%", mb: 2 }}
                      variant="contained"
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            <Divider />
            Don't have Account?{" "}
            <Link
              onClick={handleModalChange}
              sx={{ useSelect: "none", cursor: "pointer" }}
            >
              Sign in
            </Link>
          </Box>
        </Modal>
      </>
    );
  }
  if (!loginModal) {
    return (
      <>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <IconButton onClick={handleClose} sx={{ top: 0, left: 0 }}>
              <Close />
            </IconButton>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h6" textAlign="center">
              sign in
            </Typography>
            <form onSubmit={handleSignin}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField error={errors.userName} helperText={errorMsg.userName} required onChange={handleChange} name='userName' label="Username" />
                  </Grid>
                  <Grid
                    xs={6}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField error={errors.password} helperText={errorMsg.password} required onChange={handleChange} name='password' label="Password" type="password" />
                  </Grid>
                  <Grid
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <TextField error={errors.email} helperText={errorMsg.email} required onChange={handleChange} name='email' label="Email" type="email" />
                  </Grid>
                  <Grid
                    sx={{ display: "flex", justifyContent: "center", m: 1 }}
                    xs={12}
                  >
                    <Button
                      sx={{ width: "30%", mb: 2 }}
                      variant="contained"
                      type="submit"
                    >
                      Signin
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
            <Divider />
            Already Registered?{" "}
            <Link
              onClick={handleModalChange}
              sx={{ useSelect: "none", cursor: "pointer" }}
            >
              Log in
            </Link>
          </Box>
        </Modal>
      </>
    );
  }
}

export default Login;
