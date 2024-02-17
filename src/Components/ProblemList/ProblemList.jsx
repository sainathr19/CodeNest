import React from "react";
import ProblemCard from "../ProblemCard/Problem";

export default function ProblemList({ problems }) {
  return (
    <div className="flex flex-col gap-3 w-full mb-[5vh]">
      {problems.map((prob) => {
        console.log(prob);
        return <ProblemCard statement={prob} />;
      })}
    </div>
  );
}
