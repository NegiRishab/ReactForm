import { lazy, useEffect, useState } from "react";
import RegistrationForm from "./components/RegistrationForm";
import SaveData from "./components/SaveData";
import { MyProvider, useMyContext } from "./components/MyContext";
import { useDispatch, useSelector } from "react-redux";
import Input from "./utills/Input";
import Button from "./utills/Button";
import axios from "axios";
import { handleformOpen, handleformclose } from "./components/MyreduxToolkit";
import RegistrationUseFomhook from "./components/RegistrationUseFomhook";
import { useForm } from "react-hook-form";
import UseMemoComponent from "./components/UseMemoComponent";
import { Suspense } from "react";
import config from "./config";

function App() {
  console.log(global)
  //  const {isFormnotset}=useMyContext();
  const isFormnotset = useSelector(state => state.formsubmit.isFormnotset);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const [isuserLOgin, setUserLogin] = useState(false)


const UseMemoComponent=lazy(()=>import ('./components/UseMemoComponent'))
  const handleuserinfo = (data1) => {
    if (!data1) return;
    const getuserinfo = {
      method: 'Post',
      url: config.ROOTURL.prod+ '/form/isUserExist',
      data: { ...data1 }
    }
    axios(getuserinfo).
      then((data) => {

        if (data.data === false) {
          console.log('hello')
          dispatch(handleformOpen(false))
          setUserLogin(true);
        } else {
          dispatch(handleformclose(true))
          localStorage.setItem('id', data.data._id)
          setUserLogin(true);

        }
      }).catch((err) => {
        console.log(err)
      })
  }
  return (

    // context 
    //  <MyProvider>
    //     <div className="App">
    //         <RegistrationForm />
    //         {isformDone && <SaveData />}

    //       </div>
    //  </MyProvider>

    // redux 
    // <Provider store={store}>

    // </Provider>


    <div className="App">

      {!isuserLOgin ?
        <>
          <form onSubmit={handleSubmit(handleuserinfo)} className="flex justify-center items-center flex-col mt-6">
            <Input
              type='email'
              placeholder='email'
              width={60}
              register={register}
              error={errors}
              require={true}
            />

            <div className='w-60 bg-blue-600 rounded-lg'>

              <Button
                data="Get Your Information"
                width={60}
              />
            </div>
          </form>
          <Suspense fallback={<div>Loading....</div>}>
          <UseMemoComponent />
          </Suspense>
        </>
        :
        <>
          {/* {isFormnotset ? <SaveData /> : <RegistrationForm />} */}
          {isFormnotset ? <SaveData /> : <RegistrationUseFomhook />}
        </>
      }

    </div>

  );
}

export default App;
