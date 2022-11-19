import type { NextPage } from 'next';
import { Col, Form } from 'react-bootstrap';

import { Container, FormGroup } from '../styles/pages/login/styles';

import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login: NextPage = () => {
  return (
    <Container>
      <Col className="card" xs={12}>
        <Col className="d-flex flex-column align-items-center" xs="auto">
          <Form style={{ width: '100%' }}>
            <Col xs="auto">
              <Col>
                <h4>Login</h4>
              </Col>
              <Col className="msg-secondary">
                <p>Please, fill in your details to enter</p>
              </Col>
            </Col>
            <FormGroup controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
              <div className="icon">
                <MdOutlineEmail />
              </div>
            </FormGroup>

            <FormGroup>
              <Form.Control type="password" placeholder="Password" />
              <div className="icon">
                <RiLockPasswordLine />
              </div>
            </FormGroup>
            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit">LOGIN</button>
                <Col className="forgot">
                  <a href="">forgot Password?</a>
                </Col>
              </Col>
              <Col className="msg-secondary visit ">
                <p>
                  Don t have an account?<a href=""> Visit</a>
                </p>
              </Col>
            </Col>
          </Form>
        </Col>
      </Col>
    </Container>
  );
};

export default Login;
