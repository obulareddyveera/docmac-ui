import React from "react";
import { useSelector } from "react-redux";

const SpinnerComponent = () => {
  const { code } = useSelector((state) => {
    return state.service
  });
  return (
    <>
      {code && code === 100 && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-200 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-portalBg animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinnerComponent;
