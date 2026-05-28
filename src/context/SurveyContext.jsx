import { createContext, useState } from "react";

const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [answers, setAnswers] = useState(() => {
    const saved = sessionStorage.getItem("surveyAnswers");
    return saved
      ? JSON.parse(saved)
      : { menu: null, vibe: null, budget: null };
  });

  const setAnswer = (key, value) => {
    setAnswers((prev) => {
      const next = { ...prev, [key]: value };
      sessionStorage.setItem("surveyAnswers", JSON.stringify(next));
      return next;
    });
  };

  const resetAnswers = () => {
    const reset = { menu: null, vibe: null, budget: null };
    sessionStorage.setItem("surveyAnswers", JSON.stringify(reset));
    setAnswers(reset);
  };

  const isSearchable = () => {
    return (
      answers.menu !== null || answers.vibe !== null || answers.budget !== null
    );
  };

  return (
    <SurveyContext.Provider
      value={{ answers, setAnswer, resetAnswers, isSearchable }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export { SurveyContext };