import React, { useState } from 'react'
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {toast} from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [loading,setLoading] = useState(false);
    const [form,setForm]=useState<{
        username:string;
        email:string;
        password:string;
        phone:string;
        address:string;
        role:string;
        secretKey?:string;
    }>({
        username:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        role:"user"
    });
    const navigate = useNavigate();

    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setForm({...form,[e.target.name]:e.target.value});
    }

    const handleRegister =async(e:React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        const payload = { ...form };
        if(form.role == "user")
        {
            delete payload.secretKey;
        }
        console.log(payload);
    
        try{
            const res= await fetch("https://localhost:7102/api/userauth/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(payload),
            });
            const data = await res.json();
            console.log(data);
            if(!res.ok){
                toast.error(data.message || "Register Failed");
                return;
            }
       
            toast.success(`Hurray! Registered Successfully, now Please Login`)

            navigate("/login");
        }
        catch(err)
        {
            toast.error("Login error.Please try again later")
        }
        setLoading(false);
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
        <form onSubmit={handleRegister} className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4'>
            <h2 className='text-2xl font-bold text-center mb-4'>Register</h2>
             <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Username</label>
            <Input name="username" placeholder='Username' value={form.username} onChange={handleChange} required></Input>
             <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Email</label>
            <Input name="email" placeholder='Email'type='email' value={form.email} onChange={handleChange} required></Input>
             <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Password</label>
            <Input name="password" placeholder='Password' value={form.password} onChange={handleChange} required></Input>
             <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Phone Number</label>
            <Input name="phone" placeholder='Phone Number' value={form.phone} onChange={handleChange} required></Input>
             <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Address</label>
            <Input name="address" placeholder='Address' value={form.address} onChange={handleChange} required></Input>
            <label className='block mb-1 text-sm font-medium text-gray-700 text-left'>Role</label>
            <select name="role" value={form.role} onChange={handleChange} className='w-full border p-2 rounded focus:outline-none'>
                <option value="">Select Role</option>
                <option value="librarian">Librarian</option>
                <option value="user">User</option>
            </select>
            {
                form.role == "librarian" && (
                    <Input name="secretkey" placeholder='Admin Key' value={form.secretKey} onChange={handleChange} required></Input>
                )
            }
            
            <Button type='submit' className='w-full'>{loading ? 'Registering...' : 'Register'}</Button>
            <div>
                <p>Already have an account? then <Link to='/login' className='text-blue-500'>Login here</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Register