// const  updateValue=(data)=>{
//   return {
//     type:'UPDATEVALUE',
//     payload:data
//   }
// }

// export default updateValue


export const handleFormdata=(data)=>{
    console.log(data)
  return {
    type:'HANDLEFORM',
    payload:data
  }
}
export const handleformclose=(data)=>{
    console.log('ia mtrigger',data)
  return {
    type:'HANDLEISFORMCLOSE',
    payload:data
  }
}
export const handleformOpen =()=>{
  return {
    type:'HANDLEISFROMOPEN',
    payload:false
  }
}





