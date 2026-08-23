"use client";

import Editor from "@monaco-editor/react";
import { SupportedLanguage } from "@/components/code/LanguageSelect";

export function CodeEditor({
  language,
  value,
  onChange,
}: {
  language: SupportedLanguage;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <Editor
        height="420px"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          padding: { top: 16 },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
