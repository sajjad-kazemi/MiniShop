import { Typography, Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../features/userInfo/userInfoSlice";
import { openModal } from "../../features/commonInfo/commonInfoSlice";
import { useEffect } from "react";
import {DeleteOutlined,CreditScoreOutlined} from '@mui/icons-material'
import {
  getTotalPrice,
  clearCart,
  getAccounts,
  getCurrentUser,
} from "../../features/userInfo/userInfoSlice";
import Card from "./Card";
function Cart() {
  const accounts = useSelector(getAccounts);
  const currentUser = useSelector(getCurrentUser);
  const TotalPrice = useSelector(getTotalPrice);
  const login = useSelector(getLogin);
  const products = currentUser.cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!login) {
      dispatch(openModal());
    }
  }, [login]);
  if (!login) {
    return (
      <Box component="section" sx={{ mx: "auto", my: 5, width: "fit-content" }}>
        <Typography textAlign='center' variant="h6">Please Login</Typography>
        <Button variant="contained" onClick={() => dispatch(openModal())}>
          Login | Signin
        </Button>
      </Box>
    );
  }
  const pay = ()=>{
    if(confirm('Are you sure you want to finish payment?')){
      dispatch(clearCart({ currentUser, accounts }));
      alert('⭐Thanks for buying the products are on the way 🚛')
    }
  }
  const clear = () => {
    if (TotalPrice === 0) {
      return;
    }
    if (confirm("are you sure to clear?")) {
      dispatch(clearCart({ currentUser, accounts }));
    }
  };
  if (login) {
    return (
      <>
        <Box component="section">
          <Container sx={{display: 'flex',flexDirection: 'column'}}>
          {(TotalPrice && <Typography sx={{border:'3px #0288D1 solid',borderRadius:2,width:'fit-content',mx:'auto',px:2,py:1,color:'info.dark'}} color='text.info' variant='h5' textAlign='center' my={3}>Total Price: {TotalPrice.toFixed(2)} $</Typography>) || <Typography variant='h5' sx={{mx:'auto',my:2,px:2,py:1,color:'error.main',border:'3px #D33230 solid',borderRadius:2}}>The Cart is empty</Typography>}
            <Grid container spacing={3}>
              {products &&
                Object.keys(products).map((id) => {
                  return <Card currentUser={currentUser} key={id} amount={products[id]} id={id} />;
                })}
            </Grid>
            <Box sx={{display:'flex',flexWrap:'wrap'}}>
              <Button color='error' disabled={TotalPrice===0 || false} variant="outlined" startIcon={<DeleteOutlined/>} onClick={clear} sx={{mx:'auto',my:5}}>
                Clear Cart
              </Button>
              <Button disabled={TotalPrice===0 || false} variant="outlined" endIcon={<CreditScoreOutlined/>} onClick={pay} sx={{mx:'auto',my:5}}>
                Finish Payment
              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
}

export default Cart;
