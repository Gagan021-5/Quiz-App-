import { useState } from "react";
import "./App.css";
import { data } from "./data";
import { SiQuizlet } from "react-icons/si";

function App() {
  const [start, setstart] = useState(true);
  const [quiz, setquiz] = useState(false);
  const [question, setquestion] = useState(0);
  const [btn, setbtn] = useState([1, 2, 3, 4]);
  const [option, setoption] = useState(null);
  const [score, setscore] = useState(0);
  const [display, setdisplay] = useState(false);

  const first = () => {
    setstart(!start);
    setquiz(!quiz);
  };

  const selected = (e) => {
    setoption(e);
    if (e === data[question].ans) {
      setscore(score + 1);
    }
  };

  const nextPage = () => {
    if (question < data.length - 1) {
      setquestion(question + 1);
      setoption(null);
    } else {
      setquiz(false);
      setdisplay(true);
    }
  };

  return (
    <>
      {start && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz!</h1>
            <p className="text-gray-600 mb-6">
              Test your knowledge and have fun!
            </p>
            <button
              onClick={first}
              className="bg-indigo-500 hover:bg-indigo-600 delay-100 duration-200 cursor-pointer ease-in-out text-white px-6 py-2 rounded-lg hover:scale-110"
            >
              Start Quiz
            </button>
          </div>
        </div>
      )}

      {quiz && (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-100 to-indigo-200 p-6">
          <div className="flex justify-between items-center mb-4">
          <SiQuizlet className="fill-indigo-500 w-auto h-10" />
            <h2 className="text-xl font-semibold">General Knowledge Quiz</h2>
            
          </div>

          <div className="flex-grow flex flex-col justify-center items-center text-center rounded-xl bg-white/30 backdrop-blur-md border border-white/30 shadow-xl p-6 ">
            <p className="text-lg text-gray-600 mb-2">
              Question {question + 1} of {data.length}
            </p>
            <h1 className="text-2xl font-bold mb-6">
              {data[question]["question"]}
            </h1>

            <div className="grid gap-4 w-full max-w-md">
              {btn.map((val) => {
                return (
                  <button
                    key={val}
                    onClick={() => selected(val)}
                    className={` px-6 py-3 rounded-lg shadow transition cursor-pointer outline-none ${
                      option === val
                        ? "bg-indigo-500 text-white font-semibold"
                        : "bg-white hover:bg-indigo-100"
                    }`}
                  >
                    {data[question][`option${val}`]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-right mt-4">
            <button
              onClick={nextPage}
              className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {display && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
          <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">Quiz Completed! 🎉</h1>
            <p className="text-lg text-gray-700 mb-2">You scored</p>
            <div className="text-5xl font-extrabold text-green-500 mb-6">
              {score} / {data.length}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
