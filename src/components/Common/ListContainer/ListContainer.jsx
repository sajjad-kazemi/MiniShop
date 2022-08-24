import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  fetchAsyncAllProducts,
  getProductsLoading,
  openModal,
} from "../../../features/commonInfo/commonInfoSlice";
import {cartChange,getLogin,getCurrentUser,getTotalPrice} from '../../../features/userInfo/userInfoSlice'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Skeleton,
  Box,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'
import {Link, useNavigate} from 'react-router-dom'
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

function ListContainer({ category }) {
  const navigate = useNavigate()
  const products = useSelector(getAllProducts);
  const productsLoading = useSelector(getProductsLoading);
  const totalPrice = useSelector(getTotalPrice);
  const currentUser = useSelector(getCurrentUser);
  const {cart} = currentUser; 
  const login = useSelector(getLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    const type = category && { allProducts: false, category:category };
    dispatch(fetchAsyncAllProducts(type));
  }, [category]);
  if (productsLoading) {
    return (
      <Grid sx={{mt:4}}  container spacing={2}>
        {[...Array(12)].map((_,index)=>{
          return (
            <Grid key={index}  xs={12} sm={6} md={4} xlg={2}>
              <Card sx={{width:300,height:600,justifyContent:'center',display:'flex',mx:'auto',mt:0}}>
                <CardContent>
                  <Skeleton sx={{height:30,m:0}} animation="wave" variant="text"/>
                  <Skeleton animation="wave" variant="rounded" width={400} height={400}/>
                  <Box sx={{display:'flex',justifyContent: 'center',alignItems: 'center'}}>
                    <Skeleton animation="wave" variant='circular' sx={{mx:'10px',my:'30px'}} width={30} height={30}/>
                    <Skeleton animation="wave" variant='circular' sx={{mx:'20px',my:'30px'}} width={25} height={25}/>
                    <Skeleton animation="wave" variant='circular' sx={{mx:'10px',my:'30px'}} width={30} height={30}/>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    );
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
            <Grid  sx={{mt:4}} key={item.id} xs={12} sm={6} md={4} xlg={2} >
              <Card sx={{ maxWidth: 300, maxHeight:4000 ,minHeight:450,mx:'auto' }}>
                <CardContent sx={{backgroundColor:'#eee',width:'100%',height:'100%',pb:1,mb:1}} >
                  <Typography gutterBottom component="div" variant="subtitle2">
                    <Link style={{textDecoration: 'none',fontSize:'inherit',color:'inherit'}} to={'/detail/'+item.id}>{item.title}</Link>
                  </Typography>
                </CardContent>
                <CardMedia
                  image={item.image}
                  height="400"
                  sx={{width:{xs:'100%',sm:'auto'},maxWidth:300,height:{xs:'auto'},maxHeight:400,cursor:'pointer'}}
                  component='img'
                  onClick={()=>navigate('/details/'+item.id)}
                  alt={item.title}
                />
                <CardActions sx={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                  <IconButton onClick={()=>handleChange({totalPrice,id:item.id,number:1,currentUser,price:item.price})}>
                    <AddCircleOutlineRounded color="primary" />
                  </IconButton>
                    <Typography variant="h6">{(login && cart[item.id]) || '0'}</Typography>
                  <IconButton onClick={()=>handleChange({totalPrice,id:item.id,number:-1,currentUser,price:item.price})}>
                    <RemoveCircleOutlineRounded color="primary" />
                  </IconButton>
                </CardActions>
                <CardContent>
                  {item.price+" "}$
                </CardContent>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default ListContainer;
