import { useSurvey } from "../../hooks/useSurvey";
import SelectionStep from "../../components/SelectionStep/SelectionStep";

const OPTIONS = ["조용한", "활기찬", "데이트하기 좋은", "혼밥하기 좋은"];

export default function Step2Vibe() {
  const { answers, setAnswer } = useSurvey();

  return (
    <SelectionStep
      stepNumber={2}
      title="당신이 원하는 분위기를 알려주세요."
      options={OPTIONS}
      selected={answers.vibe}
      onSelect={(value) => setAnswer("vibe", value)}
      prevPath="/step1"
      nextPath="/step3"
      charImg="/char-vibe.svg"
      speechText="00님이 생각하는 분위기를 알려주세요!"
    />
  );
}
