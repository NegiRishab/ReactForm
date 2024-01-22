import React from 'react'

export default function Input({ type, placeholder, register,width,error,require }) {

  return (
    <div className=''>
      <label htmlFor={placeholder} className='block'>{placeholder}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={placeholder}
        {...register(placeholder, {
          required: {
            value: require,
            message: `${placeholder} is Required`
          }
        })}
     
        className={`pl-2 w-${width} border border-solid border-black  rounded-lg text-sm h-8 lowercase`}
      />
     {error[placeholder] && <p className='sky'>{error[placeholder]?.message} </p>}
    </div>
  )
}
