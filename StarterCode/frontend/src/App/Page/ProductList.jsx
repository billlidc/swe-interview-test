import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, IconButton, CardMedia, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  //implement the get products function to fetch products from backend
  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);  // Set the products into the state
      })
      .catch(error => console.error('Error fetching products:', error));
  };

  //implement the delete function
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        // Remove the deleted product from the state
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  // Use useEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={2} justifyContent="center">
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.imageUrl}
              />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>{product.description}</Typography>
                <Typography>{`$${product.price}`}</Typography>
                <IconButton
                  sx={{
                    color: 'red'
                  }}
                  onClick={() => handleDelete(product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;