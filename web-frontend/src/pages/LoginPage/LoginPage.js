// Importing libraries
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';

// Importing components
import Input from '../../components/Input/Input';

// Importing schema
import { loginSchema } from '../../utils/validation';

// Importing slice
import { loginUser } from '../../redux/slices/userSlice';

function LoginPage() {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    const response = await dispatch((loginUser({ ...data })));
    console.log("RESPONSE =====================> ", response);
  }

  return (
    <div className="flex bg-gray-900">
      <div className="w-2/3 min-h-screen">Second div</div>

      <div className="w-1/3 min-h-screen flex justify-center items-center p-5">
        <div className="bg-white w-full h-full flex flex-col items-center rounded-md py-5 px-8">
          <h1>Login Here</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              name="email"
              type="email"
              placeholder="Please enter your email"
              InputHandler={register('email')}
            />
            <Input
              name="password"
              type="password"
              placeholder="Please enter your password"
              InputHandler={register('password')}
            />
            <button
              type="submit"
              className="bg-gray-800 text-white mt-8 w-full h-10 rounded-sm cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
