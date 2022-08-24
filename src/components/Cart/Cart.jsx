import { Typography, Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../features/userInfo/userInfoSlice";
import { openModal } from "../../features/commonInfo/commonInfoSlice";
import { useEffect } from "react";
import {
  getTotalPrice,
  getCart,
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
        <Typography variant="h6">Please Login</Typography>
        <Button variant="contained" onClick={() => dispatch(openModal())}>
          Login | Signin
        </Button>
      </Box>
    );
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
          <Container>
          <Typography color='text.info' variant='h5' textAlign='center' my={3}>Total Price: {TotalPrice.toFixed(2)} $</Typography>
            <Grid container spacing={3}>
              {products &&
                Object.keys(products).map((id) => {
                  return <Card currentUser={currentUser} key={id} amount={products[id]} id={id} />;
                })}
            </Grid>
            <Button variant="outlined" onClick={clear}>
              Clear Cart
            </Button>
          </Container>
        </Box>
      </>
    );
  }
}

export default Cart;
