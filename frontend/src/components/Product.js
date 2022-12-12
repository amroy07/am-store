import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Image, Link, Flex, Text } from '@chakra-ui/react';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Link
      as={RouterLink}
      to={`/product/${product._id}`}
      _hover={{ textDecor: 'none' }}>
      <Box
        maxW='sm'
        borderRadius='lg'
        overflow='hidden'
        bgColor='white'
        _hover={{ shadow: 'md' }}>
        <Image
          src={product.image}
          alt={product.name}
          minH='360px'
          objectFit='cover'
        />
        <Flex py='5' px='4' direction='column' justifyContent='space-between'>
          <Heading as='h4' fontSize='lg' mb='3'>
            {product.name}
          </Heading>
          <Flex alignItems='center' justifyContent='space-between'>
            <Rating value={product.rating} color='yellow.500' />
            <Text fontSize='2xl' fontWeight='bold' color='blue.600'>
              ₹{product.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Product;
