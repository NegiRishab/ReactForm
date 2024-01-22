import React from 'react'

export default function Button({data,setButtonwork,width}) {
  const handleButtonAction=()=>{
    if(setButtonwork){
      setButtonwork();
    }
  }
  return (
   
      <button onClick={handleButtonAction} className={`h-8 border border-solid border-black rounded-lg text-sm font-bold tracking-wider pl-2 pr-2 pt-1 pb-1 w-${width}`} > {data}</button>
   
  )
}

