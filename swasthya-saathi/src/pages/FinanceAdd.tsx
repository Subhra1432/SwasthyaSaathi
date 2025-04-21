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

// Transaction type
interface TransactionData {
  amount: string;
  date: string;
  type: string;
  category: string;
  description: string;
  payee: string;
  paymentMethod: string;
  receiptAttached: boolean;
  notes: string;
}

const FinanceAdd: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  
  // Initial form state
  const [transactionData, setTransactionData] = useState<TransactionData>({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
    category: '',
    description: '',
    payee: '',
    paymentMethod: 'cash',
    receiptAttached: false,
    notes: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleBack = () => {
    navigate('/finance');
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransactionData(prev => ({
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
    setTransactionData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!transactionData.amount.trim()) {
      newErrors.amount = t('validation.required') || 'Amount is required';
    } else if (isNaN(Number(transactionData.amount)) || Number(transactionData.amount) <= 0) {
      newErrors.amount = t('validation.amount') || 'Amount must be a positive number';
    }
    
    if (!transactionData.date.trim()) {
      newErrors.date = t('validation.required') || 'Date is required';
    }
    
    if (!transactionData.type) {
      newErrors.type = t('validation.required') || 'Type is required';
    }
    
    if (!transactionData.category.trim()) {
      newErrors.category = t('validation.required') || 'Category is required';
    }
    
    if (!transactionData.description.trim()) {
      newErrors.description = t('validation.required') || 'Description is required';
    }
    
    if (!transactionData.payee.trim()) {
      newErrors.payee = t('validation.required') || 'Payee/Payer is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the data to an API
      console.log('Transaction data:', transactionData);
      
      // Navigate back to finance page
      navigate('/finance', { state: { success: true, message: 'Transaction added successfully' } });
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
          <Link to="/finance" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('finance.title')}
          </Link>
          <Typography color="textPrimary">{t('finance.addTransaction')}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Page title */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('finance.addTransaction')}
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
                {t('finance.transactionDetails')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.type}>
                <InputLabel>{t('finance.type')}</InputLabel>
                <Select
                  name="type"
                  value={transactionData.type}
                  label={t('finance.type')}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="income">{t('finance.income')}</MenuItem>
                  <MenuItem value="expense">{t('finance.expense')}</MenuItem>
                </Select>
                {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('finance.date')}
                name="date"
                type="date"
                value={transactionData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('finance.amount')}
                name="amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                value={transactionData.amount}
                onChange={handleChange}
                error={!!errors.amount}
                helperText={errors.amount}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('finance.category')}
                name="category"
                value={transactionData.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label={t('finance.description')}
                name="description"
                value={transactionData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
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
                required
                label={transactionData.type === 'income' ? t('finance.payer') || 'Payer' : t('finance.payee') || 'Payee'}
                name="payee"
                value={transactionData.payee}
                onChange={handleChange}
                error={!!errors.payee}
                helperText={errors.payee}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>{t('finance.paymentMethod') || 'Payment Method'}</InputLabel>
                <Select
                  name="paymentMethod"
                  value={transactionData.paymentMethod}
                  label={t('finance.paymentMethod') || 'Payment Method'}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="cash">{t('finance.cash') || 'Cash'}</MenuItem>
                  <MenuItem value="bank_transfer">{t('finance.bankTransfer') || 'Bank Transfer'}</MenuItem>
                  <MenuItem value="cheque">{t('finance.cheque') || 'Cheque'}</MenuItem>
                  <MenuItem value="upi">{t('finance.upi') || 'UPI'}</MenuItem>
                  <MenuItem value="other">{t('common.other') || 'Other'}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('common.notes')}
                name="notes"
                value={transactionData.notes}
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

export default FinanceAdd; 