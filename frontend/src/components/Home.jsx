import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const message =
    "I can help evaluate subjective answers based on certain criteria and guidelines provided to me. However, it is important to note that subjective answers can be influenced by various factors such as personal biases, emotions, and cultural background, which may not be fully understood by me. Therefore, while I can provide a level of objective analysis, I cannot replace the value of human judgment and contextual understanding in evaluating subjective answers.";

  useEffect(() => {
    const interval = setInterval(() => {
      setText(message.substring(0, currentIndex));
      setCurrentIndex(currentIndex + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, message]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl mt-9 text-green-500 font-semibold pb-12">
            GradeNet
        </h1>
        <div className="text-lg mb-8">
          <p>{text}</p>
        </div>
      </div>

      <div className="flex mt-9 items-center">
          <Link to="register">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4">
              Register
            </button>
          </Link>
          <Link to="student-login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4">
              Student Login
            </button>
          </Link>
          <Link to="teacher-login">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
              Teacher Login
            </button>
          </Link>
        </div>

    </div>
  );
};

export default Home;
