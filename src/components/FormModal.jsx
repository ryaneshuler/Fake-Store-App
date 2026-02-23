// Create a form modal for the AddProductPage that says the added product was added successfully, along with information on its input fields like name, price, category, and description

import { Modal, Button } from 'react-bootstrap';

const FormModal = ({ show, handleClose, product }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Product Added Successfully!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product ? (
          <>
            <p>Product Name: {product.title}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Description: {product.description}</p>
          </>
        ) : (
          <p>No product information available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
