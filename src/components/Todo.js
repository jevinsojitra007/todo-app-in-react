import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'

const Todo = () => {
    const [todoData, setTodoData] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [userData, setUserData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTodoData({ ...todoData, [name]: value })
    }

    useEffect(() => {
        const storedData = localStorage.getItem('todoData')
        if (storedData) {
            setUserData(JSON.parse(storedData))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todoData', JSON.stringify(userData))
    }, [userData]);

    const handleSubmit = () => {
        if (todoData.title && todoData.description && todoData.date) {
            if (isEditing) {
                const updatedData = userData.map((data, index) => (
                    index === editIndex ? todoData : data
                ));
                setUserData(updatedData);
                setEditIndex(null);
                setIsEditing(false);
            } else {
                setUserData([...userData, todoData]);
            }
        }

        setTodoData({
            title: '',
            description: '',
            date: ''
        })
    };

    const handleEdit = (index) => {
        setTodoData(userData[index]);
        setIsEditing(true);
        setEditIndex(index);
    }

    const handleDelete = (index) => {
        const updatedData = userData.filter((_, i) => i !== index);
        setUserData(updatedData);
    }

    return (
        <div className='todo_main'>
            <div className='todo_container'>
                <input className='form-control'
                    type="text"
                    name='title'
                    value={todoData.title}
                    placeholder='title'
                    onChange={handleInputChange}
                />
                <input className='form-control'
                    type="text"
                    name='description'
                    value={todoData.description}
                    placeholder='add description'
                    onChange={handleInputChange}
                />
                <input className='form-control'
                    type="date"
                    value={todoData.date}
                    name='date'
                    onChange={handleInputChange}
                />
                <Button onClick={handleSubmit} variant={isEditing ? 'warning' : 'success'}>{isEditing ? 'Update' : 'Add Todo'}</Button>
            </div>

            <div className='table_container'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>To Do</th>
                            <th>In Progress</th>
                            <th>Done</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <p className='mb-0'>Title:- {data.title}</p>
                                        <p className='mb-0'>Desc:- {data.description}</p>
                                        <p className='mb-0'>Date:- {data.date}</p>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td className='actionbtn'>
                                        {/* To Edit Todo */}
                                        <Button onClick={() => handleEdit(index)} variant="warning">Edit</Button>
                                        {/* To Delete Todo */}
                                        <Button onClick={() => handleDelete(index)} variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default Todo