import { useEffect, useState, useContext } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import {useFetch} from '../hooks/useFetch';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const auth = useContext(AuthContext);
  const { request, loading, error, clearError } = useFetch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const formValidation = () => {
    if (form.email === '' || form.password === '') {
      toast.warning('Пожалуйста, заполните все поля')
      return false
    }
    return true
  }

  const handleLogin = async (e) => {
    const isValid = formValidation();

    if (isValid) {
      try {
        const data = await request('/api/auth/login', 'POST', { email: form.email, password: form.password });
        if (!error && data) {
          console.log('data', data);
          auth.login(data.userId, data.token, data.username);
          toast('User successfully logged in');
        }
       
      } catch (err) {
        console.log('catch', err);
      } finally {
        setForm({
          email: '',
          password: ''
        });
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4" style={{ width: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome to DevLogs</h2>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button onClick={handleLogin} variant="primary" className="w-100 mt-4">
              Log In
            </Button>
          </Form>
          <p className='mt-4'>
            Don't have an account?
            <Button disabled={loading} variant="link" onClick={() => navigate("/register")}>Register</Button>
          </p>
        </Card.Body>
      </Card>
      <ToastContainer/>
    </Container>
  );
};