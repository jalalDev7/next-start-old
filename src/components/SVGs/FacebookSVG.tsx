import React from "react";

const FacebookSVG = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#1877F2"
          d="M15 8a7 7 0 0 0-7-7 7 7 0 0 0-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7 7 0 0 0 15 8"
        ></path>
        <path
          fill="#fff"
          d="M10.725 10.023 11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7 7 0 0 0 2.188 0v-4.892z"
        ></path>
      </g>
    </svg>
  );
};

export default FacebookSVG;
