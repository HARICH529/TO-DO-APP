import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CreateTask from './CreateTask.jsx'
import TasksList from './TasksList.jsx'

const UserProfile = ({ userData }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (userData && userData.todos) {
      setTasks(userData.todos);
    }
  }, [userData]);

  const addTask = async (taskData) => {
    try {
      const response = await fetch(`http://localhost:8000/user-api/todo/${userData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(taskData)
      });
      const result = await response.json();
      if (response.ok) {
        setTasks(result.payload.todos);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskComplete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/user-api/edit-status/userid/${userData._id}/taskid/${taskId}`, {
        method: 'PUT',
        credentials: 'include'
      });
      const result = await response.json();
      if (response.ok) {
        setTasks(result.payload.todos);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleTaskEdit = async (taskId, newName, newDescription) => {
    try {
      const response = await fetch(`http://localhost:8000/user-api/edit-todo/userid/${userData._id}/taskid/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: newName, description: newDescription })
      });
      const result = await response.json();
      if (response.ok) {
        setTasks(result.payload.todos);
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8000/user-api/delete-todo/userid/${userData._id}/taskid/${taskId}`, {
        method: 'PUT',
        credentials: 'include'
      });
      const result = await response.json();
      if (response.ok) {
        setTasks(result.payload.todos);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', border: '2px solid #3498db', borderRadius: '15px', boxShadow: '0 6px 20px rgba(52, 152, 219, 0.2)' }}>
            <Card.Header style={{ background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', borderRadius: '13px 13px 0 0' }}>
              <h4 className="text-center fw-bold text-white">User Profile</h4>
            </Card.Header>
            <Card.Body>
              <p className="text-center fw-bold" style={{ color: '#2c3e50', fontSize: '18px' }}>Welcome to your Todo Dashboard!</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={6}>
          <CreateTask onAddTask={addTask} />
        </Col>
        <Col md={6}>
          <TasksList tasks={tasks} onComplete={handleTaskComplete} onEdit={handleTaskEdit} onDelete={handleTaskDelete} />
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;