import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProblemCard({ statement }) {
  const [Statement, setStatement] = useState(statement);
  return (
    <div class="problem w-full bg-slate-100 flex justify-between p-5 pl-8 pr-8 items-center hover:bg-slate-200">
      <div class="left flex flex-col gap-4">
        <p class="text-2xl">{Statement.title}</p>
        <div class="left-bottom flex gap-5 text-sm">
          <p>
            Max Score:<b>{Statement.score}</b>
          </p>
          <p>
            Users Tried:<b> 1198</b>
          </p>
          <p>
            Success Rate:<b> 98.08%</b>
          </p>
        </div>
      </div>
      <div class="right">
        <Link
          to={"/problem/" + Statement.pid}
          class="border-solid-black rounded p-2 pl-3 pr-3 h-9 flex items-center bg-white"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
