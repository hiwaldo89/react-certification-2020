import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { useAuth } from '../../providers/Auth';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';

const Container = styled.section`
  background-color: ${({ theme }) => theme.colors.lightgreen};
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  width: 600px;
  max-width: 80%;
  h1 {
    font-family: ${({ theme }) => theme.fonts.heading};
    text-align: center;
    color: ${({ theme }) => theme.colors.darkgreen};
  }
`;

const Box = styled.div`
  margin-bottom: 1.5rem;
  text-align: ${(props) => (props.align ? props.align : 'left')};
`;

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
// import { useHistory } from 'react-router';

// import { useAuth } from '../../providers/Auth';
// import './Login.styles.css';

// function LoginPage() {
//   const { login } = useAuth();
//   const history = useHistory();

//   function authenticate(event) {
//     event.preventDefault();
//     login();
//     history.push('/secret');
//   }

//   return (
//     <section className="login">
//       <h1>Welcome back!</h1>
//       <form onSubmit={authenticate} className="login-form">
//         <div className="form-group">
//           <label htmlFor="username">
//             <strong>username </strong>
//             <input required type="text" id="username" />
//           </label>
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">
//             <strong>password </strong>
//             <input required type="password" id="password" />
//           </label>
//         </div>
//         <button type="submit">login</button>
//       </form>
//     </section>
//   );
// }

export default LoginPage;
