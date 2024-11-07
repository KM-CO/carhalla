
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          Login
        </button>
      </form>
      
      
      <div className="flex space-x-4 mt-4">
        <Link href="/">
          <button className="text-blue-500 hover:underline">Go Back Home</button>
        </Link>
        <Link href="/signup">
          <button className="text-blue-500 hover:underline">{`Don't have an account? Sign Up`}</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
