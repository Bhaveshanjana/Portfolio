"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmailMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsEmailSending(true);
    try {
      const response = await axios.post("/api/send-email", {
        email,
        message,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setMessage("");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    } finally {
      setIsEmailSending(false);
    }
  };
  return (
    <div className=" text-gray-700 space-y-5 mt-9 mb-1 mx-6">
      <h1 className=" md:text-[17px] dark:text-gray-400 bg-gradient-to-r from-[#d3d7da53] dark:bg-gradient-to-r dark:from-[#0C1C21] border-l-2 border-gray-600 dark:border-gray-400">
        <span className="ml-2 ">Reach me out via email</span>
      </h1>
      <form onSubmit={sendEmailMessage}>
        <h3 className="dark:text-gray-400 text-sm md:text-[16px] -mt-2">
          Email
        </h3>
        <input
          type="email"
          name="user_email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="example@gmail.com"
          className="my-1 w-full mx-auto rounded-sm p-1 dark:border-[#27272a] border-gray-300 bg-transparent border shadow-sm placeholder:text-gray-600 placeholder:text-[15px]"
        />
        <h3 className="mt-1 dark:text-gray-400 text-sm md:text-[16px]">
          Message
        </h3>
        <input
          type="text"
          name="user_message"
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter your message"
          className="w-full mx-auto my-1 dark:border-[#27272a] border-gray-300 bg-transparent border shadow-sm p-1 rounded-sm placeholder:text-gray-600 placeholder:text-[14px]"
        />
        <button
          type="submit"
          className=" w-full mx-auto text-black dark:text-gray-500 rounded-md mt-2  md:text-lg font-light cursor-pointer bg-[#2b2b2d0a] dark:bg-[#27272a26] p-1 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200 disabled:cursor-no-drop"
        >
          {isEmailSending ? "Sending message..." : "Send message"}
        </button>
      </form>
      {/* Footer */}
      <div className="border-t dark:border-[#27272a] -mt-2.5 text-center text-[11px] md:text-sm font-mono dark:text-gray-200">
        Created by Bhavesh
      </div>
    </div>
  );
};

export default Contact;
