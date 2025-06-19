import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    categories : []
}
  
  export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {                       
      setAllCategories : (state,action)=>{
        state.categories = action.payload
      },

      deleteCategory:(state,action)=>{
        const categoryId=action.payload
        state.categories=state.categories.filter(category=>category._id!==categoryId)
      },  
      updateCategory: (state,action)=>{
        const {_id,categoryName}=action.payload
        state.categories=state.categories.filter(category=>category._id===_id?category.categoryName=categoryName:category);
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setAllCategories,deleteCategory,updateCategory} = categorySlice.actions
  
  export default categorySlice.reducer


//   const products=[{id:1,a:2},{id:2,a:3}]
// function changeProduct(id,a){
//  let l= products.findIndex(p=>p.id==id?p.a=a:p)
 
//  return products.filter(p=>p.id!==id)
// }
// console.log(changeProduct(1,5))
