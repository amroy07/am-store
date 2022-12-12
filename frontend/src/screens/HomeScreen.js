import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Heading } from '@chakra-ui/react';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <Heading as='h2' mb='8' fontSize='3xl'>
        Latest Products
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type='error'>{error}</Message>
      ) : (
        <Grid templateColumns='1fr 1fr 1fr 1fr' gap='8'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};

export default HomeScreen;
