import {useParams} from 'react-router-dom'

function ProductDetails() {
  const {productDetails} = useParams()
  return (
    <section>
      {productDetails}
    </section>
  )
}

export default ProductDetails