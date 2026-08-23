"use client";

export const SUPPORTED_LANGUAGES = ["javascript", "python", "java", "cpp"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const labels: Record<SupportedLanguage, string> = {
  javascript: "JavaScript",
  python: "Python",
  java: "Java",
  cpp: "C++",
};

export function LanguageSelect({
  value,
  onChange,
}: {
  value: SupportedLanguage;
  onChange: (lang: SupportedLanguage) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as SupportedLanguage)}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {labels[lang]}
        </option>
      ))}
    </select>
  );
}
