import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { API } from './API';


function App() {

  const handleClick = (service) => {
    API.queues(service)
    .then((res) => {
      // TODO: display estimated wait time
      // window.alert("Estimated wait time: ");
    })
    .catch((err) => {
      console.log(err);
    })
  }


  return (
    <Container fluid >
      <Row >
        <h1>Welcome to post office, please select a service</h1>
      </Row>
      <Row>
        <Col ></Col>
        <Col className='col-6'>
          <Card onClick={() => handleClick("1")} style={{ cursor: "pointer" }} className='custom-card'>
          <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="d-flex align-items-center">
                    Shippings
                  </div>
                </Col>
                <Col></Col>
                <Col className="text-right">
                  <img src="http://localhost:3000/shippings.svg" width="200" height="200" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col ></Col>
      </Row>
      <Row>
        <Col ></Col>
        <Col className='col-6'>
          <Card onClick={() => handleClick("2")} style={{ cursor: "pointer" }} className='custom-card'>
          <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="d-flex align-items-center">
                    Account Management
                  </div>
                </Col>
                <Col></Col>
                <Col className="text-right">
                  <img src="http://localhost:3000/account.svg" width="200" height="200" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col ></Col>
      </Row>
      <Row>
        <Col ></Col>
        <Col className='col-6'>
          <Card onClick={() => handleClick("3")} style={{ cursor: "pointer" }} className='custom-card'>
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="d-flex align-items-center">
                    Bills
                  </div>
                </Col>
                <Col></Col>
                <Col className="text-right">
                  <img src="http://localhost:3000/bills.svg" width="200" height="200" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col ></Col>
      </Row>
      <Row>
        <Col ></Col>
        <Col className='col-6'>
          <Card onClick={() => handleClick("4")} style={{ cursor: "pointer" }} className='custom-card'>
          <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="d-flex align-items-center">
                    Current Account Services
                  </div>
                </Col>
                <Col></Col>
                <Col className="text-right">
                  <img src="http://localhost:3000/settings.svg" width="200" height="200" />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col ></Col>
      </Row>
    </Container >
  )
}

export default App
