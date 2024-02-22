import React, { useEffect, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import Editor from "@monaco-editor/react";
import ProblemStatement from "../ProblemStatement/ProblemStatement";
import files from "../../Utils/LanguagesList";
import { useRef } from "react";
import {
  decode as base64_decode,
  encode as base64_encode,
  decode,
} from "base-64";
import axios from "axios";
import { useParams } from "react-router-dom";
import ViewSubmissions from "../ViewSubmissions/ViewSubmissions";
import getTimestamp from "../../Utils/TimeStamp";
import baseurl from "../../Utils/Api-Url";
export default function Problem() {
  const [consoleOpen, setconsoleOpen] = useState(false);
  const [Lang, setLang] = useState(files["java"]);
  const [CustomInput, setCustomInput] = useState(false);
  const [ProblemSt, setProblemSt] = useState(null);
  const [ExcResult, setExcResult] = useState(null);
  const [curTab, setCurTab] = useState("problem");

  const editorRef = useRef(null);
  const params = useParams();
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }
  const postSubmission = async (
    language_id,
    source_code,
    stdin,
    exp_output
  ) => {
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "d048904afamsh7c58dce1604a4e9p176967jsna9a437cfb37f",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: JSON.stringify({
        language_id: language_id,
        source_code: source_code,
        stdin: stdin,
        expected_output: exp_output,
      }),
    };

    const res = await axios.request(options);
    console.log(res.data.token);
    return res.data.token;
  };

  const getOutput = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": "d048904afamsh7c58dce1604a4e9p176967jsna9a437cfb37f",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    const res = await axios.request(options);
    if (res.data.status_id <= 2) {
      const res2 = await getOutput(token);
      return res2.data;
    }
    return res.data;
  };
  const newSubmission = async () => {
    const options = {
      method: "POST",
      url: baseurl + "/new-submission/",
      data: {
        problem: ProblemSt.title,
        username: localStorage.getItem("username"),
        timestamp: getTimestamp(),
        language: Lang.lang,
        verdict: ExcResult.status.description,
        sourcecode: ExcResult.source_code,
        score: ExcResult.status_id === 3 ? ProblemSt.score : "0",
        pid: ProblemSt.pid,
      },
    };

    const res = await axios.request(options);
    console.log(res);
  };
  const getSubmission = async () => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/6fe68974-6cc5-4589-b603-aeed934a81f2",
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "d048904afamsh7c58dce1604a4e9p176967jsna9a437cfb37f",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };
    axios.request(options).then((res) => {
      console.log(res.data);
      newSubmission();
    });
  };

  async function runCode() {
    const source_code = base64_encode(editorRef.current.getValue());
    const token = await postSubmission(
      Lang.language_id,
      source_code,
      ProblemSt.inp,
      ProblemSt.out
    );
    const out = await getOutput(token);
    setExcResult(out);
  }
  useEffect(() => {
    axios.get(baseurl + "/get-problem?id=" + params.pid).then((res) => {
      setProblemSt(res.data);
      console.log(ProblemSt);
    });
  }, []);
  return (
    <div className="">
      <SplitPane split="vertical">
        <div className="left">
          {curTab === "problem" ? (
            ProblemSt ? (
              <ProblemStatement ProblemSt={ProblemSt} />
            ) : (
              <p>Loading...</p>
            )
          ) : (
            <ViewSubmissions />
          )}
        </div>
        <div className="right  h-full flex flex-col justify-between">
          <div className="upper-options flex justify-end pl-5 h-[7vh] pr-5 items-center">
            <div className="language-select w-1/4 flex gap-1 items-center">
              <p className="text-sm">Language</p>
              <select
                defaultValue="java"
                name="lang"
                id="lang"
                className=" w-max h-3/4 outline-none border-black-2 rounded p-2"
                onChange={(e) => {
                  console.log("Changed");
                  setLang(files[e.target.value]);
                }}
              >
                <option value="js">Javascript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
          </div>
          <div className=" flex flex-col flex-grow">
            <SplitPane
              split="horizontal"
              allowResize={true}
              // onChange={(size) => {
              //   console.log(size);
              //   if (size[0] > 54000) {
              //     setconsoleOpen(false);
              //   }
              // }}
            >
              <Editor
                // options={{ readOnly: true }}
                defaultLanguage={Lang.lang}
                defaultValue={Lang.value}
                theme="vs-dark"
                path={Lang.path}
                onMount={handleEditorDidMount}
              />
              {consoleOpen && (
                <div className="h-3/4">
                  <div className="upper  h-[6vh] flex items-center">
                    <p className=" border-b-2 pr-10 pl-7 pb-2 border-blue-400">
                      Results
                    </p>
                  </div>
                  <div className="custom-input mt-2">
                    <div className="flex items-center ml-8 gap-2 ">
                      <input
                        onClick={(e) => {
                          setCustomInput(!CustomInput);
                        }}
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <p>Custom input</p>
                    </div>
                    {CustomInput && (
                      <textarea
                        className="mt-2 ml-8"
                        name=""
                        id=""
                        cols="30"
                        rows="4"
                      ></textarea>
                    )}
                  </div>
                  {ExcResult ? (
                    <div className="execution-results m-5 max-h-full">
                      <p className="ml-8">{ExcResult.status.description}</p>
                      {ExcResult.status_id === 3 || ExcResult.status_id == 4 ? (
                        <div className="result bg-slate-100 m-8 mb-0 mt-3 mr-8">
                          <div className="input p-3">
                            <p className="font-bold text-sm text-slate-600">
                              Input
                            </p>
                            <p className="whitespace-pre-wrap text-[16px]">
                              {decode(ProblemSt.inp)}
                            </p>
                          </div>
                          <div className="output p-3">
                            <p className="font-bold text-slate-600 text-sm">
                              Output
                            </p>
                            <p className="whitespace-pre-wrap text-[16px]">
                              {decode(ExcResult.stdout) === "ée"
                                ? ""
                                : decode(ExcResult.stdout)}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap text-[16px] ml-8 mt-4 bg-slate-100 p-5">
                          {decode(ExcResult.stderr)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="font-bold text-center mt-6">
                      Execute code to view Results
                    </p>
                  )}
                </div>
              )}
            </SplitPane>
          </div>
          <div className="console flex justify-between pl-5 pr-5 h-max p-2 min-h-max">
            <div className="bg-slate-200 rounded  flex pr-3">
              <button
                className="p-2 w-20"
                onClick={() => {
                  setconsoleOpen(!consoleOpen);
                }}
              >
                Console
              </button>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tdXAiPjxwYXRoIGQ9Im0xOCAxNS02LTYtNiA2Ii8+PC9zdmc+"
                alt=""
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={runCode}
                className="rounded bg-slate-200  p-2 w-20"
              >
                Run
              </button>
              <button
                onClick={getSubmission}
                className="rounded bg-slate-200  p-2 w-20"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </SplitPane>
    </div>
  );
}
