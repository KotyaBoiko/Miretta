import ProductList from '@/features/products/components/ProductList/ProductList'
import classes from './productPage.module.scss'
import { useParams } from 'react-router';
const ProductsPage = () => {
  const {category} = useParams();
   console.log(category)
  return (
    <div className={classes.products__page}>
      <ProductList title='CAPS' category={category}/>
    </div>
  )
}

export default ProductsPage