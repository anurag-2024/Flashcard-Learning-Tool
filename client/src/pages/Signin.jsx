import React,{useState} from 'react'
import './styles/Signin.scss';
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/api';
import { jwtDecode } from 'jwt-decode';
const Signin = () => {
    const navigate=useNavigate();
    const [user, setUser] = useState({
        email: 'test@gmail.com',
        password: 'test123'
    }); 
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(`${API_URL}/user/login`, user)
                .then((res) => {
                    localStorage.setItem('token',res?.data?.token);
                    const user=jwtDecode(res?.data?.token);
                    toast.success(res?.data?.message);
                    if(user.role==='admin'){
                        navigate('/admin');
                    }
                    else{
                        navigate('/');
                    }
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                })
        }
        catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
    return (
        <>
            <div className='signin'>
                <div className='signin-left'>
                    <div className='signin-left-container'>
                        <div className='signin-left-container-top'>
                            <h1>Login</h1>
                            <p>Don't have an account? <Link to='/signup'><span>Register</span></Link></p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' name='email' id='email' value={user.email} placeholder='Enter your email' onChange={handleChange}/>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' name='password' id='password' value={user.password} placeholder='Enter your password' onChange={handleChange}/>
                                </div>
                                <div>
                                    <a href='#'>Forgot password?</a>
                                </div>
                                <div className='form-group'>
                                    <button type='submit'>SIGN IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin
