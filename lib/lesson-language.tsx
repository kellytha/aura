import { createContext, useContext, useState, type ReactNode } from "react";

import type { LessonLanguageCode } from "@/lib/lesson-content";

type LessonLanguageContextValue = {
  language: LessonLanguageCode;
  setLanguage: (language: LessonLanguageCode) => void;
};

const LessonLanguageContext = createContext<LessonLanguageContextValue | null>(null);

export function LessonLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LessonLanguageCode>("en");

  return (
    <LessonLanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LessonLanguageContext.Provider>
  );
}

export function useLessonLanguage() {
  const context = useContext(LessonLanguageContext);
  if (!context) {
    throw new Error("useLessonLanguage must be used inside LessonLanguageProvider.");
  }
  return context;
}
