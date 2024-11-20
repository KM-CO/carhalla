"use client";
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      setUsername("");
      setEmail("");
      setPassword("");

      router.push("/");
    } catch (error) {
      console.error('Error in creating user', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
      <form onSubmit={handleSignup} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 flex justify-between w-full max-w-md">
        <Link href="/">
          <button className="text-blue-500 hover:underline">Go Back Home</button>
        </Link>
        <Link href="/login">
          <button className="text-blue-500 hover:underline">Already have an account? Log In</button>
        </Link>
      </div>
    </div>
  );
};
