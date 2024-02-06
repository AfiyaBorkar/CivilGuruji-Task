import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const NotificationModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Reminder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have not completed your purchase. Please proceed to payment.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
