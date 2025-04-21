import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField,
  InputAdornment,
  Chip,
  Divider,
  Paper,
  Rating
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  LocalShipping as ShippingIcon,
  Storefront as VendorIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock product interface
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  vendor: string;
}

const Marketplace: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const products: Product[] = [
    {
      id: 1,
      name: 'First Aid Kit',
      price: 650,
      category: 'Medical Supplies',
      image: 'https://images.unsplash.com/photo-1631815588090-d1bcbe9b4b0f?q=80&w=200&auto=format&fit=crop',
      rating: 4.5,
      stock: 25,
      vendor: 'Medical Supplies Co.'
    },
    {
      id: 2,
      name: 'Digital Thermometer',
      price: 250,
      category: 'Medical Devices',
      image: 'https://images.unsplash.com/photo-1584362511957-9e5b2d3c3f04?q=80&w=200&auto=format&fit=crop',
      rating: 4.8,
      stock: 42,
      vendor: 'HealthTech Solutions'
    },
    {
      id: 3,
      name: 'Sanitary Pads (Pack of 30)',
      price: 120,
      category: 'Hygiene Products',
      image: 'https://images.unsplash.com/photo-1607171028912-d90461d7a64f?q=80&w=200&auto=format&fit=crop',
      rating: 4.7,
      stock: 85,
      vendor: 'Women Health Supplies'
    },
    {
      id: 4,
      name: 'Blood Pressure Monitor',
      price: 1450,
      category: 'Medical Devices',
      image: 'https://images.unsplash.com/photo-1513125370-3460ebe3401b?q=80&w=200&auto=format&fit=crop',
      rating: 4.6,
      stock: 10,
      vendor: 'HealthTech Solutions'
    },
    {
      id: 5,
      name: 'Hand Sanitizer (500ml)',
      price: 90,
      category: 'Hygiene Products',
      image: 'https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=200&auto=format&fit=crop',
      rating: 4.2,
      stock: 120,
      vendor: 'CleanLife'
    },
    {
      id: 6,
      name: 'Pregnancy Test Kit',
      price: 80,
      category: 'Medical Supplies',
      image: 'https://images.unsplash.com/photo-1583912267570-89ad007dfb86?q=80&w=200&auto=format&fit=crop',
      rating: 4.4,
      stock: 65,
      vendor: 'Medical Supplies Co.'
    }
  ];

  // Filter products based on search query
  const filteredProducts = searchQuery 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('marketplace.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCartIcon />}
          onClick={() => alert('Shopping cart would open here')}
        >
          Cart (0)
        </Button>
      </Box>

      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        {t('marketplace.description') || 'Order healthcare supplies and equipment through our integrated marketplace.'}
      </Typography>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products, categories, or vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {categories.map(category => (
                <Chip 
                  key={category} 
                  label={category} 
                  onClick={() => setSearchQuery(category)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Rating value={product.rating} precision={0.5} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary" ml={1}>
                    ({product.rating})
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  <Chip 
                    label={product.category} 
                    size="small" 
                    variant="outlined" 
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <VendorIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {product.vendor}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <ShippingIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Available: {product.stock} units
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    ₹{product.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => alert(`Added ${product.name} to cart`)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredProducts.length === 0 && (
        <Box textAlign="center" py={5}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No products found matching "{searchQuery}"
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => setSearchQuery('')}
          >
            Clear Search
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Marketplace; 