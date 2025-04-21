import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Select,
  FormHelperText,
  Breadcrumbs,
  Divider,
  InputAdornment
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Inventory item type
interface InventoryData {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  reorderLevel: string;
  expiryDate: string;
  description: string;
  location: string;
  supplier: string;
  notes: string;
}

const InventoryAdd: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  
  // Initial form state
  const [inventoryData, setInventoryData] = useState<InventoryData>({
    name: '',
    category: '',
    quantity: '',
    unit: 'pieces',
    reorderLevel: '',
    expiryDate: '',
    description: '',
    location: '',
    supplier: '',
    notes: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleBack = () => {
    navigate('/inventory');
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInventoryData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle select field changes
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setInventoryData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!inventoryData.name.trim()) {
      newErrors.name = t('validation.required') || 'Name is required';
    }
    
    if (!inventoryData.category.trim()) {
      newErrors.category = t('validation.required') || 'Category is required';
    }
    
    if (!inventoryData.quantity.trim()) {
      newErrors.quantity = t('validation.required') || 'Quantity is required';
    } else if (isNaN(Number(inventoryData.quantity)) || Number(inventoryData.quantity) < 0) {
      newErrors.quantity = t('validation.quantity') || 'Quantity must be a non-negative number';
    }
    
    if (!inventoryData.unit.trim()) {
      newErrors.unit = t('validation.required') || 'Unit is required';
    }
    
    if (!inventoryData.reorderLevel.trim()) {
      newErrors.reorderLevel = t('validation.required') || 'Reorder level is required';
    } else if (isNaN(Number(inventoryData.reorderLevel)) || Number(inventoryData.reorderLevel) < 0) {
      newErrors.reorderLevel = t('validation.quantity') || 'Reorder level must be a non-negative number';
    }
    
    // Expiry date is optional but if provided should be in the future
    if (inventoryData.expiryDate) {
      const today = new Date();
      const expiryDate = new Date(inventoryData.expiryDate);
      if (expiryDate < today) {
        newErrors.expiryDate = t('validation.futureDate') || 'Expiry date must be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the data to an API
      console.log('Inventory data:', inventoryData);
      
      // Navigate back to inventory page
      navigate('/inventory', { state: { success: true, message: 'Item added successfully' } });
    }
  };
  
  return (
    <Box>
      {/* Header with breadcrumbs */}
      <Box mb={3}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('navigation.dashboard')}
          </Link>
          <Link to="/inventory" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('inventory.title')}
          </Link>
          <Typography color="textPrimary">{t('inventory.addItem')}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Page title */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('inventory.addItem')}
        </Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          variant="outlined"
        >
          {t('common.back')}
        </Button>
      </Box>
      
      {/* Form */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('inventory.itemDetails')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('inventory.name')}
                name="name"
                value={inventoryData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('inventory.category')}
                name="category"
                value={inventoryData.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label={t('inventory.quantity')}
                name="quantity"
                type="number"
                value={inventoryData.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required error={!!errors.unit}>
                <InputLabel>{t('inventory.unit')}</InputLabel>
                <Select
                  name="unit"
                  value={inventoryData.unit}
                  label={t('inventory.unit')}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="pieces">Pieces</MenuItem>
                  <MenuItem value="packets">Packets</MenuItem>
                  <MenuItem value="boxes">Boxes</MenuItem>
                  <MenuItem value="tablets">Tablets</MenuItem>
                  <MenuItem value="bottles">Bottles</MenuItem>
                  <MenuItem value="kits">Kits</MenuItem>
                </Select>
                {errors.unit && <FormHelperText>{errors.unit}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                required
                label={t('inventory.reorderLevel')}
                name="reorderLevel"
                type="number"
                value={inventoryData.reorderLevel}
                onChange={handleChange}
                error={!!errors.reorderLevel}
                helperText={errors.reorderLevel}
                InputProps={{
                  inputProps: { min: 0 }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('inventory.expiryDate')}
                name="expiryDate"
                type="date"
                value={inventoryData.expiryDate}
                onChange={handleChange}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('inventory.description') || 'Description'}
                name="description"
                value={inventoryData.description}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('common.additionalInfo') || 'Additional Information'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('inventory.location') || 'Storage Location'}
                name="location"
                value={inventoryData.location}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('inventory.supplier') || 'Supplier'}
                name="supplier"
                value={inventoryData.supplier}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('common.notes')}
                name="notes"
                value={inventoryData.notes}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                startIcon={<SaveIcon />} 
                type="submit"
                fullWidth
              >
                {t('common.save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default InventoryAdd; 