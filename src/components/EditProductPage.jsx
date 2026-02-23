// EditProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom'; // ADDED: router hooks
import { Container, Modal, Form, Button, Row, Col, Image, Spinner } from 'react-bootstrap'; // ADDED: layout + image
import { fetchProductById } from '../api/products'; // ADDED: API helper (fallback fetch)
import axios from 'axios'; // optional: for submit

export default function EditProductPage() {
  const { id } = useParams();                 // ADDED: route id (if present)
  const location = useLocation();             // ADDED: possible product passed via navigation.state
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);

  // productSource = product passed from ProductDetailsPage (if any)
  const productFromState = location.state?.product ?? null;

  const [product, setProduct] = useState(productFromState);
  const [loading, setLoading] = useState(!productFromState); // only load if no state product

  // Controlled form state (initialized after product is available)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  // Load product if not provided via navigation state
  useEffect(() => {
    let mounted = true;
    
    async function loadProduct() {
      if (!productFromState && id) {
        setLoading(true);
        try {
          const data = await fetchProductById(id);
          if (mounted) setProduct(data);
        } catch (err) {
          console.error('Failed to fetch product', err);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        // no fetch needed
        if (mounted) setLoading(false);
      }
    }

    loadProduct();
    return () => { mounted = false; };
  }, [id, productFromState]);

  // Initialize form fields when product becomes available
  useEffect(() => {
    if (!product) return;
    setTitle(product.title ?? '');
    setDescription(product.description ?? '');
    setCategory(product.category ?? '');
    setImage(product.image ?? '');
    setPrice(product.price ?? '');
  }, [product]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <p>Product not found.</p>
      </Container>
    );
  }

  // handle submit (example: PUT to API then navigate back to details)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      title,
      description,
      category,
      image,
      price: Number(price)
    };
    try {
      await axios.put(`https://fakestoreapi.com/products/${product.id}`, updated);
      handleShowModal();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Edit Product</h1>

      <Row>
        <Col md={4} className="mb-3">
          {/* show product image preview */}
          <Image src={image} alt={title} fluid rounded style={{ objectFit: 'contain', maxHeight: 360, width: '100%' }} />
        </Col>

        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={product.title || 'Enter product title'} // placeholder = existing detail
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={product.description || 'Enter product description'}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCategory" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder={product.category || 'Enter product category'}
              />
            </Form.Group>

            <Form.Group controlId="formImage" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder={product.image || 'Enter product image URL'}
              />
            </Form.Group>

            <Form.Group controlId="formPrice" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={product.price ? String(product.price) : 'Enter price'}
                step="0.01"
                min="0"
                required
              />
            </Form.Group>

            <div className="d-flex">
              <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>Cancel</Button>
              <Button onClick={handleShowModal} variant="primary" type="submit">Save Changes</Button>
            </div>
          </Form>
        </Col>
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Product Updated</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>The product has been successfully updated.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Container>
  );
}