import React, { useEffect, useState } from 'react'
import Button from '../utills/Button'
import { useContext, useMyContext } from './MyContext';
import { useDispatch, useSelector } from 'react-redux';
import { handleEditformOpen, handleEditformclose, handleFormdata, handleformOpen } from './MyreduxToolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
// import { handleFormdata, handleformOpen } from './ActionCreator';
import config from "../config";
export default function SaveData() {
  const userid = localStorage.getItem('id')
  const [userDAta, setUserDAta] = useState([]);
  const dispatch = useDispatch();
  // const {handleFormdata,formdata,handleformOpen}=useMyContext();

  const handleEditDetails = () => {
    // console.log('userDAta', userDAta)
    dispatch(handleFormdata(userDAta))
    // handleFormdata(userDAta)
    dispatch(handleformOpen(false));
    dispatch(handleEditformOpen(true))
    // handleformOpen();

  }

  const handleDelete = () => {
    const requestdata = {
      method: 'Post',
      url:config.ROOTURL.prod + "/form/delete",
      data: {
        id: userid
      }
    }
    axios(requestdata).then((data) => {
      toast.success("data deleted")
      dispatch(handleformOpen(false))
      dispatch(handleEditformclose(false))
    }).catch((err) => {
      console.log(err)
    })
  }
  const fetchuserinfo = () => {
    console.log(userid)

    const options = {
      method: "GET",
      url:config.ROOTURL.prod+ `/form/getformdata/${userid}`
    };
    axios(options).then((data) => {
      console.log(data)
      setUserDAta({ ...data.data });
    }).catch((error) => {
      console.log(error)
    })

  }

  useEffect(() => {
    fetchuserinfo();
  }, [])

  return (
    <div style={{ backgroundColor: '#d38f85' }} className='h-screen w-screen flex flex-col items-center justify-center'>
      <div style={{ backgroundColor: 'lightgreen' }} className='border border-solid border-black rounded-3xl p-5 h-2/5 w-3/5 space-y-2'>
        <div className='flex justify-between items-center'>
          <h1>Users Details</h1>
          <div style={{ backgroundColor: 'yellow' }} className='rounded-lg'>
            <Button
              data="Edit Details"
              setButtonwork={() => handleEditDetails()}
              width={'auto'}
            />
          </div>
          <div style={{ backgroundColor: 'red' }} className='rounded-lg'>
            <Button
              data="Delete Details"
              setButtonwork={() => handleDelete()}
              width={'auto'} />

          </div>

        </div>

        <div className='space-y-2'>
          <p>User Name : {userDAta.name}</p>
          <p>User Email  :  {userDAta.email}</p>
          <p>User Phone number : {userDAta.number}</p>
          <p>User Country : {userDAta.country}</p>
          <p>User Choice : {userDAta.daily && 'daily'}{userDAta.monthly && ',monthly'} {userDAta.yearly && ',yearly'}</p>
          <p>User Gender : {userDAta.gender}</p>
        </div>


      </div>
    </div>
  )
}
