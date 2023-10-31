import { useContext } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Container, Row, Card } from 'react-bootstrap';

import MessageContext from './messageCtx';
import API  from './API';


function BasicLayout(props) {

  const {handleErrors} = useContext(MessageContext);

  const handleClientServed = () => {
    if ((props.clientID!==-1 && props.serviceName)) {
      API.clientServed(props.clientID)
      .then(() => {
        props.setClientID(-1);
        props.setServiceName('');
      })
      .catch(err => handleErrors(err));
    } else {
      handleErrors("You cannot click here because nobody is serving");
    }
  }

  const handleNextClient = () => {
    if ((props.clientID!==-1 && props.serviceName)) {
      handleErrors("You cannot click here because you have to serve the client before");
    } else {
      API.nextClient(props.counterID)
      .then((data) => {
        props.setClientID(data.clientNumber);
        props.setServiceName(data.serviceName);
        if (data.clientNumber===-1) {
          handleErrors("You have no clients to serve");
        }
      })
      .catch(err => handleErrors(err));
    }
  }
  
  return (
    <Container fluid className="vh-100" >
      <Row>
        <h1> Counter Desktop Number 4 </h1>
        {(props.clientID!==-1 && props.serviceName) ? <h2> You are serving the client number <b style={{color:"red"}}> {props.clientID} </b> at service <b style={{color:"red"}}> {props.serviceName} </b> </h2> : <h2> You are not serving anyone </h2> }
      </Row>
      <Row className='mainContent'>
        <Col></Col>
        <Col className='col-5'>
          <Card onClick={() => handleClientServed()} style={{ cursor: "pointer"}} className='custom-card'>
            <Card.Body>
              <Row className='d-flex justify-content-center'>
                    Client Served
              </Row>
              <Row>
                  <img src="http://localhost:3000/done.svg" width="100" height="100" style={{paddingTop: '1rem'}}/>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col className='col-5'>
          <Card onClick={() => handleNextClient()} style={{ cursor: "pointer" }} className='custom-card'>
            <Card.Body>
              <Row className='d-flex justify-content-center'>
                Next Client
              </Row>
              <Row>
                  <img src="http://localhost:3000/file-person.svg" width="100" height="100" style={{paddingTop: '1rem'}}/>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container >
  );

}

export default BasicLayout;