import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Radio,
  HStack,
  RadioGroup,
} from '@chakra-ui/react';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(
    paymentMethod || 'paypal'
  );

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethodRadio));
    navigate('/placeorder');
  };

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <CheckoutSteps step1 step2 />

        <Heading as='h1' mb='8' fontSize='3xl'>
          Shipping
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl as='fieldset'>
            <FormLabel as='legend'>Select Method</FormLabel>
            <RadioGroup
              defaultValue={paymentMethodRadio}
              onChange={setPaymentMethodRadio}
              value={paymentMethodRadio}
            >
              <HStack space='24px'>
                <Radio value='paypal'>PayPal or Credit/Debit Card</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button type='submit' colorScheme='teal' mt='4'>
            Continue
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default PaymentScreen;
