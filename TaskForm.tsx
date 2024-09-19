import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../features/taskSlice';

interface TaskFormProps {
    existingTask?: Task; // Optional prop if you're editing a task
}

interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'in-progress' | 'completed';
}

const TaskForm: React.FC<TaskFormProps> = ({ existingTask }) => {
    const dispatch = useDispatch();

    // Initial state of the form
    const [task, setTask] = useState<Task>({
        id: existingTask ? existingTask.id : Date.now(),
        title: existingTask ? existingTask.title : '',
        description: existingTask ? existingTask.description : '',
        dueDate: existingTask ? existingTask.dueDate : '',
        priority: existingTask ? existingTask.priority : 'low',
        status: existingTask ? existingTask.status : 'in-progress',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: name === 'priority' ? value as 'low' | 'medium' | 'high' : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (existingTask) {
            dispatch(editTask(task)); // Edit task if it's an existing task
        } else {
            dispatch(addTask(task)); // Add new task
        }
        // Optionally, clear the form or close a modal here
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />
            <input
                type="text"
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
                required
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                required
            />
            <select name="priority" value={task.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <select name="status" value={task.status} onChange={handleChange}>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="submit">{existingTask ? 'Edit Task' : 'Add Task'}</button>
        </form>
    );
};

export default TaskForm;
