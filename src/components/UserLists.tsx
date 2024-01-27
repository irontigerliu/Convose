import React from "react";
import {
  Card,
  CardBody,
//   CardTitle,
  ListGroup,
//   CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import PropTypes from 'prop-types';


const UserLists = ({ handleJoinGame, handleLeaveGame, UserData, joinedState }) => {
  const renderJoinButton = () => {
    if (joinedState) {
      return (
        <center>
          <Button className="btn rounded-pill" color="info" size="lg" onClick={handleLeaveGame}>
              Leave Game
          </Button>
        </center>
      );
    } else {
      return (
        <center>
          <Button className="btn rounded-pill" color="info" size="lg" onClick={handleJoinGame}>
              Join Game
          </Button>
        </center>
      );
    }
  }
  
  return (
    <Card>
      <CardBody>
        {/* <CardTitle tag="h5">User Lists</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Here are joined users:
        </CardSubtitle> */}
        <ListGroup flush className="mt-4">
          {UserData && UserData.map((user, index) => (
            <ListGroupItem
              key={index}
              action
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
                <div className="d-flex align-items-center p-2">
                  <img
                      src={user.avatar}
                      className="rounded-circle"
                      alt="avatar"
                      width="45"
                      height="45"
                      />
                  <div className="ms-3">
                      <h6 className="mb-0">{user.name}</h6>
                      <span className="text-muted">{user.email}</span>
                  </div>
                </div>
                <small className="ms-auto text-muted text-small">
                {user.point} points
                </small>
            </ListGroupItem>
          ))}
        </ListGroup>
        {renderJoinButton()}
      </CardBody>
    </Card>
  );
};

UserLists.propTypes = {
  handleJoinGame: PropTypes.func,
  handleLeaveGame: PropTypes.func,
  UserData: PropTypes.array,
  joinedState: PropTypes.bool
};

export default UserLists;
