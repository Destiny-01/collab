import React from "react";

function Loader({ isFull = false }) {
  return (
    <div
      className={`${
        isFull ? "h-screen w-screen" : "h-full w-full"
      } blurmd  flex justify-center items-center`}
    >
      <div className="relative">
        <div
          className="w-24 h-24 flex items-center rounded-full animate-spin"
          style={{
            background:
              "conic-gradient(from 180.48deg at 50.41% 50.41%, #662AE7 0deg, #E1D4FB 360deg)",

            //   "conic-gradient(from 135deg, #662AE7 0%, #E1D4FB 50%, #662AE7 100%)",
            // border: "13px solid",
            // borderImageSource:
            //   "conic-gradient(from 180.48deg at 50.41% 50.41%, #662AE7 0deg, #E1D4FB 360deg)",
          }}
        ></div>
        <svg
          width="70"
          height="70"
          viewBox="0 0 121 121"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inner-paths border-0 rounded-full bg-white border-white"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M68.2626 82.5522C65.8068 83.4273 63.1618 83.9038 60.4055 83.9038C47.4801 83.9038 37.002 73.4257 37.002 60.5002C37.002 47.5748 47.4801 37.0967 60.4055 37.0967C63.6172 37.0967 66.6778 37.7436 69.4641 38.9143L79.1147 29.2636C73.6471 25.9817 67.2467 24.0947 60.4055 24.0947C40.2993 24.0947 24 40.394 24 60.5002C24 80.6065 40.2993 96.9058 60.4055 96.9058C66.8106 96.9058 72.8293 95.2517 78.0578 92.3474L68.2626 82.5522Z"
            fill="#824CF6"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.628 71.6818C78.8035 71.6818 83.8097 66.6755 83.8097 60.5001C83.8097 54.3246 78.8035 49.3184 72.628 49.3184C66.4525 49.3184 61.4463 54.3246 61.4463 60.5001C61.4463 66.6755 66.4525 71.6818 72.628 71.6818ZM72.628 84.6837C85.9843 84.6837 96.8117 73.8563 96.8117 60.5001C96.8117 47.1438 85.9843 36.3164 72.628 36.3164C59.2717 36.3164 48.4443 47.1438 48.4443 60.5001C48.4443 73.8563 59.2717 84.6837 72.628 84.6837Z"
            fill="#662AE7"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Loader;
