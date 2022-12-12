import { useState, useEffect } from 'react';
import {
  Link as RouterLink,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spacer,
} from '@chakra-ui/react';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  let redirect = searchParams.get('redirect') || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <Flex w='full' alignItems='center' justifyContent='center' py='5'>
      <FormContainer>
        <Heading as='h1' mb='8' fontSize='3xl'>
          Register
        </Heading>

        {error && <Message type='error'>{error}</Message>}
        {message && <Message type='error'>{message}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id='name'>
            <FormLabel>Name</FormLabel>
            <Input
              type='name'
              placeholder='Your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />

          <FormControl id='email'>
            <FormLabel>Email Address</FormLabel>
            <Input
              type='email'
              placeholder='username@domain.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />

          <FormControl id='password'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              placeholder='************'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Spacer h='3' />

          <FormControl id='configPassword'>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              placeholder='************'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button type='submit' colorScheme='teal' mt='4' isLoading={loading}>
            Register
          </Button>
        </form>

        <Flex pt='10'>
          <Text fontWeight='semibold'>
            Already a customer? Click{' '}
            <Link as={RouterLink} to={`/login?redirect=${redirect}`}>
              here
            </Link>{' '}
            to login
          </Text>
        </Flex>
      </FormContainer>
    </Flex>
  );
};

export default RegisterScreen;
