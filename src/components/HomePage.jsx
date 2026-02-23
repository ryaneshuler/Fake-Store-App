import React, { useEffect, useState } from 'react';
import { Container, Spinner, Carousel } from 'react-bootstrap';
import { fetchProducts } from '../api/products';

function HomePage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchProducts()
    .then(data => {
      if (!mounted) return;
      const imgs = data.slice(0, 6).map(p => ({
        id: p.id,
        src: p.image,
        title: p.title
      }));
      setImages(imgs);
    })
    .catch(err => console.error('fetchProducts error', err))
    .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  if (!images.length) {
    return (
      <Container className="py-5 text-center">
        <h2>No featured products</h2>
      </Container>
    );
  }

  const prevIcon = (
    <svg width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.9)" />
      <path d="M10 4L6 8L10 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const nextIcon = (
    <svg width="40" height="40" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.9)" />
      <path d="M6 4L10 8L6 12" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <Container className="px-3 px-sm-4 py-4">
      <h1 className="mb-3">Welcome to Fake Store!</h1>
      <p className="mb-4">Your one-stop-shop for everything fake!</p>
      <Carousel
        fade
        controls={true}
        indicators={true}
        prevIcon={prevIcon}
        nextIcon={nextIcon}
        keyboard
        pause="hover"
        interval={2000}
      >
        {images.map(img => (
          <Carousel.Item key={img.id}>
            <div style={{ width: '100%', height: 'clamp(160px, 40vw, 360px)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#f8f9fa', padding: '0.75rem' }}>
              <img
                src={img.src}
                alt={img.title}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* caption moved below image (not overlay) */}
            <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
              <h5 style={{ fontSize: '1rem', background: 'rgba(255,255,255,0.75)', display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', color: '#000' }}>{img.title}</h5>
            </div>

          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default HomePage;