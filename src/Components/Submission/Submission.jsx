import React from "react";
import { Editor } from "@monaco-editor/react";
import files from "../../Utils/LanguagesList";
export default function Submission() {
  return (
    <div className="flex m-5 gap-5 ml-7">
      <div className="info bg-slate-300 w-[60vh]">
        <p>info</p>
      </div>
      <div className="snippet w-1/4 bg-slate-300">
        <Editor
          height="85vh"
          width="125vh"
          options={{ readOnly: true }}
          defaultLanguage="python"
          defaultValue="#python code here"
          theme="vs-dark"
        />
      </div>
    </div>
  );
}
