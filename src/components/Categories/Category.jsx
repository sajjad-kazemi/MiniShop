import {useParams} from 'react-router-dom'
import ListContainer from '../Common/ListContainer/ListContainer';
function Category() {
  let {category} = useParams()
  return (
    <>
      <ListContainer category={category}/>
    </>
  )
}

export default Category