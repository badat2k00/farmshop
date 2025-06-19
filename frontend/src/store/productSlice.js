import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    products : []
}
  
  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {                       
      getAllProducts : (state,action)=>{
        state.products = action.payload
      },
      addNewProduct: (state,action)=>{
        state.products=[...state.products,action.payload]
      },
      deleteProduct:(state,action)=>{
        const productId=action.payload
        state.products=state.products.filter(product=>product._id!==productId)
      },  
      editProduct:(state,action)=>{
        const {_id,productData}=action.payload
        state.products=state.products.filter(product=>product._id===_id?product.productData=productData:product);
      },
      updateQuantityProduct:(state,action)=>{
        const {_id,quantity}=action.payload
        state.products=state.products.map(product =>
          product._id === _id
              ? { ...product, quantity: quantity }
              : product
      );
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { getAllProducts,addNewProduct,deleteProduct,editProduct } = productSlice.actions
  
  export default productSlice.reducer


//   const products=[{id:1,a:2},{id:2,a:3}]
// function changeProduct(id,a){
//  let l= products.findIndex(p=>p.id==id?p.a=a:p)
 
//  return products.filter(p=>p.id!==id)
// }
// console.log(changeProduct(1,5))
