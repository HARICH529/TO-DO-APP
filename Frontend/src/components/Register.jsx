import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:8000/user-api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          todos: []
        }),
      });

      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Registration failed');
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
        <Card style={{ background: '#ffffff', border: '2px solid #28a745', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Card.Header className="text-center" style={{ background: '#28a745', borderRadius: '8px 8px 0 0' }}>
            <h4 className="fw-bold text-white">Register</h4>
          </Card.Header>
          <Card.Body>
            {message && (
              <Alert variant={message.includes('successful') ? 'success' : 'danger'}>
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label><FaUser className="me-2" />Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
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
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Button 
                type="submit" 
                className="w-100" 
                style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
