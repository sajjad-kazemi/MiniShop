import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  fetchAsyncAllProducts,
  getProductsLoading,
  openModal,
} from "../../../features/commonInfo/commonInfoSlice";
import {getCart,cartChange,getLogin,getCurrentUser} from '../../../features/userInfo/userInfoSlice'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

function ListContainer({ category }) {
  const products = useSelector(getAllProducts);
  const productsLoading = useSelector(getProductsLoading);
  const currentUser = useSelector(getCurrentUser);
  const cart  = useSelector(getCart);
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    const type = category && { allProducts: false, category };
    dispatch(fetchAsyncAllProducts(type));
  }, [category]);
  if (productsLoading) {
    return <>{productsLoading && <>loading...</>}</>;
  }
  const handleChange = (info)=>{
    if(!login){
      dispatch(openModal());
      return;
    }
    dispatch(cartChange(info))
  }
  return (
    <Grid container spacing={2}>
      {products &&
        products.map((item) => {
          return (
            <Grid container sx={{mt:4}} key={item.id} xs={12} sm={6} md={4} xlg={2} >
              <Card sx={{ maxWidth: 300, maxHeight:4000 }}>
                <CardMedia
                  image={item.image}
                  height="400"
                  sx={{width:{xs:'100%',sm:'auto'},height:{xs:'auto',sm:400}}}
                  component="img"
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom component="div" variant="h6">
                    {item.title}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={()=>handleChange({id:item.id,number:1,currentUser})}>
                    <AddCircleOutlineRounded color="primary" />
                  </IconButton>
                    <Typography variant="h6">{cart[item.id] || '0'}</Typography>
                  <IconButton onClick={()=>handleChange({id:item.id,number:-1,currentUser})}>
                    <RemoveCircleOutlineRounded color="primary" />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ListContainer;
