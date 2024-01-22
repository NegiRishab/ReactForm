import React from 'react'

export default function Selectinput({ placeholder, placeholderArray, register }) {

    return (
        <div>
            <label htmlFor={placeholder} className=''>{placeholder} </label>
            <select name={placeholder}
                id={placeholder}
                {...register(placeholder)}

                className='border border-solid border-black ml-3 rounded-lg pl-1 uppercase h-7 text-sm cursor-pointer'>
                {
                    placeholderArray.map((i) => (
                        <option value={i}>{i}</option>
                    ))
                }
            </select>
        </div>
    )
}
