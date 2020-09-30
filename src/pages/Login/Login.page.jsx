import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useAuth } from '../../providers/Auth';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Container from './Container.styled';
import FormWrapper from './FormWrapper.styled';
import Box from './Box.styled';

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event, name) => {
    event.persist();
    setValues((prevState) => ({ ...prevState, [name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    const { username, password } = values;
    e.preventDefault();
    try {
      await login(username, password);
      history.push('/');
    } catch (error) {
      console.log('e: ', error);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextInput
              placeholder="Username"
              value={values.username}
              onChange={(event) => handleChange(event, 'username')}
            />
          </Box>
          <Box>
            <TextInput
              placeholder="Password"
              value={values.password}
              onChange={(event) => handleChange(event, 'password')}
              password
            />
          </Box>
          <Box align="center">
            <Button>Login</Button>
          </Box>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
