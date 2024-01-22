import React, { useEffect } from 'react'

export default function CheckboxInput({ type, data, register }) {



    return (
        <div>
            <label className='flex items-center text-sm text-center lowercase'>

                <input type={type}
                    // value={data}
                    // checked={isChecked ? true : false}
                    {...register(data)}
                    //   onClick={()=>setcheckbox(data)}
                    className='mr-1' />
                {data}
            </label>
        </div>
    )
}
