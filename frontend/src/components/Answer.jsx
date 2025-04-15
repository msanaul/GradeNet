import React, { useState, useEffect } from "react";
import Select from "react-select";

const Answer = ({ accessToken, name }) => {
  const [studentAnswer, setStudentAnswer] = useState("");
  const [scoreAvailable, setScoreAvailable] = useState(false);
  const [score, setScore] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8080/get_questions", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(
        data.questions.map((question) => ({
          label: question.question,
          value: question.question_id,
        }))
      );
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const handleChange = (selectedOption) => {
    setSelectedQuestion(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          question_id: selectedQuestion.value,
          student_answer: studentAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to check answer");
      }

      const data = await response.json();
      setScore(data.score);
      setScoreAvailable(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    } catch (error) {
      console.error("Error checking answer:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {scoreAvailable ? (
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              {name} Your Score is :{" "}
            </h2>
            <div className="bg-gray-200 p-4 rounded-lg text-4xl font-semibold">
              {score}
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">Welcome {name} </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700"
                >
                  Question:
                </label>
                <div>
                  <Select
                    options={questions}
                    value={selectedQuestion}
                    onChange={handleChange}
                    placeholder="Select a question..."
                    isClearable
                    isSearchable
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Answer:
                </label>
                <textarea
                  id="answer"
                  value={studentAnswer}
                  onChange={(e) => setStudentAnswer(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-center">
                {/* <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  Submit
                </button> */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
            <div>
              {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Answer;
