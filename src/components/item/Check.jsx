import React from "react";
import { BsCheck } from "react-icons/bs";
// passing isSelected to check if it is completed and if yes it will show checkmark that is completed
const Check = ({ isSelected }) => {
  return (
    <div
      className={`border-2 rounded-lg border-pink-400 ${
        isSelected ? "bg-pink-400" : ""
      } w-5 h-5 mr-3 flex items-center justify-center`}
    >
      {isSelected && <BsCheck size={24} className="text-gray-900" />}
    </div>
  );
};

export default Check;
