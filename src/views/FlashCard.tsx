import { Col, Row } from "reactstrap";
import { useState, useEffect } from "react";
import UserLists from "../components/UserLists";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/ResultCard";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const QuestionData = require("../apis/questionQuery");

import { socket } from "../socket";

const FlashCard = () => {
  const [selectedCardIndex, setCardIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [joinedState, setJoinedState] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    socket.on("show_result_and_next_question", (param) => {
      setCurrentAnswer(param.answer);
      setShowResult(true);
      setTimeout(() => {
        setShowResult(false);
        setCardIndex(param.nextQuestionId);
      }, 2000);
    });
    socket.on("join_request_success", (user) => {
      setUserProfile(user);
      setJoinedState(true);
    });
    socket.on("new_user_joined", (users) => {
      setUserData(users.filter((user) => user.joined));
    });
    socket.on("leave_request_success", () => {
      setJoinedState(false);
    });
  }, []);

  const handleMarkAnswer = (param) => {
    if (param.correct) {
      socket.emit("selected_correct_word", {
        answer: param,
        nextQuestionId: handleGetNextQuestionId(),
      });
    }
  };

  const handleJoinGame = () => {
    socket.emit("user_join_request");
  };

  const handleLeaveGame = () => {
    socket.emit("user_leave_request", userProfile);
  };

  const handleGetNextQuestionId = () => {
    const tempIndex: number = Math.random() * QuestionData.length;
    if (tempIndex === selectedCardIndex) {
      return handleGetNextQuestionId();
    } else {
      return tempIndex;
    }
  };

  const handleShowCard = () => {
    const selCardData = QuestionData[selectedCardIndex];
    return (
      <Col sm="6" md="6" lg="6" xl="6" xxl="6">
        <QuestionCard
          title={selCardData.question}
          answers={selCardData.answers}
          handleMarkAnswer={handleMarkAnswer}
        />
      </Col>
    );
  };

  const handleShowResult = () => {
    const selCardData = QuestionData[selectedCardIndex];
    return (
      <Col sm="6" md="6" lg="6" xl="6" xxl="6">
        <ResultCard title={selCardData.question} answer={currentAnswer} />
      </Col>
    );
  };

  return (
    <div style={{ paddingTop: "10%" }}>
      <Row>
        <Col sm="6" md="6" lg="4" xl="4" xxl="4">
          <UserLists
            handleJoinGame={handleJoinGame}
            handleLeaveGame={handleLeaveGame}
            UserData={UserData}
            joinedState={joinedState}
          />
        </Col>
        {showResult ? handleShowResult() : handleShowCard()}
      </Row>
    </div>
  );
};

export default FlashCard;
