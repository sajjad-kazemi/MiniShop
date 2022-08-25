import {Outlet} from 'react-router-dom'
import {ButtonGroup, Button, Container, Paper} from '@mui/material'
import {useSelector,useDispatch} from 'react-redux'
import {getCategories, fetchAsyncAllProducts} from '../../features/commonInfo/commonInfoSlice'
import {Link} from 'react-router-dom'
function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  return (
    <>
      <Container component="section">
        <Paper elevation={0} sx={{display:'flex',justifyContent: 'center',mt:2}}>
          <ButtonGroup color="secondary" variant='contained' sx={{flexWrap:'wrap',justifyContent: 'center',boxShadow:'none'}}>
            {categories.map((category) =>{
              return (
                <Button component={Link} to={"/categories/"+category} color="secondary" sx={{borderRadius:0,border:'none',backgroundColor:'secondary.dark',borderColor:'secondary.light'}} onClick={()=>dispatch(fetchAsyncAllProducts({allProducts:false,category}))} key={category}>
                  {category}
                </Button>
              )
            })}
          </ButtonGroup>
        </Paper>
        <br/>
        <Outlet/>
      </Container>
    </>
  )
}

export default Categories