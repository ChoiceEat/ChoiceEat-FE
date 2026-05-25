import { useSurvey } from "../../hooks/useSurvey";
import SelectionStep from "../../components/SelectionStep/SelectionStep";
import { useAuth } from "../../hooks/useAuth";

const OPTIONS = ["한식", "중식", "양식", "일식", "기타"];

export default function Step1Menu() {
  const { answers, setAnswer } = useSurvey();
  const { user } = useAuth();
  const nickname = user?.nickname ?? "";

  return (
    <SelectionStep
      stepNumber={1}
      headerTitle="메뉴를 알려주세요."
      title="먹고싶은 메뉴를 선택해주세요"
      options={OPTIONS}
      selected={answers.menu}
      onSelect={(value) => setAnswer("menu", value)}
      prevPath="/welcome"
      nextPath="/step2"
      charImg="/char-main.svg"
      speechText={`${nickname}님이 먹고싶은 메뉴를 알려주세요!`}
    />
  );
}
