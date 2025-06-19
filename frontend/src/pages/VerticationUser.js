import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const VerticationUser = () => {
  const [checkVerication, setCheckVerication] = useState(false);
  // const navigate=useNavigate();
  const [numberResend,setNumberResend]=useState(3);
  const [state,setState]=useState("")
  const [seconds, setSeconds] = useState(10);
  const handleCheckSignIn = (e) => {
    setCheckVerication(true);
    tinhthoigian();
  };


  //click môi lần =>  
  const handleResendCheck =(e)=>{
     setNumberResend((numberResend)=>{
      if(numberResend<1){
        clearInterval(tinhthoigian())
        setState("You used all code today.Please back to tomorrow")
        return 0;
      }
      return numberResend-1
    })
  }
 
  function tinhthoigian() {
    setInterval(() => {
      setSeconds((seconds) => {
        if (seconds <= 1) {
          clearInterval(tinhthoigian());
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  }
  useEffect(() => {
    const intervalId = tinhthoigian();
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  // setTimeout(()=>{navigate("/")},3000)
  return (
    <>
      <div className="flex justify-center items-center mx-auto my-3 container p-4 flex-wrap">
        <p>
          Please verify your account We sent an email to //email Just click on
          the link in that email to complete your sign up.If you don't see it,
          you need check your spam folder Still can't find the email? No problem
        </p>

        {checkVerication ? (
          <>
            {/* <div className=" flex mx-auto container justify-center items-center">
         Thank you!! Your account has already been confirmed .You can login to
          application
      </div> */}

            <div>
              <p>{(seconds===0)?( <button onClick={(e) => handleResendCheck(e)}>
              {(numberResend<1)?(<p>Limited code</p>):(<p>Resend</p>)}
              </button>):seconds}</p>
            </div>
          </>
        ) : (
          <>
            <button onClick={(e) => handleCheckSignIn(e)}>Send </button>
          </>
        )}
      </div>
    </>
  );
};

export default VerticationUser;
