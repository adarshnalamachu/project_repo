"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { users } from "../services/users";
import { useRouter } from "next/navigation";


const Login = () => {
  const router = useRouter()

  const emailoriginal = "@gmail.com";
  const passwordoriginal = "AdarshNalamachu";

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validation = (formData) => {
    let errors = {};
    if (!formData.email) {
      errors.email = " Email is required";
    } 
    else if (!formData.email.includes(emailoriginal)) {
      errors.email = " Please enter a Mind-Graph Email Id";
    }
    if (!formData.password) {
      errors.cpass = " Password is required";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      emailAddress: formData.email,
      password: formData.password,
    };

    try {
      const res = await users.login(payload);
      setResponse(res.data);
      setError(null); 
      localStorage.setItem("user",JSON.stringify(res.data))
      localStorage.setItem("token", res.data.token);
      router.push("/dashboard") 
      

    } catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );

      }
      else {
          setError("Login Failed")
      }
      setResponse(null);
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

  const { email, password } = formData;

  return (
    <div className="flex justify-center">
      <form onSubmit={handleLogin} className="mt-20 md:w-1/3 px-4">
        <h2 className="text-2xl font-bold mb-6">Login with your account</h2>

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
          {errors.cpass && (
            <div className="text-red-500 text-sm">{errors.cpass}</div>
          )}
        </div>
        {error && <p>{error}</p>}
        <button
          type="submit"
          className={`w-full px-2 py-2 text-white rounded ${
            errors.cpass || errors.email
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={errors.cpass || errors.email}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
