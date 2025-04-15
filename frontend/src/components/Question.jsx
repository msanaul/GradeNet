// import React, { useState } from "react";

// const Question = ({ accessToken }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/model_answer", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ question, model_answer: answer }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to post data");
//       }

//       // Handle success here
//       console.log("Data posted successfully");
//     } catch (error) {
//       console.error("Error posting data:", error.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-green-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Question Form</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="question"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Question:
//             </label>
//             <input
//               type="text"
//               id="question"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label
//               htmlFor="answer"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Answer:
//             </label>
//             <textarea
//               id="answer"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               rows="4"
//               required
//             ></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Question;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Question = ({ accessToken }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/model_answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question: question,
          model_answer: answer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit question and answer");
      }

      const data = await response.json();
      if (data.message === "OK") {
        navigate("/");
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error submitting question and answer:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          Submit Question & Answer
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Model Answer:
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
