import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { Container, Spinner, Card, Button } from 'react-bootstrap';

export default function ProductDetailsPage() {
  const { id } = useParams(); // id from /products/:id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <Card>
        <div style={{ aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 20 }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h4>${product.price}</h4>
          <Button variant="primary">Add to Cart</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}