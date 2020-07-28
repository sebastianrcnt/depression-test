import React from "react";
import { useLocation, useHistory } from "react-router";
import queryString from "query-string";
import "./ResultsPage.scss"

const resultBank = [
  {
    over: 0,
    under: 15,
    name: "정상",
    description: "유의한 수준의 우울감이 시사되지 않았습니다",
  },
  {
    over: 16,
    under: 20,
    name: "경미한 우울",
    description:
      "다소 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다. 다만, 이러한 기분상태가 지속될 경우 개인의 신체적, 심리적 대처자원을 저하시킬 수 있습니다. 그러한 경우, 가까운 지역센터나 전문기관을 방문하시기 바랍니다.",
  },
  {
    over: 21,
    under: 24,
    name: "중한 우울",
    description:
      "중한 수준의 우울감이 시사됩니다. 이러한 높은 수준의 우울감은 흔히 신체적, 심리적 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다. 가까운 지역센터나 전문기관을 방문하여 보다 상세한 평가와 도움을 받아보시기 바랍니다. ",
  },
  {
    over: 25,
    under: 60,
    name: "심한 우울",
    description:
      "심한 수준의 우울감이 시사됩니다. 전문기관의 치료적 개입과 평가가 요구됩니다.",
  },
];

const getResultByScore = (score) => {
  const found = resultBank.find((resultCandidate) => {
    return resultCandidate.over <= score && score <= resultCandidate.under;
  });

  if (found) {
    return found;
  } else {
    throw new Error("Not in result bank");
  }
};
export default function ResultsPage() {
  const location = useLocation();
  const history = useHistory();
  const query = queryString.parse(location.search);
  const score = query.score * 1;
  const result = getResultByScore(score);

  return (
    <div className="results-page">
      <div className="name">{result.name}({score})</div>
      <div className="description">{result.description}</div>
      <div className="redo-test-button" onClick={() => {
        history.push('/');
      }}>다시 하기</div>
    </div>
  );
}
