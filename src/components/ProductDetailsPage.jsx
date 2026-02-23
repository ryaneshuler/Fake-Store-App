import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { Container, Spinner, Card, Button, Dropdown, Modal } from 'react-bootstrap';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    navigate(`/products/${id}/edit`);
  }

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        console.error('Failed to delete product');
        return;
      }
      navigate('/productlisting', { replace: true });
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleCancelDelete = () => setShowConfirm(false);

  useEffect(() => {
    let mounted = true;
    fetchProductById(id)
      .then(data => { if (mounted) setProduct(data); })
      .catch(err => console.error(err))
      .finally(() => { if (mounted) setLoading(false); });
    return () => (mounted = false);
  }, [id]);

  if (loading) return <Container className="py-5 text-center"><Spinner /></Container>;
  if (!product) return <Container className="py-5">Product not found</Container>;

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '800px', margin: 'auto' }}>
        <div style={{ aspectRatio: '1/1', maxHeight: '300px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 20 }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text><b>Category: {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : ''}</b></Card.Text>
          <Card.Text>{product.description}</Card.Text>
          <h4 className="mb-3">${product.price}</h4>
          <Button className="me-2" variant="primary">Add to Cart</Button>
          <Button className="me-2" variant="secondary" onClick={handleEdit}>Edit</Button>
          <Button className="me-2" variant="danger" onClick={handleDeleteClick}>Delete</Button>
        </Card.Body>
      </Card>

     <Modal show={showConfirm} onHide={handleCancelDelete} centered>
       <Modal.Header closeButton>
         <Modal.Title>Confirm delete</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         Are you sure you want to delete "<strong>{product.title}</strong>"? This action cannot be undone.
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleCancelDelete}>Cancel</Button>
         <Button variant="danger" onClick={handleConfirmDelete}>Delete</Button>
       </Modal.Footer>
     </Modal>
    </Container>
  );
}