'use client';
import React, { useEffect, useState } from 'react';
import { FcExpired } from 'react-icons/fc';
import { GoClock, GoPlus } from 'react-icons/go';
import { TiShoppingBag } from 'react-icons/ti';
import { useRouter } from 'next/navigation';
import { api } from '@/api/api';

type Task = {
    id: string;
    title: string;
    status: 'To Do' | 'In Progress' | 'Done' | 'Timeout';
};

const TaskCard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get<Task[]>('/tasks'); // Fetch all tasks
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [tasks]);

    // Count tasks based on their status
    const expiredCount = tasks.filter(task => task.status === 'Timeout').length;
    const completedCount = tasks.filter(task => task.status === 'Done').length;

    const taskMap = [
        {
            icon: <FcExpired />,
            title: 'Expired Tasks',
            bgColor: 'bg-red-600',
            count: loading ? '...' : expiredCount
        },
        {
            icon: <TiShoppingBag />,
            title: 'All Active Tasks',
            bgColor: 'bg-orange-400/80',
            count: loading ? '...' : tasks.length
        },
        {
            icon: <GoClock />,
            title: 'Completed Tasks',
            bgColor: 'bg-blue-400/60',
            count: loading ? '...' : `${completedCount}/${tasks.length}`
        },
    ];

    return (
        <div className='flex flex-col gap-4'>
            {taskMap.map((card, index) => (
                <div key={index} className='bg-gray-300 w-60 h-40 p-4 flex flex-col gap-4 rounded-2xl'>
                    <div className={`p-2 rounded-full ${card.bgColor} w-fit`}>{card.icon}</div>
                    <h2 className='text-sm text-gray-500 font-semibold'>{card.title}</h2>
                    <p className='text-2xl'>{card.count}</p>
                </div>
            ))}
            <button
                className='flex justify-center gap-1 items-center bg-[#0D062D] text-white p-2 rounded-full text-sm'
                onClick={() => router.push('/createTask')}
            >
                <GoPlus />
                Add Task
            </button>
        </div>
    );
};

export default TaskCard;
