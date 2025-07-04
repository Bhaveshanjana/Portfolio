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
    <div className=" text-gray-700 space-y-4 mt-9 mb-1 mx-4">
      <h1 className="text-xl dark:text-gray-400">Reach me out via email</h1>
      <form onSubmit={sendEmailMessage}>
        <h3 className="dark:text-gray-400">Email</h3>
        <input
          type="email"
          name="user_email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="example@gmail.com"
          className="my-1 w-full mx-auto rounded-sm p-2 border-[#374151] bg-transparent border shadow-sm placeholder:text-gray-600"
        />
        <h3 className="mt-3 dark:text-gray-400">Message</h3>
        <input
          type="text"
          name="user_message"
          id="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Enter your message"
          className="w-full mx-auto my-1 border-[#374151] bg-transparent border shadow-sm p-2 rounded-sm placeholder:text-gray-600"
        />
        <button
          type="submit"
          className=" w-full mx-auto text-black p-1 rounded-md mt-3 text-xl font-light cursor-pointer bg-gray-400  hover:bg-gray-500 hover:text-cyan-400 transition-all duration-200 disabled:cursor-no-drop"
        >
          {isEmailSending ? "Sending message..." : "Send message"}
        </button>
      </form>
      {/* Footer */}
      <div className="border-t border-gray-400 mt-5 text-center text-xs md:text-sm font-mono dark:text-gray-400">
        Designed by bhavesh
      </div>
    </div>
  );
};

export default Contact;
