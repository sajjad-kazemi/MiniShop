import {useParams} from 'react-router-dom'

function Category() {
  let {category} = useParams()
  return (
    <div>{category}</div>
  )
}

export default Category