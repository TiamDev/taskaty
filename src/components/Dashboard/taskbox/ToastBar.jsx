import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function ToastBar({ show, message }) {
  return (
    <Row>
      <Col xs={6}>
        <ToastContainer
          position="bottom-end"
          className="p-3"
          style={{ zIndex: 100 }}
        >
          <Toast onClose={() => {}} show={show}>
            <Toast.Body>
              <i className="bi bi-check-circle"></i>
              {message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
    </Row>
  );
}

export default ToastBar;
