// import React from 'react'
// import {createStore} from 'redux'
// const MyReducer = ( state = { value: '' }, action ) => {
//     switch (action.type) {
//         case 'UPDATEVALUE':
//             return { ...state, value:action.payload }
//         default:
//             return state;
//     }
// }

import { useState } from "react";
import { createStore } from "redux";

//     const store = createStore(MyReducer);
//     export default store;

const initialvalue = {
    formdata: {},
    isFormnotset: false
}
export function MyReducer( state = initialvalue, action ) {

    switch (action.type) {
        case 'HANDLEFORM':
            return { ...state, formdata: {...action.payload} }
        case 'HANDLEISFROMOPEN':
            return { ...state, isFormnotset: action.payload }
        case 'HANDLEISFORMCLOSE':
            return { ...state, isFormnotset: action.payload }
        default:
            return state
    }

}
const store = createStore(MyReducer);
export default store;


