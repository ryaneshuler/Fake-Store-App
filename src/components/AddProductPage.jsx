import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import FormModal from './FormModal';

const AddProductPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [productCreated, setProductCreated] = useState(null);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/productlisting');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const newProduct = { title, price: Number(price), description, category };
    try {
      const res = await axios.post('https://fakestoreapi.com/products', newProduct);
      setProductCreated(res.data);
      setShowModal(true);
      setValidated(false);
    } catch (err) {
      console.error('Failed to add product', err);
    }
  };

  return (
    <>
      <Container fluid className="px-3 px-sm-4 py-4">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 960 }}>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicTitle" className="mb-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Form.Control.Feedback type="invalid">Please enter a title.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="formBasicPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    required
                    aria-label="Price"
                  />
                </InputGroup>
                <Form.Control.Feedback type="invalid">Please enter a valid price.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formBasicCategory" className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12}>
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid">
            <Button variant="primary" type="submit" className="w-100 py-2">
              Add Product
            </Button>
          </div>
        </Form>
      </Container>

      <FormModal
        show={showModal}
        handleClose={handleCloseModal}
        product={productCreated}
      />
    </>
  );
};

export default AddProductPage;
