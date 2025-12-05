import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const Task = ({ task, onComplete, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState(task.taskName);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const handleComplete = () => {
    if (task.status === 'completed') {
      onDelete(task._id);
    } else {
      onComplete(task._id);
    }
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = () => {
    onEdit(task._id, editName, editDescription);
    setShowModal(false);
  };

  return (
    <Card 
      className="mb-3" 
      style={{ 
        borderRadius: '12px', 
        border: '2px solid #e74c3c',
        background: task.status === 'completed' ? 'linear-gradient(135deg, #d5f4e6, #ffffff)' : 'linear-gradient(135deg, #fff9c4, #ffffff)',
        boxShadow: '0 4px 15px rgba(231, 76, 60, 0.2)'
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className={`mb-0 fw-bold ${task.status === 'completed' ? 'text-decoration-line-through text-success' : 'text-primary'}`}>
            {task.taskName}
          </h6>
          <Button 
            variant={task.completed ? 'success' : 'warning'}
            size="sm" 
            style={{ 
              borderRadius: '15px', 
              fontSize: '12px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {task.status === 'completed' ? 'Completed' : 'Pending'}
          </Button>
        </div>
        
        {task.description && (
          <p className={`mb-3 ${task.status === 'completed' ? 'text-success' : 'text-dark'}`} style={{ fontStyle: 'italic' }}>
            {task.description}
          </p>
        )}
        
        <div className="d-flex justify-content-end gap-2">
          {task.status !== 'completed' && (
            <Button
              variant="info"
              size="sm"
              onClick={handleEdit}
              style={{ 
                borderRadius: '15px',
                fontWeight: 'bold',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
            >
              Edit
            </Button>
          )}
          <Button
            variant={task.status === 'completed' ? 'danger' : 'success'}
            size="sm"
            onClick={handleComplete}
            style={{ 
              borderRadius: '15px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            {task.status === 'completed' ? 'Delete' : 'Mark as Completed'}
          </Button>
        </div>
      </Card.Body>
      
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Task;