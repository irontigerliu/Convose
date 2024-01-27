import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

const SimpleLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Content Area**********/}

        <div className="contentArea">
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default SimpleLayout;
