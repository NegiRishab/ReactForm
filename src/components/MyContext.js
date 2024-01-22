// import React, {createContext, useContext, useState } from 'react'

import { createContext, useContext, useState } from "react";

// const Mycontext=createContext();
// export function MyProvider({children}) {
//     const [value,setvalue]=useState('')
//     const updateVAlue=(data)=>{
//         setvalue(data);
//     }
//   return (
//     <Mycontext.Provider value={{value,updateVAlue}}>
//         {children}
//     </Mycontext.Provider>
//   )
// }

//  export const useMyContext=()=>{
//   return useContext(Mycontext);
//  }


// useContext  



const MyContext = createContext();

export function MyProvider({ children }) {
    const [formdata, setformdata] = useState({});
    const [isFormnotset, setisFormdata] = useState(false);
    const handleformOpen = () => {
        setisFormdata(false);
    }
    const handleformclose = () => {
        setisFormdata(true);
    }


    const handleFormdata = (data) => {
        setformdata(data);
    }
    return (

        < MyContext.Provider value={{ formdata, handleFormdata, handleformOpen, handleformclose,isFormnotset }} >
            {children}
        </MyContext.Provider >
    )


}
export const useMyContext = () => {
    return useContext(MyContext)
}




