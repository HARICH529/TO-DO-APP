import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FaPlus, FaTasks } from 'react-icons/fa';

const CreateTask = ({ onAddTask }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    onAddTask(data);
    reset();
  };

  return (
    <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', border: '2px solid #27ae60', borderRadius: '15px', boxShadow: '0 6px 20px rgba(39, 174, 96, 0.2)' }}>
      <Card.Header style={{ background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)', borderRadius: '13px 13px 0 0' }}>
        <h5 className="fw-bold text-white"><FaPlus className="me-2" />Create New Task</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label><FaTasks className="me-2" />Task Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task name"
              {...register('name', { required: 'Task name is required' })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              {...register('description')}
            />
          </Form.Group>

          <Button 
            variant="success" 
            type="submit" 
            className="w-100 fw-bold"
            style={{ 
              background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
              border: 'none',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
              fontSize: '16px'
            }}
          >
            <FaPlus className="me-2" />Create Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateTask;