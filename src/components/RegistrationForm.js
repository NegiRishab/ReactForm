import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { useMyContext } from './MyContext';
import { useDispatch, useSelector } from 'react-redux';
// import updateVAlue from './ActionCreator'
import { handleFormdata, handleformclose, updateValue } from './MyreduxToolkit';
import Input from '../utills/Input';
import Selectinput from '../utills/Selectinput';
import CheckboxInput from '../utills/CheckboxInput';
import RadioInput from '../utills/RadioInput';
import Button from '../utills/Button';
import config from "../config";
// import { handleFormdata, handleformclose } from './ActionCreator';


export default function RegistrationForm() {
    const countryName = ['India', 'China', 'Russia', 'America', 'Iran', 'Afganistan'];

    // const {formdata,handleFormdata,handleformclose}=useMyContext();
    // const {value,updateVAlue}=useMyContext();
    // const value=useSelector((state)=>state.data.value);
    // console.log(value);
    // const dispatch=useDispatch()
    const isEditopen = useSelector(state => state.formsubmit.isEditopen);
    const formdata = useSelector(state => state.formsubmit.formdata);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [country, setCountry] = useState('India');
    const [choice, setChoice] = useState({});
    const [dailyvalueisChecked, setdailyvalue] = useState(false);
    const [monthlyvalueisChecked, setmonthvalue] = useState(false);
    const [yearlyvalueisChecked, setyearlyvalue] = useState(false);
    const handlechoice = (e) => {
        console.log('e',e)
        let tempobj={...choice}
        if (tempobj.hasOwnProperty(e)) {
            delete tempobj[e];
        } else {
            tempobj[e]=e;
        }
        setChoice({...tempobj})
    }

    const handleSubmitForm = () => {

       
        const data = {
            name,
            email,
            number,
            gender,
            country,
            choice
        }

        // handleFormdata({...data})
        // handleformclose();
        let Url;
        let Data;
        if (isEditopen) {
            Url = config.ROOTURL.prod+"/form/editformdata"
            Data = { id: formdata._id, ...data }
        } else {
            Url =config.ROOTURL.prod+ "/form/saveformdata"
            Data = { ...data }

        }
        const options = {
            method: "POST",
            url: Url,

            data: Data,
        };
        axios(options).then((data) => {
            dispatch(handleFormdata({ ...data.data }));
            localStorage.setItem('id', data.data._id)
            dispatch(handleformclose(true));
        }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        console.log(formdata, "formdata")
        if (formdata) {
            setName(formdata?.name);
            setCountry(formdata?.country);
            setEmail(formdata?.email);
            setGender(formdata?.gender);
            setNumber(formdata?.number);
            setChoice({ ...formdata.choice });
        }

    }, [formdata])

    return (
        <div className='flex flex-col  h-screen pt-14 w-screen pl-10 space-y-2' style={{ backgroundColor: '#d38f85' }} >

            <Input
                type='text'
                placeholder='Name'
                value={name}
                SetBoxValue={(e) => setName(e)}
            />
            <Input
                type='email'
                placeholder='Email'
                value={email}
                SetBoxValue={(e) => setEmail(e)}
            />
            <Input
                type='number'
                placeholder='Phone Number'
                value={number}
                SetBoxValue={(e) => setNumber(e)}
            />

            <Selectinput
                data='Country'
                dataArray={countryName}
                setSelectValue={(e) => setCountry(e)}
                checkedValue={country}

            />



            <div className='flex justify-between items-center w-2/5'>
                <label>Choice</label>
                {console.log('coice',choice)}
                <CheckboxInput
                    type='checkbox'
                    checkvalue={dailyvalueisChecked}
                    setcheckbox={handlechoice}
                    data='daily'
                    isChecked={choice?.daily}
                />
                <CheckboxInput
                    type='checkbox'
                    checkvalue={monthlyvalueisChecked}
                    setcheckbox={handlechoice}
                    data='monthly'
                    isChecked={choice?.monthly}
                />
                <CheckboxInput
                    type='checkbox'
                    checkvalue={yearlyvalueisChecked}
                    setcheckbox={handlechoice}
                    data='yearly'
                    isChecked={choice?.yearly}
                />

            </div>






            <div>
                <label>Gender</label>

                <RadioInput
                    type='radio'
                    value='Male'
                    SetRadiovalue={(e) => setGender(e)}
                    gropuvalue="Gender"
                    radioChecked={gender}
                />
                <RadioInput
                    type='radio'
                    value='Female'
                    SetRadiovalue={(e) => setGender(e)}
                    gropuvalue="Gender"
                    radioChecked={gender}
                />
            </div>
            <div className='w-60 bg-blue-600 rounded-lg'>

                <Button
                    data="Submit Form"
                    setButtonwork={() => handleSubmitForm()}
                    width={60}
                />
            </div>
        </div>
    )
}
