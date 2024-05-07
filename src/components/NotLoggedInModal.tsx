import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import VerifyImage from "@/assets/verify-image.png";
import Button from "./Button";
import Link from "next/link";

function NotLoggedInModal({ onClose }: { onClose: () => void }) {
  const modalRef: any = useRef(null);

  // Close modal when clicking outside of it
  const handleClickOutside = useCallback(
    (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md"></div>
      <div
        ref={modalRef}
        className="relative mx-4 lg:py-8 py-4 rounded-10 lg:px-7 px-3 shadow-modal-shadow border border-milk bg-white w-[450px] max-w-md text-center"
      >
        <Image src={VerifyImage} alt="verify" className="mx-auto" />
        <h2 className="text-gray900 mt-6 mb-2 text-2xl lg:text-[28px]">
          You must login to proceed from here
        </h2>
        <p>
          To avoid abuse, we require you to login or create account before you
          can view projects. It takes less than 2 minutes
        </p>
        <div className="flex mt-6 gap-4 justify-center">
          <Link href="/auth/login">
            <button className="bg-purple500 text-white flex items-center gap-1 py-2.5 px-6 rounded-lg">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="bg-transparent font-medium text-purple500 border-[1.5px] border-purple500 py-2.5 px-6 rounded-lg">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedInModal;
