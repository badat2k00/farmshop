import SummaryApi from "../common"
import { toast } from 'react-toastify'
const addToItemsOrder= async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()
    
    const response = await fetch(SummaryApi.addToItemsOrder.url,{
        method : SummaryApi.addToItemsOrder.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json'
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()


    if(responseData.success){
        toast.success(responseData.message);
        console.log(responseData.message)
    }

    if(responseData.error){
        toast.error((responseData.message))
    }


    return responseData

}

export default addToItemsOrder