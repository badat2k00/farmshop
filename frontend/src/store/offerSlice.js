import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    offersByUser : [],
    Alloffers:[]
}
  
  export const offerSlice = createSlice({
    name: 'offersByUser',
    initialState,
    reducers: {
      setoffers : (state,action)=>{
        state.offersByUser = action.payload
      },
      setAlloffers:(state,action)=>{
        state.Alloffers=action.payload
      },
      updateofferById:(state,action)=>{
        
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setoffers,setAlloffers } = offerSlice.actions
  
  export default offerSlice.reducer