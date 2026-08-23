"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Problem } from "@/lib/types";
import { CodeEditor } from "@/components/code/CodeEditor";
import { LanguageSelect, SupportedLanguage } from "@/components/code/LanguageSelect";
import { recordLocalAttempt } from "@/lib/clientActivity";

export function CodeWorkspace({ problem }: { problem: Problem }) {
  const router = useRouter();
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [code, setCode] = useState(problem.starterCode ?? "");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit/code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemSlug: problem.slug, sourceCode: code }),
      });
      const data = await res.json();
      recordLocalAttempt(problem.slug, data.result.verdict === "ACCEPTED");
      router.push(`/submissions/${data.id}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <LanguageSelect value={language} onChange={setLanguage} />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
          {submitting ? "Judging..." : "Submit"}
        </button>
      </div>
      <CodeEditor language={language} value={code} onChange={setCode} />
    </div>
  );
}
