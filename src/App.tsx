import React from "react";
import Form from "./components/Form";
import "./styles/global.css";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pink-200 opacity-30 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-200 opacity-30 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-200 opacity-30 rounded-full blur-3xl animate-float-fast"></div>
      </div>
      <div className="z-10 w-full max-w-xl p-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur-xl">
        <Form />
      </div>
    </div>
  );
}
