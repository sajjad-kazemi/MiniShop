import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Box, Typography, IconButton } from "@mui/material";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import {getCart,cartChange,getCurrentUser,getLogin} from '../../features/userInfo/userInfoSlice'
import {openModal} from '../../features/commonInfo/commonInfoSlice'
function ProductDetails() {
  const [product, setProduct] = useState({});
  const { productDetails } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const login = useSelector(getLogin);
  const currentUser = useSelector(getCurrentUser);
  const amount = cart[product.id] || '0';
  const handleClick = (number)=>{
    if(!login){
      dispatch(openModal());
      return;
    }
    const info = {currentUser, number,id:product.id,totalPrice:currentUser.totalPrice,price:product.price}
    dispatch(cartChange(info))
  }
  useEffect(() => {
    axios
      .get("products/" + productDetails)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((er) => {
        console.error(er);
      });
  }, []);
  return (
    <Box component="section">
      <Typography sx={{mx:3}} variant="h5">{product.title}</Typography>
      <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'} }}>
        <Box sx={{ width: { xs: "100%", md: "50vw" },mx:1,height:'auto' , '& img':{width:'100%'}}} component='div'><img src={product.image} alt="" />
      <Typography sx={{my:2}} textAlign="center" variant="body1">{product.price} $</Typography>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
          <IconButton onClick={()=>handleClick(1)}>
            <AddCircleOutlineRounded color="secondary"/>
          </IconButton>
          <Typography>{amount}</Typography>
          <IconButton onClick={()=>handleClick(-1)}>
            <RemoveCircleOutlineRounded color="secondary"/>
          </IconButton>
        </Box>
        </Box>
        <Typography sx={{mx:1,my:2}} variant="body1">{product.description}</Typography>
      </Box>
    </Box>
  );
}

export default ProductDetails;
