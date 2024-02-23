// // Importing libraries
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { yupResolver } from "@hookform/resolvers/yup";


// // Importing components
// import Input from '../../components/Input/Input';

// // Importing utils
// import { registrationSchema } from '../../utils/validation';

// function RegistrationPage() {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registrationSchema)
//   });

//   const onSubmit = async (data) => {
//     console.log("RESPONSE !!!!!!!!!!!!!!!!!!!!> ", data);
//   }


//   return (
//     <div className="flex bg-gray-900">
//       <div className="w-2/3 min-h-screen">Second div</div>

//       <div className="w-1/3 min-h-screen flex justify-end items-center p-5">

//         <div className="bg-white w-full h-full flex flex-col items-center rounded-md py-5 px-8">
//           <h1 className=''>Register Here</h1>

//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="bg-white w-full flex flex-col items-center"
//           >

//             <Input
//               name="name"
//               type="text"
//               placeholder="Please enter your name"
//               InputHandler={register("name")}
//             />

//             <Input
//               name="email"
//               type="text"
//               placeholder="Please enter your email"
//               InputHandler={register("email")}
//             />

//             <Input
//               name="phone"
//               type="phone"
//               placeholder="Please enter your phone number"
//               InputHandler={register("phone")}
//             />

//             <Input
//               name="password"
//               type="password"
//               placeholder="Please enter your password"
//               InputHandler={register("password")}
//             />

//             <button
//               type="submit"
//               className="border-none bg-gray-800 font-inherit text-inherit cursor-pointer mt-8 w-full h-10 rounded-sm text-white">Register</button>
//           </form>
//         </div>

//       </div>
//     </div>)
// }

// export default RegistrationPage;

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../components/Input/Input';
import { registrationSchema } from '../../utils/validation';

function RegistrationPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registrationSchema)
  });

  const onSubmit = async (data) => {
    console.log("RESPONSE: ", data);
  };

  return (
    <div className="flex bg-gray-900">
      <div className="w-2/3 min-h-screen">Second div</div>

      <div className="w-1/3 min-h-screen flex justify-center items-center p-5">
        <div className="bg-white w-full h-full flex flex-col items-center rounded-md py-5 px-8">
          <h1>Register Here</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              name="name"
              type="text"
              placeholder="Please enter your name"
              InputHandler={register('name')}
            />
            <Input
              name="email"
              type="text"
              placeholder="Please enter your email"
              InputHandler={register('email')}
            />
            <Input
              name="phone"
              type="phone"
              placeholder="Please enter your phone number"
              InputHandler={register('phone')}
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
