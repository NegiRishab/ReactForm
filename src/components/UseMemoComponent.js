import React, { useEffect, useMemo, useState } from 'react'
import Button from '../utills/Button'

const array=new Array(10000000).fill(0).map((i,index)=>{
    return{
        id:index,
        isSelected:index===1000000
    }
})
export default function UseMemoComponent() {
    const [counter, setcounter] = useState(0);
    const [items]=useState(array);
    // console.log( 'items',items)
    const selecteditem=useMemo(()=>{
        // console.log('hello')
        return items.find((i)=>i.isSelected)
    },[items]);
    
useEffect(()=>{
console.log('i am mounting')
return ()=>{
    // cleanuup funcion before new effect run ( unmouning fuction or api calls)
    console.log('i ma unmounting ')
}
},[counter])
    return (
        <div className='flex justify-center flex-col items-center mt-5'>
            {/* {console.log('hello iam rerender')} */}

            <p className=' text-xl font-bold mb-5'>{counter}  curent Element {selecteditem.id}</p>
            <div className='flex justify-center'>
                <div style={{ backgroundColor: 'red' }} className='rounded-lg'>
                    <Button
                        data="Increment"
                        setButtonwork={() => setcounter(counter + 1)}
                        width={'auto'} />

                </div>
                <div style={{ backgroundColor: 'red' }} className='rounded-lg'>
                    <Button
                        data="Decrement"
                        setButtonwork={() => setcounter(counter - 1)}
                        width={'auto'} />

                </div>
            </div>

        </div>
    )
}
