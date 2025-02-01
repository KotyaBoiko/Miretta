import ProductList from '@/features/products/components/ProductList/ProductList'
import classes from './productPage.module.scss'
import { useParams } from 'react-router';
const ProductsPage = () => {
  const {category, collection} = useParams();
  console.log(category, collection)
  return (
    <div className={classes.products__page}>
      <ProductList category={category} collection={collection}/>
    </div>
  )
}

export default ProductsPage