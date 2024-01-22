import React from 'react'

export default function RadioInput({type,value,gropuvalue,register}) {
  return (
    <div>
       <label htmlFor={gropuvalue}>
            <input type={type}
             value={value}
             id={gropuvalue}
              {...register(gropuvalue,{
                required:{
                  value:true,
                  message:`${gropuvalue} is required`
                }
              })}
               /> {value}
        </label>
    </div>
  )
}
