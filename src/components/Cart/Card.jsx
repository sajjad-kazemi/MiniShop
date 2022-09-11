import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import axios from 'axios';
import {
  Box,
  Card as CardMui,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Skeleton
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalPrice,
  cartChange,
} from "../../features/userInfo/userInfoSlice";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../ProductDetails/Loading.css'
function Card({ id, amount, currentUser }) {
  const totalPrice = useSelector(getTotalPrice);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const handleChange = (info) => {
    dispatch(cartChange(info));
  };
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("products/" + id).then((res) => {
      setProduct(res.data);
    });
  }, []);
  if(!Object.keys(product).length){
    return (
      <></>
    )
  }
  return (
    <>
      <Grid xs={12} md={6} lg={4}>
        <CardMui sx={{ maxWidth: 300, maxHeight:4000 ,minHeight:450,mx:'auto' }}>
            <CardContent sx={{backgroundColor:'#eee',width:'100%',height:'100%',pb:1,pl:1,pr:3,mb:1,fontSize:'clamp(16px,1rem,30px)',textAlign:'justify'
                }}>
              <Typography sx={{width:'100%',position:'relative'}} gutterBottom component="div" variant="subtitle2">
                    <Link style={{width:'100%',textDecoration: 'none',fontSize:'inherit',color:'inherit',whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden',display:'inline-block'}} to={'/details/'+product.id}>{product.title}</Link>
                  </Typography>
            </CardContent>
          <CardMedia 
            image={product.image}
            component='img'
            onClick={()=>navigate('/details/'+product.id)}
            sx={{width:'100%',height:200,cursor:'pointer',objectFit:'contain'}}
          />
          <CardActions sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
              <IconButton
                onClick={() =>
                  handleChange({
                    totalPrice,
                    id,
                    number: 1,
                    currentUser,
                    price: product.price,
                  })
                }
              >
                <AddCircleOutlineRounded color="secondary" />
              </IconButton>
              <Typography sx={{m:0}} variant="h6">{amount}</Typography>
              <IconButton
                onClick={() =>
                  handleChange({
                    totalPrice,
                    id,
                    number: -1,
                    currentUser,
                    price: product.price,
                  })
                }
              >
                <RemoveCircleOutlineRounded color="secondary" />
              </IconButton>
          </CardActions>
          <CardContent sx={{my:0}}>
            {product.price+' '}$
          </CardContent>
        </CardMui>
      </Grid>
    </>
  );
}

export default Card;
