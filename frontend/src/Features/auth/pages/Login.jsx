import React, { useState } from 'react'
import Button from '../components/Button'
import '../style/style.scss'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const { handleLogin, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        setEmail('');
        setPassword('');
        navigate('/')
    };
    if (loading) {
        return <main className="form-grp">
            <h1>Loading...</h1>
        </main>;
    }


  return (
    <main className="form-grp">
       
        <form onSubmit={handleSubmit} className='form'>
             <h1>Login</h1>
            <div className='input-grp'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='input-grp'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
              <Button>Login</Button>  
               <Link to="/register"><p>Don't have an account?<span>Register</span> </p></Link>
        </form>
       
       
    </main>
  )
}

export default Login