import { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {useFetch} from '../hooks/useFetch';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {request, loading, error, clearError} = useFetch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }
  , [error]);

  const formValidation = () => {
    if (email == '' || password == '') {
      toast('Пожалуйста, заполните все поля')
      return false
    }
    return true
  }

  const handleRegister = async (e) => {
    const isValid = formValidation();

    if (isValid) {
      try {
				const data = await request('/api/auth/register', 'POST', { email, password });
        setMessage('Пользователь успешно создан')
        console.log(data);
			} catch (err) {
				console.log('catch', err);
			} finally {
        setEmail('');
        setPassword('');
			}
    }
  }

  const handleLogin = async (e) => {
    const isValid = formValidation();

    if (isValid) {
      try {
        const data = await request('/api/auth/login', 'POST', { email, password });
        setMessage('Пользователь успешно авторизован')
        console.log(data);
      } catch (err) {
        console.log('catch', err);
      } finally {
        setEmail('');
        setPassword('');
      }
    }
  }

  

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome to our app</h2>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button onClick={handleLogin} variant="primary" className="w-100 mt-4">
              Log In
            </Button>
            <Button onClick={handleRegister} variant="outline-primary" className="w-100 mt-4">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer/>
    </Container>
  );
};