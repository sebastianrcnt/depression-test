import React from "react";
import { useHistory } from "react-router-dom";
import "./StartPage.scss";

export default function StartPage() {
  const history = useHistory();
  return (
    <div className="start-page">
      <h1>우울증 검사</h1>
      <div className="go-button" onClick={(
      ) => {
        history.push('/questions')
      }}>
        검사하러 가기
      </div>
    </div>
  );
}
