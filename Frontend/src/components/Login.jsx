import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8000/user-api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.message === 'Login successful') {
        setMessage('Login successful! Redirecting...');
        onLogin(result.payload);
        setTimeout(() => navigate('/profile'), 1500);
      } else {
        setMessage(result.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={6} lg={4}>
        <Card style={{ background: '#ffffff', border: '2px solid #007bff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Header className="text-center" style={{ background: '#007bff', borderRadius: '8px 8px 0 0' }}>
            <h4 className="fw-bold text-white">Login</h4>
          </Card.Header>
          <Card.Body>
            {message && (
              <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Email</Form.Label>
                <Form.Control
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaLock className="me-2" />Password</Form.Label>
                <Form.Control
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
