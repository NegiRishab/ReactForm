
// import { configureStore, createSlice } from '@reduxjs/toolkit';
// const dataSlice = createSlice({
//     name: 'data',
//     initialState: { value: '' },
//     reducers: {
//         updateValue:(state, action) => {
//             state.value = action.payload
//         }
//     }
// })
// const chekslice=createSlice({
//     name:'check',
//     initialState:{hmm:''},
//     reducers:{
//         updatedata:(state,action)=>{
//             state.hmm=action.payload;
//         }
//     }
// })

import { configureStore, createReducer, createSlice } from "@reduxjs/toolkit";

// export const {updateValue}=dataSlice.actions;
// export const {updatedata}=chekslice.actions

// const store=configureStore({
//     reducer:{data: dataSlice.reducer,check:chekslice.reducer}
// })
// export default store;





const FormSlice = createSlice({
    name: 'formsubmit',
    initialState: {
        formdata: {},
        isFormnotset: false,
        isEditopen:false
    },
    reducers: {
        handleFormdata: (state, action) => {
            state.formdata = action.payload;
        },
        handleformclose: (state, action) => {
            state.isFormnotset = action.payload;
        },
        handleformOpen: (state, action) => {
            state.isFormnotset = action.payload;
        },
        handleEditformclose: (state, action) => {
            state.isEditopen = action.payload;
        },
        handleEditformOpen: (state, action) => {
            state.isEditopen = action.payload;
        },

    }

})

export const {handleFormdata,handleformOpen,handleformclose,handleEditformOpen,handleEditformclose}=FormSlice.actions;

const store=configureStore({
    reducer:{formsubmit:FormSlice.reducer}
})
export default store;
































