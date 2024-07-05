// pages/signup.js

import React, { useEffect, useState } from "react";
// import { useRouter } from "next/link";
import Link from "next/link";

const Signup = () => {
    // const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validation = (formData) => {
    let errors = {};
    if (!formData.firstName) {
      errors.fname = " First Name is required";
    } else if (
      formData.firstName.length < 4 ||
      !/^[A-Za-z]+$/.test(formData.firstName)
    ) {
      errors.fname =
        " First Name must have 4 letters and should only be alphabets";
    }
    if (!formData.lastName) {
      errors.lname = " Last Name is required";
    } else if (
      formData.lastName.length < 4 ||
      !/^[A-Za-z]+$/.test(formData.lastName)
    ) {
      errors.lname =
        " Last Name must have 4 letters and should only be alphabets";
    }
    if (!formData.email) {
      errors.email = " Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = " Email must be a valid one";
    }
    if (formData.password != formData.confirmPassword) {
      errors.cpass = " Password and Confirm password must be same";
    }
    if (
      formData.password.length < 8 ||
      !(
        /[A-Z]/.test(formData.password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) &&
        /\d/.test(formData.password)
      )
    ) {
      errors.pass =
        " Password must have 8 letters and should contain atleast one capital letter , one special character, and one number";
    }
  
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(formData));
    if (Object.keys(errors).length === 0) {
      // router.push("/dashboard");
    }
  };

  useEffect(() => {
    setErrors(validation(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { firstName, lastName, email, password, confirmPassword } = formData;

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-20 w-1/3 px-4">
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        <div className="mb-4">
          <label className="block text-gray-500 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.fname && (
            <div className="text-red-500 text-sm">{errors.fname}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.lname && (
            <div className="text-red-500 text-sm">{errors.lname}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.pass && (
            <div className="text-red-500 text-sm">{errors.pass}</div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.cpass && (
            <div className="text-red-500 text-sm">{errors.cpass}</div>
          )}
        </div>
        <Link
        href="/dashboard"
          type="submit"
          className={`w-full py-2 text-white rounded ${
            errors.cpass ||
            errors.fname ||
            errors.lname ||
            errors.email ||
            errors.pass
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={
            errors.cpass ||
            errors.fname ||
            errors.lname ||
            errors.email ||
            errors.pass
          }
        >
          Sign Up
        </Link>
      </form>
    </div>
  );
};

export default Signup;
