import React, {useState} from 'react';
import { Row, Col, Form, Button} from 'react-bootstrap'
import{gql, useMutation} from '@apollo/client';

const REGISTER_USER = gql`
  mutation register( $username: String!
                      $email: String!
                      $password: String!
                      $confirmPassword: String!)
{
    register(username: $username
    email: $email
  password: $password
  confirmPassword: $confirmPassword{
username email CreatedAt
    }
  }
`;

export default function Register(){

  const [variables, setVariables] = useState({
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

const [ registerUser, {loading}] = useMutation(REGISTER_USER,{
  update(_, res){
    console.log(res);
  },
  onceError(err){
    console.log(err.graphQLError[0].extensions.errors);
    setErrors();
  }
});

  const submitRegisterForm = e =>{
    e.preventDefault();

    registerUser({variables});
  }
  return(

<Row className = "bg-white py-5 justify-content">
  <Col sm={8} md={6} lg={4}>

    <h1 className='text-center'> Register </h1>
    <Form onSubmit={submitRegisterForm}>
    <Form.Group>
      <Form.Label className={errors.email && 'text-danger'}>
      {errors.email && 'Email address'}
      </Form.Label>
      <Form.Control
        type="email"
        value={variables.email}
        className={errors.email && 'is-invalid'}
        onChange={e =>
          setVariables({...variables, email: e.target.value})
        }/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="username"
        value={variables.username}
        onChange={e =>
          setVariables({...variables, username: e.target.value})
        }/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={variables.password}
        onChange={e =>
          setVariables({...variables, password: e.target.value})
        }/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Confirm password</Form.Label>
      <Form.Control
        type="passowrd"
        value={variables.confirmPassword}
        onChange={e =>
          setVariables({...variables, confirmPassword: e.target.value})
        }/>
    </Form.Group>
    <div className = "text-center">
      <Button variant="success" type="submit" disabled={loading}>
        {loading? 'loading..' : 'Register' }
    </Button>
    </div>
    </Form>

  </Col>
</Row>
);
}
