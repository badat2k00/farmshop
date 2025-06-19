
const url = 'http://localhost:8080/api/districtbyprovince';
async function getDistrictByProvince(provinceid){
    let response=await fetch(`${url}/${provinceid}`)
    const text = await response.json();
    if (!text || !text.data) {
      console.error('Invalid response format:', text);
      return []; // Trả về mảng rỗng nếu phản hồi không hợp lệ
  }
    let districts = [];
    text.data.forEach((district) => {
      const { district_id, district_name } = district;
      let payload = { district_id, district_name };
      // console.log(payload);
      districts.push(payload);
    });
    return districts;
}
export default getDistrictByProvince;


// const url = 'https://vn-public-apis.fpo.vn/districts/getByProvince';
// async function getDistrictByProvince(provinceId){
//     let response=await fetch(`${url}?provinceCode=${provinceId}&limit=-1`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const text = await response.json();
//     let districts = [];
//     text?.data.data.forEach((district) => {
//       const {code,name_with_type} = district;
//       let payload = { code,name_with_type  };
//       // console.log(payloa
//       districts.push(payload);
//     });
//     return districts;
// }
// export default getDistrictByProvince;



// const url = 'https://open.oapi.vn/location/districts';
// async function getDistrictByProvince(provinceId){
//     let response=await fetch(`${url}/${provinceId}`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const text = await response.json();
//     let districts = [];
//     text?.data.forEach((district) => {
//       const {id,name} = district;
//       let payload = { id,name  };
//       // console.log(payload);
//       districts.push(payload);
//     });
//     return districts;
// }
// export default getDistrictByProvince;