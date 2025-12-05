import React from 'react';
import { Card } from 'react-bootstrap';
import { FaList } from 'react-icons/fa';
import Task from './Task.jsx'

const TasksList = ({ tasks, onComplete, onEdit, onDelete }) => {

  return (
    <Card style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', border: '2px solid #9b59b6', borderRadius: '15px', boxShadow: '0 6px 20px rgba(155, 89, 182, 0.2)' }}>
      <Card.Header style={{ background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)', borderRadius: '13px 13px 0 0' }}>
        <h5 className="fw-bold text-white"><FaList className="me-2" />Tasks List</h5>
      </Card.Header>
      <Card.Body>
        {tasks.length === 0 ? (
          <div className="text-center text-muted">
            No tasks available. Create your first task!
          </div>
        ) : (
          <div>
            {tasks.map(task => (
              <Task key={task._id} task={task} onComplete={onComplete} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TasksList;