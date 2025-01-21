import ProductList from '@/features/products/components/ProductList/ProductList'
import classes from './productPage.module.scss'
const ProductsPage = () => {
  return (
    <div className={classes.products__page}>
      <ProductList title='CAPS'/>
      <ProductList title='HATS'/>
    </div>
  )
}

export default ProductsPage