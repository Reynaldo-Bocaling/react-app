import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login'
function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        fetchData();
    }, []);
    const navigate = useNavigate();
    const fetchData = async () =>{
        try {
            const response = await axios.get('http://localhost:800/')
            if(response.data.Status == "Success"){
                setAuth(true);
                setName(response.data.name)
                navigate('/')
            }else{
                setAuth(false);
                setMessage(response.data.Error)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // delte/logout
    const handleLogout = async () =>{
        try {
            const response = await axios.get('http://localhost:3001/logout');
            if(response.data ==="Success"){
                navigate('/login')
            }else{
                alert(response.data.Error)
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(auth)
  return (
    <div className='container vh-100'>
      {
        auth ?
        <div className=''>
            <h3 >Your autorized {name}</h3>
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
        </div>
        :

       <Login></Login>
      }
    </div>
  )
}

export default Home
