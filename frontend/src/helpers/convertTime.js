import moment from "moment-timezone"

function convertTime(date){
    return moment(date).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss DD/MM/YYYY")
}

export default convertTime