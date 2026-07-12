import { useEffect } from 'react';
import CardProduct from '../components/cardProduct/CardProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../features/products/products';
import { useFetch } from '../hooks/useFetch';
import HeroBanner from '../components/heroBanner/HeroBanner';
import { gerenciadorDeProdutos } from '../storage';
import './styles.scss';

export default function Home() {
  const dispatch = useDispatch();
  // const products = useSelector(state => state.products);
  const { products, isLoading, error } = useState('');
  // const { data: productsStart } = useFetch('https://dummyjson.com/products?limit=8');

  useEffect(() => {
    if (products) {
      // dispatch(addProduct(products));
      dispatch(gerenciadorDeProdutos());
    }
  }, [products, dispatch]);

  return (
    <main id="main-content">
      <HeroBanner />
      <div className="main-content">
        <div className="container m-auto">
          <h2 className="w-full text-center mb-5 mt-7 text-4xl font-bold">Produtos</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 lg:px-0 gap-7">
            {products?.map(product => (
              <CardProduct key={product.id} props={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
