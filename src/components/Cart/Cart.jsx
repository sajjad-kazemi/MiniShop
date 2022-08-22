import { Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../features/userInfo/userInfoSlice";
import { openModal } from "../../features/commonInfo/commonInfoSlice";
import { useEffect } from "react";
import {
  getTotalPrice,
  getCart,
  clearCart,
  setTotalPrice
} from "../../features/userInfo/userInfoSlice";
import Card from './Card'
function Cart() {
  const currentTotalPrice = useSelector(getTotalPrice);
  const products = useSelector(getCart);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!login) {
      dispatch(openModal());
    }
  }, [login]);
  useEffect(()=>{
    dispatch(setTotalPrice({clear:true}))
  },[])
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
  if (login) {
    return (
      <>
        <Box component="section">
          <Typography>Total Price: {currentTotalPrice} $</Typography>
          {products &&
            Object.keys(products).map((id) => {
              return (
                <Card key={id} amount={products[id]} id={id}/>
              );
            })}
        </Box>
      </>
    );
  }
}

export default Cart;
