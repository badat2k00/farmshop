import React from "react";
import { CgClose } from "react-icons/cg";
const Modal = ({ onClose, content, funcAllow, funcDeny }) => {
  return (
    <div className="fixed flex  bg-slate-200 bg-opacity-50 top-0 left-0 right-0 bottom-0 justify-center items-center z-10">
      <div className="bg-white   p-4 rounded w-full max-w-2xl h-[50%] max-h-[80%] overflow-hidden">
        <div
          className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
          onClick={onClose}
        >
          <CgClose />
        </div>

      <p>{content}</p>
        <div className="flex flex-row justify-between">
          <button onClick={funcAllow}>Yes</button>
          <button onClick={funcDeny}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
