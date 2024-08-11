import React,{useState} from 'react'
import './styles/Signin.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link,useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/api';
import axios from 'axios';
const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate=useNavigate();
    const [istermsAccepted, setIstermsAccepted] = useState(false);
    const handleAccept = (e) => {
        setIstermsAccepted(e.target.checked);
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const checkPassword = () => {
        if (user.password === user.confirmPassword) return true;
        else return false;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.password.length<6) return toast.error('Password must be atleast 6 characters long');
        if (checkPassword()) {
            try {
                axios.post(`${API_URL}/user/register`, user)
                    .then((res) => {
                        toast.success(res.data.message);
                        setTimeout(() => {
                            navigate('/signin');
                        }, 1200);
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message);
                    })
            }
            catch (err) {
                toast.error(err.response.data.message);
            }
        }
        else{
          toast.error('Password and Confirm Password must be Same');
        }
    }
    return (
        <>
            <div className='signin'>
                <div className='signin-left'>
                    <div className='signin-left-container'>
                        <div className='signin-left-container-top'>
                            <h1>Register</h1>
                            <p>Don't have an account? <Link to='/signin'><span> Login</span></Link></p>
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Name</label>
                                    <input type='text' name='name' id='name' placeholder='Enter Your Name' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' name='email' id='email' placeholder='Enter your email' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' name='password' id='password' placeholder='Enter your password' onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Confirm Password</label>
                                    <input type='password' name='confirmPassword' id='confirmPassword' placeholder='Confirm your password' onChange={handleChange} />
                                </div>
                                <div>
                                    <input type='checkbox' name='remember' id='remember' onChange={handleAccept} />
                                    <label className='remember' htmlFor='remember'>Accept the <span>Terms</span> and <span>Privacy Policy</span></label>
                                </div>
                                <div className='form-group'>
                                    <button type='submit' disabled={!istermsAccepted}   >SIGN UP</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
