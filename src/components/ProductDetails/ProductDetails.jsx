import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Box, Typography, IconButton, Skeleton } from "@mui/material";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import {getCart,cartChange,getCurrentUser,getLogin} from '../../features/userInfo/userInfoSlice'
import {openModal} from '../../features/commonInfo/commonInfoSlice'
import './Loading.css'
function ProductDetails() {
  const [product, setProduct] = useState({});
  const { productDetails } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const login = useSelector(getLogin);
  const currentUser = useSelector(getCurrentUser);
  const amount = (!login && '-' )|| (cart[product.id] || '0');
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
  if (Object.keys(product).length === 0){
    return (<>
      <Box component='div' sx={{width:'100%',height:'50vh',display:'flex',justifyContent: "center",alignItems:'center'}}>
        <div className="basic"></div>
      </Box>
    </>)
  }
  return (
    <Box component="section">
      <Typography sx={{mx:3,my:1,textAlign:{xs:'center',md:'start'}}} variant="h5">{product.title}</Typography>
      <Box sx={{display:'flex',flexDirection:{xs:'column',sm:'row'} }}>
        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'start',width: { xs: "100%", md: "50vw" },minWidth:'30%',mx:2,my:1,height:'auto','& img':{width:{xs:'80%',md:'100%'},height:{xs:'30%',md:'50vh'},maxHeight:{md:'50vh'},objectFit:'contain',padding:.5},alignSelf:'center'}} component='div'>
        <img style={{alignSelf:'center'}} src={product.image} alt="" />
      <Typography sx={{my:2}} textAlign="center" variant="body1">{product.price} $</Typography>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
          <IconButton onClick={()=>handleClick(1)}>
            <AddCircleOutlineRounded color="secondary"/>
          </IconButton>
          <Typography sx={{backgroundColor:'#eee',minWidth:'1em',width:'fit-content',p:'.1em',textAlign:'center',borderRadius:'.5em'}} variant='h5'>{amount}</Typography>
          <IconButton onClick={()=>handleClick(-1)}>
            <RemoveCircleOutlineRounded color="secondary"/>
          </IconButton>
        </Box>
        </Box>
        <Typography sx={{maxWidth:{xs:'none',md:'70%'},height:'min-content',mx:1,my:2,p:2,textAlign:{xs:'justify',md:'start'},borderWidth:'5px',borderStyle:'double',borderColor:'secondary.light',borderRadius:3}} variant="body1">{product.description}</Typography>
      </Box>
    </Box>
  );
}

export default ProductDetails;
