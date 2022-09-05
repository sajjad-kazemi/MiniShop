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
      <Grid xs={12} md={6} lg={4}>
        <Box>
          <div className="basic"></div>
        </Box>
      </Grid>
    )
  }
  return (
    <>
      <Grid xs={12} md={6} lg={4}>
        <CardMui sx={{ display: "flex", flexWrap:'nowrap',height:200,width:'auto',position:'relative' }}>
          <CardMedia 
            image={product.image}
            component='img'
            onClick={()=>navigate('/details/'+product.id)}
            sx={{cursor:'pointer',width:'30%',height:'100%',objectFit:'contain'}}
          />
            <CardContent>
              <Link to={'/details/'+product.id} style={{textDecoration: 'none',fontSize:'inherit',color:'inherit',display:'block'}}>
                <Typography sx={{textOverflow:'ellipsis',wordWrap:'break-word',overflow:'hidden'}} variant='body1'>{product.title}</Typography>
              </Link>
              <Typography sx={{display:'block'}} variant='body2'>{+product.price}$</Typography>
            </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center",alignItems: "center"}}>
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
              <Typography sx={{m:0}} variant="body2">{amount}</Typography>
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
        </CardMui>
      </Grid>
    </>
  );
}

export default Card;
