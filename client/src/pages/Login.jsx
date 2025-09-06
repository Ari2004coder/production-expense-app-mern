import React from 'react'

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useForm } from "react-hook-form"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

const Login = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const navigate = useNavigate()

  const onFinish = async (value) => {
    console.log(value);
    const { name, email, password } = value
    console.log(name + email + password);

    try {

      const { data } = await axios.post('/api/v1/user/login', { email, password })


      toast.success("Loged in Sucessfuly done! please wait");
      localStorage.setItem('user', JSON.stringify({ ...data, password: "" }))
      setTimeout(() => {
        navigate('/');
      }, 2000)
      //navigate('/login')

    }
    catch (errors) {

      toast.error('An error occurred. Please try again.');
      console.log(errors)
    }



  }
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className='h-screen w-screen flex justify-center items-center top-1/2 left-1/2  bg-gray-900'>
      <div className='bg-white/10 backdrop-blur-sm py-10 px-9 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 rounded-2xl items-baseline'>
        <h1 className='text-white font-bold mb-10 text-3xl text-center'>LogIn</h1>
        <form action="" onSubmit={handleSubmit(onFinish)} className='text-white flex flex-col gap-3 items-baseline '>

          <div className='flex flex-col space-y-2 w-full'>
            <label htmlFor="username">Email:</label>
            <input placeholder='email@gmail.com' type="email" className='border-2 w-full border-amber-50 bg-white text-black rounded-sm focus:border-tranparent px-4 py-3' {...register("email", {
              required: { value: true, message: "Email is required" }, pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email',
              }
            })} />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='flex flex-col space-y-2 w-full'>
            <label htmlFor="username">Password:</label>
            <input placeholder='pasword' type="pasword" className='border-2 w-full border-amber-50 bg-white text-black rounded-sm focus:border-tranparent px-4 py-3' {...register("password", { required: { value: true, message: "Password is required" }, minLength: { value: 6, message: "minimum 6 character required" } })} />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          </div>
          <button disabled={isSubmitting} type='submit' className='bg-blue-600 p-2 rounded-lg mt-2 hover:bg-blue-800'>{isSubmitting ? "Submiting.." : "LogIn"}</button>
          <p>don't have an account?<Link to="/register" className='text-indigo-300 cursor-pointer font-bold'>Register</Link></p>
        </form>
      </div>
      <ToastContainer />
    </div>

  )
}

export default Login
