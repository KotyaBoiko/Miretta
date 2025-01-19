import React, { FC } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import productImg from '@/assets/img/nicolcaps-cool--glBOrg1xyM-unsplcapsh.jpg'
type Props = {

}

const ProductList:FC<Props> = () => {
  return (
    <div>
      <ProductCard productImg={productImg} productName={'cap'} productPrice={19.21}/>
    </div>
  )
}

export default ProductList