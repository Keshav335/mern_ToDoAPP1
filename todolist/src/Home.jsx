import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


function Home() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))

  }, [])

  // const handleEdit = () =>{
  //   axios.put('http://localhost:3001/update/'+id)
  //   .then(result => console.log(result))
  //   .catch(err => console.log(err))

  // }

  const handleEdit = (id) => { // Accept the 'id' parameter here
    axios.put(`http://localhost:3001/update/${id}`, { done: true }) // Pass 'done: true' in the request body
      .then(result => {
        console.log(result);
        // Update the 'todos' state to reflect the change in the frontend
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: true };
          }
          return todo;
        }));
      })
      .catch(err => console.log(err));
  };

  // const handleDelete = (id) => {
  //   axios.delete('http://localhost:3001/update/' + id)
  //     .then(result => {
  //       location.reload()
        
  //     })
  //     .catch(err => console.log(err))

  // }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        // Refresh the list of tasks after deletion
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />
      <br />
      {
        todos.length === 0
          ?
          <div><h2>No Record</h2></div>
          :
          todos.map(todo => (
            <div className='task'>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                {todo.done
                  ?
                  <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                  :
                  <BsCircleFill className='icon' />
                }

                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
              <div>
                <span><BsFillTrashFill className='icon'
                  onClick={() => handleDelete(todo._id)} /></span>
              </div>
            </div>
          ))
      }
    </div>
  )
}

export default Home
