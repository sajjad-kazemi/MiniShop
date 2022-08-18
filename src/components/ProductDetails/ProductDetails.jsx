import {useParams} from 'react-router-dom'

function ProductDetails() {
  const {productDetails} = useParams()
  return (
    <div>{productDetails}</div>
  )
}

export default ProductDetails