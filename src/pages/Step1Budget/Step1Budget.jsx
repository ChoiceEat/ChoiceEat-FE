import { useSurvey } from "../../hooks/useSurvey";
import SelectionStep from "../../components/SelectionStep/SelectionStep";

const OPTIONS = ["1만원 미만", "1만원 ~ 2만원", "2만원 ~ 3만원", "3만원 초과"];

export default function Step1Budget() {
  const { answers, setAnswer } = useSurvey();

  return (
    <SelectionStep
      stepNumber={1}
      title="당신의 예산을 알려주세요."
      options={OPTIONS}
      selected={answers.budget} // 저장된 선택값 표시
      onSelect={(value) => setAnswer("budget", value)} // 선택 시 저장
      prevPath={null} // null이면 뒤로가기 버튼 안 보임
      nextPath="/step2"
      charImg="/char-budget.png"
      speechText="00님의 예산안을 기준점으로 맛집을 찾아드릴게요!"
    />
  );
}
