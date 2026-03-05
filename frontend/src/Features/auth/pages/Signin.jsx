import React, { useState } from 'react'
import Button from '../components/Button'
import '../style/style.scss'
import { Link } from 'react-router-dom';



const Signin = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(userName, email, password)
    };



  return (
    <main className="form-grp">
       
        <form onSubmit={handleSubmit} className='form'>
             <h1>Signin</h1>
              <div className='input-grp'>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className='input-grp'>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='input-grp'>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
              <Button>Signin</Button>  
               <Link to="/login"><p>Already have an account?<span>Login</span> </p></Link>
        </form>
       
       
    </main>
  )
}

export default Signin