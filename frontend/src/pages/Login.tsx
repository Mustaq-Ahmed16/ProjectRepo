import React, { useState } from 'react'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {toast} from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {login}=useAuth();
    const handleLogin =async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true)
        
        try{
            const res= await fetch("https://localhost:7102/api/userauth/login",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email,password}),
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                toast.error(data.message || "Login Failed");
                return;
            }
          
            const {token,user}=data;

            login(token,user);
       
            toast.success(`Welcome back User ${user.username}`)

            navigate(user.role == "librarian" ? "/librarian" : "/user");
            
        }
        catch(err)
        {
            toast.error("Login error.Please try again later")
        }
        setLoading(false);
        
        
    }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
        <form onSubmit={handleLogin} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4'>
            <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
            <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Email</label>
            <Input type='email' placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} required></Input>
            <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Password</label>
            <Input type='password' placeholder='Password' value={password} onChange={e=>setPassword(e.target.value)} required></Input>
            <p className='text-sm text-right'>Forgot Password?</p>
            <Button type='submit' className='w-full'>{loading ? 'Loading...' : 'Login'}</Button>
            <div>
                <p>New User? then <Link to='/register' className='text-blue-500'>Register here</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login