import React, { useState } from "react";
import { encode, decode } from "base-64";
import axios from "axios";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
export default function Test() {
  const handle = useFullScreenHandle();
  const [isFullscreen, setisFullscreen] = useState(false);
  const toggle = () => {
    isFullscreen(true);
    if (isFullscreen) {
      screen;
    }
  };
  const [newProb, setnewProb] = useState({
    title: "",
    score: "",
    inpf: "",
    outf: "",
    constraints: "",
    inp: "",
    out: "",
    exp: "",
    desc: "",
  });
  const func = () => {
    const options = {
      method: "POST",
      url: "http://localhost:3000/add-problem",
      params: {},
      headers: {
        "content-type": "application/json",
      },
      data: {
        problem: newProb,
      },
    };
    axios.request(options).then((res) => {
      console.log(res);
    });
    console.log(newProb);
  };
  return (
    <FullScreen handle={handle}>
      <div className="flex justify-center w-full ">
        <button onClick={handle.enter} className="border-2 rounded-lg p-5">
          Full screne
        </button>
        <div className="flex flex-col w-1/2 gap-1">
          <label htmlFor="">Title</label>
          <input
            onInput={(e) => {
              setnewProb({ ...newProb, title: e.target.value });
            }}
            type="text"
            name=""
            id=""
          />
          <label htmlFor="">Score</label>
          <input
            onInput={(e) => {
              setnewProb({ ...newProb, score: e.target.value });
            }}
            type="text"
            name=""
            id=""
          />
          <label htmlFor="">Description</label>
          <textarea
            onInput={(e) => {
              setnewProb({ ...newProb, desc: e.target.value });
            }}
            type="text"
            name=""
            id=""
          />
          <label htmlFor="">Input Format</label>
          <input
            onInput={(e) => {
              setnewProb({ ...newProb, inpf: e.target.value });
            }}
            type="text"
            name=""
            id=""
          />
          <label htmlFor="">Ouput Format</label>
          <input
            onInput={(e) => {
              setnewProb({ ...newProb, outf: e.target.value });
            }}
            type="text"
            name=""
            id=""
          />
          <label htmlFor="">Constraints</label>
          <textarea
            onInput={(e) => {
              setnewProb({ ...newProb, constraints: encode(e.target.value) });
            }}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="">Inputs</label>
          <textarea
            onInput={(e) => {
              setnewProb({ ...newProb, inp: encode(e.target.value) });
            }}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="">Outputs</label>
          <textarea
            onInput={(e) => {
              setnewProb({ ...newProb, out: encode(e.target.value) });
            }}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <label htmlFor="">Explanation</label>
          <textarea
            onInput={(e) => {
              setnewProb({ ...newProb, exp: e.target.value });
            }}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>

          <button className="border border-black m-5 w-10" onClick={func}>
            but
          </button>
        </div>
      </div>
      <p>ok</p>
    </FullScreen>
  );
}
