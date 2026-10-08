"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { SectionHeader } from "./ui/SectionHeader";

const Contact = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isEmailSending, setIsEmailSending] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();
  const isEmailValid = validateEmail(trimmedEmail);
  const canSend = isEmailValid && trimmedMessage.length > 0;

  const sendEmailMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trimmedEmail || !trimmedMessage) {
      toast.error("Email and message are both required.");
      return;
    }

    if (!isEmailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsEmailSending(true);
    try {
      const response = await axios.post("/api/send-email", {
        email: trimmedEmail,
        message: trimmedMessage,
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
    <div className="space-y-5">
      <SectionHeader title="Reach me out" />
      <form onSubmit={sendEmailMessage}>
        <h3 className="text-gray-400 text-sm md:text-[16px] -mt-2">
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
          required
          className="my-1 w-full mx-auto rounded-sm p-1 border-[#27272a] bg-transparent border shadow-sm placeholder:text-gray-600 placeholder:text-[12px]"
        />
        {trimmedEmail.length > 0 && !isEmailValid && (
          <p className="text-[11px] text-red-400/80 font-mono">
            Enter a valid email address.
          </p>
        )}
        <h3 className="mt-1 text-gray-400 text-sm md:text-[16px]">
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
          required
          className="w-full mx-auto my-1 border-[#27272a] bg-transparent border shadow-sm p-1 rounded-sm placeholder:text-gray-600 placeholder:text-[12px]"
        />
        <button
          type="submit"
          disabled={!canSend || isEmailSending}
          className=" w-full mx-auto text-gray-500 hover:text-white/80 rounded-md mt-2  md:text-lg font-light cursor-pointer bg-[#27272a26] p-1 transition-all duration-300 disabled:cursor-no-drop disabled:opacity-40 disabled:hover:text-gray-500"
        >
          {isEmailSending ? "Sending message..." : "Send message"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
