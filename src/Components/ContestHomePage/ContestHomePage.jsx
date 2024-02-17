import React, { useEffect, useState } from "react";
import Problem from "../ProblemCard/Problem";

import ProblemList from "../ProblemList/ProblemList";
import axios from "axios";

export default function ContestHomePage() {
  const [Problems, setProblems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/get-problems").then((res) => {
      setProblems(res.data);
    });
  }, []);
  return (
    <>
      <div className="bg-[#633990] w-full p-5 flex flex-col gap-2 justify-around items-center h-[13vh]">
        <p className="text-4xl text-white font-bold">
          Smart Interviews - Primary Problems
        </p>
        <div className="flex gap-9">
          <p className="text-white text-lg">
            Score: <b>50 / 350</b>
          </p>
          <p className="text-white text-lg">
            Solved: <b>1 / 4</b>
          </p>
        </div>
      </div>
      <div className="flex h-full gap-[5vh] m-[5vh] mb-[5vh] ">
        <div className="left w-3/4">
          {Problems ? <ProblemList problems={Problems} /> : <p>Loading...</p>}
        </div>
        <div className="right flex justify-center ">
          <button className="border-2 h-10 pl-5 mt-9 pr-5 text-lg from-neutral-700">
            View Leaderboard
          </button>
        </div>
      </div>
    </>
  );
}
