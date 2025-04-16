import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { Container, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  const { request, loading, error, clearError } = useFetch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error]);

  const handleRegister = async (e) => {
    const isValid = formValidation();

    if (isValid) {
      try {
        const data = await request('/api/auth/register', 'POST', { email: form.email, password: form.password });
        
        if (!error && data) {
            toast('Пользователь успешно создан')
        }
        console.log(data);
      } catch (err) {
        console.log('catch', err);
      } finally {
        setForm({
          email: '',
          password: '',
          username: ''
        });
      }
    }
  }

  const formValidation = () => {
    if (form.email === '' || form.password === '') {
      toast.warning('Пожалуйста, заполните все поля')
      return false
    }
    return true
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
          <h2 className="text-center mb-4">Create an account</h2>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Peter Parker"
                value={form.username}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

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

            <Button onClick={handleRegister} variant="primary" className="w-100 mt-4">
              Register
            </Button>
          </Form>
          <p className="mt-4">
            Already have an account?
            <Button variant="link" onClick={() => navigate("/")}>Log in</Button>
          </p>
        </Card.Body>
      </Card>
      <ToastContainer/>
    </Container>
  )
}