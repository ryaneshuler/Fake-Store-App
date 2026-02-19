import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Container, Spinner, Row, Col, Card, Button } from "react-bootstrap"

function ProductListing() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products")
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" />
      </Container>
    )
  }

  return (
    <div>
      <h1>Product Listing</h1>
      <Container>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <Card className="h-100">
                <div className="product-image">
                  <img src={product.image} alt={product.title} className="product-img" />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="mt-auto">${product.price}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ProductListing