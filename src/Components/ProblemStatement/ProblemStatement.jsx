import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { decode } from "base-64";
import axios from "axios";
import ViewSubmissions from "../ViewSubmissions/ViewSubmissions";

export default function ProblemStatement(props) {
  const navigate = useNavigate();
  const [curTab, setCurTab] = useState("problem");
  const { ProblemSt } = props;
  return (
    <div className=" h-[92vh] overflow-scroll">
      <div className="top flex justify-between mt-2 p-3 pr-8 pl-8 pb-2">
        <Link to="/contest">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyLjI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tbGVmdCI+PHBhdGggZD0ibTE1IDE4LTYtNiA2LTYiLz48L3N2Zz4="
            alt=""
          />
        </Link>
        <p>23 hrs : 47 mins : 17 secs</p>
      </div>
      <div className="tabs flex pr-8 pl-8 h-10 text-base text-black border-b-2 mt-5">
        <button
          onClick={() => {
            setCurTab("problem");
          }}
          className={
            curTab === "problem"
              ? "pr-10 pl-10 border-b-2  border-violet-500"
              : "pr-10 pl-10"
          }
        >
          Problem
        </button>
        <button
          onClick={() => {
            setCurTab("submissions");
          }}
          className={
            curTab === "submissions"
              ? "pr-10 pl-10 border-b-2  border-violet-500"
              : "pr-10 pl-10"
          }
        >
          Submissions
        </button>
      </div>
      {curTab === "problem" ? (
        <div className="bottom m-10 text-wrap flex flex-col gap-5">
          <div className="title flex flex-col gap-3">
            <p className="text-3xl font-semibold">{ProblemSt.title}</p>
            <p className="font-normal">Max Score: {ProblemSt.score}</p>
          </div>
          <div className="input-format flex flex-col gap-2">
            <p className="text-sm text-black font-bold">Input Format</p>
            <p>{ProblemSt.inpf}</p>
          </div>
          <div className="output-format flex flex-col gap-2">
            <p className="text-sm text-black font-bold">Output Format</p>
            <p>{ProblemSt.outf} </p>
          </div>
          <div className="constraints flex flex-col gap-2">
            <p className="text-sm text-black font-bold">Constraints</p>
            <p className="whitespace-pre-wrap text-[16px]">
              {decode(ProblemSt.constraints)}
            </p>
          </div>
          <div className="examples flex flex-col gap-2">
            <p className="text-sm text-black font-bold">Examples</p>
            <p className="text-sm text-black font-bold">Input</p>
            <div className="inputs whitespace-pre-wrap text-[16px]">
              {decode(ProblemSt.inp)}
            </div>
            <p className="text-sm text-black font-bold">Output</p>
            <div className="outputs">
              <p className="whitespace-pre-wrap text-[16px]">
                {decode(ProblemSt.out)}
              </p>
            </div>
          </div>
          <div className="explanation flex flex-col gap-2">
            <p className="text-sm text-black font-bold">Explanation</p>
            <p>{ProblemSt.exp}</p>
          </div>
        </div>
      ) : (
        <ViewSubmissions />
      )}
    </div>
  );
}
