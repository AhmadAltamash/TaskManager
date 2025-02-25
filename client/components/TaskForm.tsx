'use client';

import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useRouter } from 'next/navigation'; // Import Next.js router
import toast, { Toaster } from 'react-hot-toast'; // Import toast notifications

export default function TaskForm() {
    const { addTask } = useTaskContext();
    const router = useRouter(); // Initialize router for redirection
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title) return toast.error('Title is required');
        if (!assignedTo) return toast.error('Assigned To is required');
        if (!deadline) return toast.error('Deadline is required');

        try {
          addTask({
            _id: crypto.randomUUID(), // ✅ Generate a unique ID
            title,
            description,
            assignedTo,
            deadline,
            status: "To Do",
            createdAt: new Date().toISOString(),
          });
        

            toast.success('Task added successfully! Redirecting You...', {
              duration: 3000, // Visible for 3 seconds
              style: {
                  background: '#4CAF50',
                  color: '#fff',
                  fontWeight: 'bold',
                  padding: '10px',
                  borderRadius: '8px',
              },
            });
          

            setTitle('');
            setDescription('');
            setAssignedTo('');
            setDeadline('');

            // Redirect to home page after a short delay
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error) {
            toast.error('Failed to add task');
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} /> {/* Toast container */}
            <form onSubmit={handleSubmit} className='p-4 flex flex-col justify-center items-center'>
                <input
                    type='text'
                    placeholder='Task Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border p-2 w-full rounded-lg outline-none focus:outline-blue-400'
                />
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='border p-2 w-full mt-2 rounded-lg outline-none focus:outline-blue-400'
                />
                <input
                    type='text'
                    placeholder='Assigned To'
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className='border p-2 w-full mt-2 rounded-lg outline-none focus:outline-blue-400'
                />
                <input
                    type='datetime-local'
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className='border p-2 w-full mt-2 rounded-lg outline-none focus:outline-blue-400'
                />
                <button type='submit' className='bg-[#0D062D] text-white px-4 py-2 mt-2 rounded'>
                    Add Task
                </button>
            </form>
        </>
    );
}
