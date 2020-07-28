import React, { useState, createContext, useContext } from "react";
import "./QuestionsPage.scss";
import { useHistory } from "react-router";

const questions = [
  {
    id: 0,
    text: "평소에는 아무렇지도 않았던 일들이 귀찮게 느껴졌다",
    isReversed: false,
  },
  {
    id: 1,
    text: "입맛이 없었다",
    isReversed: false,
  },
  {
    id: 2,
    text: "가족이나 친구가 도와주더라도 울적한 기분을 떨쳐 버릴 수가 없었다",
    isReversed: false,
  },
  {
    id: 3,
    text: "다른 사람들만큼 능력이 있다고 느꼈다",
    isReversed: true,
  },
  {
    id: 4,
    text: "무슨 일을 하든 정신을 집중하기가 힘들었다",
    isReversed: false,
  },
  {
    id: 5,
    text: "우울했다",
    isReversed: false,
  },
  {
    id: 6,
    text: "하는 일마다 힘들게 느껴졌다",
    isReversed: false,
  },
  {
    id: 7,
    text: "미래에 대하여 희망적이라고 느꼈다",
    isReversed: true,
  },
  {
    id: 8,
    text: "내 인생은 실패작이라는 생각이 들었다",
    isReversed: false,
  },
  {
    id: 9,
    text: "두려움을 느꼈다",
    isReversed: false,
  },
  {
    id: 10,
    text: "잠을 설쳤거나 잠을 잘 이루지 못했다",
    isReversed: false,
  },
  {
    id: 11,
    text: "행복했다",
    isReversed: true,
  },
  {
    id: 12,
    text: "말 수가 줄었다",
    isReversed: false,
  },
  {
    id: 13,
    text: "세상에 홀로 있는 듯한 외로움을 느꼈다",
    isReversed: false,
  },
  {
    id: 14,
    text: "사람들이 나에게 차갑게 대하는 것 같았다",
    isReversed: false,
  },
  {
    id: 15,
    text: "생활이 즐거웠다",
    isReversed: true,
  },
  {
    id: 16,
    text: "갑자기 울음이 나왔다",
    isReversed: false,
  },
  {
    id: 17,
    text: "슬픔을 느꼈다",
    isReversed: false,
  },
  {
    id: 18,
    text: "사람들이 나를 싫어하는 것 같았다",
    isReversed: false,
  },
  {
    id: 19,
    text: "도무지 무엇을 시작할 기운이 나지 않았다",
    isReversed: false,
  },
];

const options = [
  { id: 0, option: "극히 드물다", frequency: "1일 이하", value: 0 },
  { id: 1, option: "가끔", frequency: "1-2일", value: 1 },
  { id: 2, option: "자주", frequency: "3-4일", value: 2 },
  { id: 3, option: "거의 대부분", frequency: "5일 이상", value: 3 },
];

const getItemById = (array, id) => {
  return array.find((item) => {
    return item.id === id;
  });
};

const AnswersContext = createContext();

function QuestionsPage() {
  const history = useHistory();

  const [answers, setAnswers] = useState(
    questions.map((question) => {
      return { question_id: question.id, option_id: -1 };
    })
  );

  const calculateTotal = () => {
    let total = 0;
    for (let answer of answers) {
      const question = getItemById(questions, answer.question_id);
      const option = getItemById(options, answer.option_id);
      if (option) {
        if (question.isReversed) {
          total = total + 3 - option.value;
        } else {
          total = total + option.value;
        }
      }
    }
    return total;
  };

  const total = calculateTotal();

  return (
    <div className="questions-page">
      <div className="question">
        일주일 기준으로 답변해주세요
      </div>
      <AnswersContext.Provider value={{ answers, setAnswers }}>
        {questions.map((question) => (
          <Question question={question} key={question.id} />
        ))}
        <div
          className="see-results"
          onClick={() => {
            const found = answers.find((answer) => answer.option_id === -1);
            if (found) {
              alert("모든 질문에 답변해주세요");
            } else {
              history.push(`/results?score=${total}`);
            }
          }}
        >
          결과 보기
        </div>
      </AnswersContext.Provider>
    </div>
  );
}

function Question({ question }) {
  return (
    <div className="question">
      <h3>{question.text}</h3>
      <div className="options">
        {options.map((option) => (
          <Option option={option} question={question} key={option.id} />
        ))}
      </div>
    </div>
  );
}

function Option({ option, question }) {
  const { answers, setAnswers } = useContext(AnswersContext);
  const isSelected = !!answers.find(
    (answer) =>
      answer.question_id === question.id && answer.option_id === option.id
  );

  return (
    <div
      className={`option ${isSelected ? "selected" : null}`}
      onClick={() => {
        const nextAnswers = answers.map((answer) => {
          if (answer.question_id === question.id) {
            return {
              question_id: answer.question_id,
              option_id: option.id,
            };
          } else {
            return answer;
          }
        });
        setAnswers(nextAnswers);
      }}
    >
      {option.frequency}
    </div>
  );
}

export default QuestionsPage;
