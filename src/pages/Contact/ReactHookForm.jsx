import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod/v4-mini'

const ReactHookForm = () => {

  const { register, handleSubmit } = useForm({})

  const HandleSubmitData = (data) => {
    console.log("data : ", data);

  }

  const schema = z.object({
    name: z.string().min(2, { message: 'Required' }),
    email: z.email(),
  });

  return (
    <form onSubmit={handleSubmit(HandleSubmitData)} className='flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-4 py-7 px-6'>
        <h1 className='font-bold text-3xl mb-3'>
          React Hook Login Form
        </h1>

        <div className='flex flex-col gap-3'>
          <label className='font-semibold' htmlFor="name">Name:</label>
          <input className='border py-2 px-1 focus:ring-2 ring-blue-500 outline-none rounded-lg' type="text" name="name" id="name"
            onChange={(e) => {
              setName(e.target.value)
            }}
            {...register("name")} />
        </div>

        <div className='flex flex-col gap-3'>
          <label className='font-semibold' htmlFor="email">Email:</label>
          <input className='border py-2 px-1 focus:ring-2 ring-blue-500 outline-none rounded-lg' type="email" name='email' id='email'
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            {...register("email")} />
        </div>
        <div className='flex items-center justify-center'>
          <button className='px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg'>
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default ReactHookForm