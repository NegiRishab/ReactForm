import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { handleFormdata, handleformclose } from './MyreduxToolkit';
import Input from '../utills/Input';
import Selectinput from '../utills/Selectinput';
import RadioInput from '../utills/RadioInput';
import Button from '../utills/Button';
import { useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools'

export default function RegistrationUseFomhook() {
    const formdata = useSelector(state => state.formsubmit.formdata);
    const userid = localStorage.getItem('id');
    const { register, handleSubmit, formState, control } = useForm({
        defaultValues: async () => {
            try {
                if (userid) {
                    const options = {
                        method: "GET",
                        url: `http://localhost:3001/form/getformdata/${userid}`
                    };
                    const res = axios(options);
                    const response = await res;
                    const data = response.data;
                    return {
                        name: data?.name,
                        email: data?.email,
                        number: data?.number,
                        country: data?.country,
                        daily: data?.daily,
                        monthly: data?.monthly,
                        yearly: data?.yearly,
                        gender: data?.gender
                    }
                } else {
                    return {
                        name: "",
                        email: "",
                        number: 0,
                        country: "India",
                        daily: false,
                        monthly: false,
                        yearly: false,
                        gender: ""
                    }
                }



            } catch (error) {
                console.log(error)
            }
        }
    });
    const { errors } = formState;
    const countryName = ['India', 'China', 'Russia', 'America', 'Iran', 'Afganistan'];
    const isEditopen = useSelector(state => state.formsubmit.isEditopen);

    const dispatch = useDispatch();

    const handleSubmitForm = (data1) => {
        console.log(data1)
        if (!data1) return;
        let Url;
        let Data;
        if (isEditopen) {
            Url = "http://localhost:3001/form/editformdata"
            Data = { id: formdata._id, ...data1 }
        } else {
            Url = "http://localhost:3001/form/saveformdata"
            Data = { ...data1 }

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

    return (
        <>
            <form className='flex flex-col  h-screen pt-14 w-screen pl-10 space-y-2' style={{ backgroundColor: '#d38f85' }} onSubmit={handleSubmit(handleSubmitForm)} noValidate >

                <Input
                    type='text'
                    placeholder='name'
                    width={60}
                    register={register}
                    required={true}
                    error={errors}
                    require={true}
                />

                <Input
                    type='email'
                    placeholder='email'
                    width={60}
                    register={register}
                    error={errors}
                    require={true}
                />

                <Input
                    type='number'
                    placeholder='number'
                    register={register}
                    width={60}
                    error={errors}
                    require={true}
                />


                <Selectinput
                    placeholder='country'
                    placeholderArray={countryName}
                    register={register}


                />



                <div className='flex justify-between items-center w-2/5'>
                    <Input
                        type='checkbox'
                        placeholder='daily'
                        register={register}
                        width={16}
                        error={errors}
                    />
                    <Input
                        type='checkbox'
                        register={register}
                        placeholder='monthly'
                        width={16}
                        error={errors}
                    />
                    <Input
                        type='checkbox'
                        register={register}
                        placeholder='yearly'
                        width={16}
                        error={errors}
                    />

                </div>






                <div>
                    <label>Gender</label>

                    <RadioInput
                        type='radio'
                        value='Male'
                        gropuvalue="gender"
                        register={register}
                        error={errors}
                    />
                    <RadioInput
                        type='radio'
                        value='Female'
                        gropuvalue="gender"
                        register={register}
                        error={errors}
                    />
                    {errors.Gender && <p>{errors.Gender?.message} </p>}
                </div>
                <div className='w-60 bg-blue-600 rounded-lg'>

                    <Button
                        data="Submit Form"
                        width={60}
                    />
                </div>
            </form>
            {/* <DevTool control={control} /> */}

        </>

    )
}

