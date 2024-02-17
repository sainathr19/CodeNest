import React from "react";
import { Link } from "react-router-dom";

export default function ContestPreview() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[1000px] items-center mt-[10vh] rounded-xl">
        <div className="bg-[#633990] w-full rounded-lg p-5 flex flex-col justify-around items-center h-[35vh]">
          <p className="text-4xl text-white font-bold">
            Smart Interviews - Primary Problems
          </p>
          <Link
            to="/contest"
            className="bg-white rounded-lg p-2 pr-5 pl-5 w-max"
          >
            Start Contest
          </Link>
        </div>
        <div className="flex justify-around w-full h-[12vh] items-center mt-6 border-4 rounded-lg p-3 pr-8">
          <div className="flex flex-col items-center gap-1 ">
            <p className="text-xl text-slate-700">Total Problems</p>
            <p className="font-bold">4</p>
          </div>
          <div className="bg-slate-500 border-2 h-full"> </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl text-slate-700">Total Score</p>
            <p className="font-bold">350</p>
          </div>
          <div className="bg-slate-500 border-2 h-full"> </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl text-slate-700">Duration</p>
            <p className="font-bold">1hr 30min</p>
          </div>
          <div className="bg-slate-500 border-2 h-full"> </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl text-slate-700">Start Time</p>
            <p className="font-bold">01/03/24 8:00am</p>
          </div>
          <div className="bg-slate-500 border-2 h-full"> </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xl text-slate-700">End Time</p>
            <p className="font-bold">01/03/24 9:30am</p>
          </div>
        </div>
      </div>
    </div>
  );
}
