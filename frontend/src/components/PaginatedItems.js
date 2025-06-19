import React, { useEffect, useState } from 'react';

// import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';


// Example items, to simulate fetching from another resources.

// function Items({ currentItems }) {
//     return (
//       <>
//         {currentItems &&
//           currentItems.map((item) => (
//             <div>
//               <h3>Item #{item}</h3>
//             </div>
//           ))}
//       </>
//     );
//   }
  
  function PaginatedItems({ itemsPerPage,setCurrentItems,items }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    // const [allUser,setAllUsers] = useState([])

    // const fetchAllUsers = async() =>{
    //     const fetchData = await fetch(SummaryApi.allUser.url,{
    //         method : SummaryApi.allUser.method,
    //         credentials : 'include'
    //     })
    
    //     const dataResponse = await fetchData.json()
    
    //     if(dataResponse.success){
    //         setAllUsers(dataResponse.data)
    //     }
    // }
    //     useEffect(()=>{
    //         fetchAllUsers()
    //     },[])
    const [itemOffset, setItemOffset] = useState(0);
   
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    useEffect(()=>{
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    },[itemOffset,itemsPerPage,setCurrentItems,items])
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (e) => {
      const newOffset = (e.selected * itemsPerPage) % items.length;
      // console.log(
      //   `User requested page number ${e.selected}, which is offset ${newOffset}`
      // );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate className='flex justify-center gap-1  '
          breakLabel="..."
          nextLabel="sau >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< trước"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }
  
export default PaginatedItems;