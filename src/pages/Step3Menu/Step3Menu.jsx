import { useSurvey } from "../../hooks/useSurvey";
import SelectionStep from "../../components/SelectionStep/SelectionStep";

const OPTIONS = ["한식", "중식", "양식", "일식", "기타"];

export default function Step3Menu() {
  const { answers, setAnswer } = useSurvey();

  return (
    <SelectionStep
      stepNumber={3}
      title="당신의 메뉴를 알려주세요."
      options={OPTIONS}
      selected={answers.menu}
      onSelect={(value) => setAnswer("menu", value)}
      prevPath="/step2"
      nextPath="/loading"
      charImg="/char-menu.png"
      speechText="00님이 먹고싶은 메뉴를 알려주세요!"
      manualNext={true} // 선택해도 자동으로 안 넘어감
    />
  );
}
