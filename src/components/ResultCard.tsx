/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Card, CardBody, CardTitle, Badge } from "reactstrap";
import PropTypes from "prop-types";

const ResultCard = ({ title, answer, winner }) => {
  const renderWinner = () => {
    if (winner) {
      return (
        <>
          <h3 style={{ color: "red", fontWeight: "bold", marginRight: 20 }}>
            Winner:{" "}
          </h3>
          <img
            src={"assets/images/users/" + winner.name + ".png"}
            className="rounded-circle"
            alt="avatar"
            width="45"
            height="45"
          />
          <h3 className="mb-0" style={{ marginLeft: 20 }}>
            {winner.name}
          </h3>
        </>
      );
    } else return null;
  };

  return (
    <Card className="text-center">
      {/* <img 
                alt="Card image cap" 
                srcSet="/static/media/bg3.5668e1f0dc365cf13f41.jpg" 
                className="card-img"
                /> */}
      <CardTitle tag="h4" className="border-bottom p-3 mb-0">
        {title}
      </CardTitle>
      <CardBody>
        <h3
          color="primary rounded-pill"
          className="bg-primary rounded-pill"
          style={{ color: "white", padding: 5 }}
        >
          {answer.content + "  "}
          <Badge
            className="rounded-circle"
            color={answer.correct ? "success" : "danger"}
          >
            {answer.correct ? (
              <i className="bi bi-check"></i>
            ) : (
              <i className="bi bi-x-lg"></i>
            )}
          </Badge>
        </h3>
        <CardTitle tag="h5">
          <div
            className="d-flex text-center p-4"
            style={{ justifyContent: "center" }}
          >
            {renderWinner()}
          </div>
        </CardTitle>
        <CardTitle tag="h4" style={{ color: answer.correct ? "red" : "blue" }}>
          {answer.correct ? "+" : "-"}5pts
        </CardTitle>
      </CardBody>
    </Card>
  );
};

ResultCard.propTypes = {
  title: PropTypes.string,
  answers: PropTypes.object,
  winner: PropTypes.object,
};

export default ResultCard;
