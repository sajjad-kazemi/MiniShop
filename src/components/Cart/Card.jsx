import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";
import axios from "./../../common/api/api";
import {
  Card as CardMui,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalPrice,
  cartChange,
} from "../../features/userInfo/userInfoSlice";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

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
  return (
    <>
      <Grid xs={12} md={6} lg={4}>
        <CardMui sx={{ display: "flex", flexWrap:'wrap' }}>
          <CardMedia 
            image={product.image}
            component='img'
            onClick={()=>navigate('/details/'+product.id)}
            sx={{cursor:'pointer',maxWidth:150,minHeight:100}}
          />
            <CardContent>
              <Link to={'/details/'+product.id} style={{textDecoration: 'none',fontSize:'inherit',color:'inherit'}}>
                <Typography variant='body1'>{product.title}</Typography>
              </Link>
              <Typography variant='body2'>{+product.price}$</Typography>
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
                <AddCircleOutlineRounded color="primary" />
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
                <RemoveCircleOutlineRounded color="primary" />
              </IconButton>
          </CardActions>
        </CardMui>
      </Grid>
    </>
  );
}

export default Card;
