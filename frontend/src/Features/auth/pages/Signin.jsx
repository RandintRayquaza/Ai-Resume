import { useState } from 'react'
import Button from '../components/Button'
import '../style/style.scss'
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Signin = () => {
    const navigate = useNavigate();
    const { signin } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const {handleRegister} = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password })
        setLoading(true);
        setError('');
        navigate('/')

        }
        
        

    return (
        <main className="form-grp">
            <form onSubmit={handleSubmit} className='form'>
                <h1>Signin</h1>
                {error && <p className="error">{error}</p>}
                <div className='input-grp'>
                    <label htmlFor="userName">Username</label>
                    <input 
                        type="text" 
                        id="userName"
                        name="userName"
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                </div>
                <div className='input-grp'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-grp'>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button disabled={loading}>{loading ? 'Signing in...' : 'Signin'}</Button>  
                <Link to="/login"><p>Already have an account?<span>Login</span></p></Link>
            </form>
        </main>
    );
};

export default Signin
