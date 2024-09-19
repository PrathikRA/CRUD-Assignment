import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/taskSlice';
import TaskForm from './TaskForm';

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'in-progress' | 'completed';
}

const TaskList: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: { tasks: { tasks: Task[] } }) => state.tasks.tasks);

    const handleDelete = (id: number) => {
        dispatch(deleteTask(id));
    };

    return (
        <div>
            {tasks.length === 0 ? (
                <p>No tasks available</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Due: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Status: {task.status}</p>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                            <TaskForm existingTask={task} /> {/* Edit Task Form */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
