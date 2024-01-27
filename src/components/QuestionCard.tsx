/* eslint-disable react/react-in-jsx-scope */
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

const QuestionCard = ({ title, answers, handleMarkAnswer, joinedState }) => {
  return (
    <Card className="text-center">
      <CardTitle tag="h4" className="border-bottom p-3 mb-0">
        {title}
      </CardTitle>
      <CardBody>
        <div className="button-group">
          {answers.map((answer, index) => (
            <Button
              key={index}
              className="btn rounded-pill"
              color="info"
              size="lg"
              block
              disabled={joinedState ? false : true}
              onClick={() => handleMarkAnswer(answer)}
            >
              {answer.content}
            </Button>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

QuestionCard.propTypes = {
  title: PropTypes.string,
  answers: PropTypes.array,
  handleMarkAnswer: PropTypes.func,
  joinedState: PropTypes.bool,
};

export default QuestionCard;
