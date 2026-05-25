import { createContext, useState } from "react";

const SurveyContext = createContext(null);

export function SurveyProvider({ children }) {
  const [answers, setAnswers] = useState({
    menu: null, // Step1에서 선택한 메뉴
    vibe: null, // Step2에서 선택한 분위기
    budget: null, // Step3에서 선택한 예산
  });

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const resetAnswers = () => {
    setAnswers({ budget: null, vibe: null, menu: null });
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
