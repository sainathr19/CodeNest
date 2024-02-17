import React from "react";

export default function HomePage() {
  return (
    <div>
      <div className="flex  w-[1000px] border-2 rounded-lg items-center mt-[10vh] rounded-xl">
        <div className=" w-full rounded-lg p-5 h-[15vh] flex justify-between items-center">
          <p className="text-4xl text-black font-bold">
            Smart Interviews - Primary Problems
          </p>
          <div>
            <button className="bg-slate-200 rounded-lg p-2 pr-5 pl-5 w-max">
              Participate
            </button>
          </div>
        </div>
      </div>
      <div className="flex  w-[1000px] border-2 rounded-lg items-center mt-[10vh] rounded-xl">
        <div className=" w-full rounded-lg p-5 h-[15vh] flex justify-between items-center">
          <p className="text-4xl text-black font-bold">Kill Code 2023</p>
          <div>
            <button className="bg-slate-200 rounded-lg p-2 pr-5 pl-5 w-max">
              Participate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
