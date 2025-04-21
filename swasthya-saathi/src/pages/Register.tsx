import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Link as MuiLink,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd,
  Email as EmailIcon,
  Key as KeyIcon,
  Person as PersonIcon,
  LocalHospital as MedicalIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FirebaseError } from 'firebase/app';
import { SelectChangeEvent } from '@mui/material/Select';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  bloodGroup: string;
  medicalConditions: string;
}

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  // Active step in the registration process
  const [activeStep, setActiveStep] = useState(0);
  
  // Form state
  const [formValues, setFormValues] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    bloodGroup: '',
    medicalConditions: ''
  });
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'info' | 'warning' | 'error'
  });
  
  // Registration steps
  const steps = [
    t('register.steps.account'),
    t('register.steps.personal'),
    t('register.steps.medical')
  ];
  
  // Blood group options
  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  ];
  
  // Handle field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name) {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear field error when user types
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
      
      // Clear general error when user makes any change
      if (error) setError(null);
    }
  };
  
  // Toggle password visibility
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate the current step
  const validateStep = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (activeStep === 0) {
      // Account information validation
      if (!formValues.email) {
        newErrors.email = t('register.errors.emailRequired');
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        newErrors.email = t('register.errors.emailInvalid');
      }
      
      if (!formValues.password) {
        newErrors.password = t('register.errors.passwordRequired');
      } else if (formValues.password.length < 6) {
        newErrors.password = t('register.errors.passwordTooShort');
      }
      
      if (!formValues.confirmPassword) {
        newErrors.confirmPassword = t('register.errors.confirmPasswordRequired');
      } else if (formValues.password !== formValues.confirmPassword) {
        newErrors.confirmPassword = t('register.errors.passwordsMismatch');
      }
    } else if (activeStep === 1) {
      // Personal information validation
      if (!formValues.firstName) {
        newErrors.firstName = t('register.errors.firstNameRequired');
      }
      
      if (!formValues.lastName) {
        newErrors.lastName = t('register.errors.lastNameRequired');
      }
      
      if (!formValues.phone) {
        newErrors.phone = t('register.errors.phoneRequired');
      } else if (!/^\d{10}$/.test(formValues.phone)) {
        newErrors.phone = t('register.errors.phoneInvalid');
      }
      
      if (!formValues.dateOfBirth) {
        newErrors.dateOfBirth = t('register.errors.dobRequired');
      }
    } else if (activeStep === 2) {
      // Medical information validation
      if (!formValues.bloodGroup) {
        newErrors.bloodGroup = t('register.errors.bloodGroupRequired');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  
  // Handle registration form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate final step
    if (!validateStep()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await register(
        formValues.email,
        formValues.password,
        `${formValues.firstName} ${formValues.lastName}`,
        formValues.phone,
        'default-shg-id' // Provide a default SHG ID or extract from form if available
      );
      
      setSnackbar({
        open: true,
        message: t('register.success'),
        severity: 'success'
      });
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login?message=' + encodeURIComponent(t('register.loginRedirect')));
      }, 2000);
    } catch (err) {
      console.error('Registration error:', err);
      
      if (err instanceof FirebaseError) {
        // Handle Firebase auth errors
        switch(err.code) {
          case 'auth/email-already-in-use':
            setError(t('register.errors.emailInUse'));
            break;
          case 'auth/invalid-email':
            setError(t('register.errors.invalidEmail'));
            break;
          case 'auth/weak-password':
            setError(t('register.errors.weakPassword'));
            break;
          default:
            setError(t('register.errors.default'));
        }
      } else {
        setError(t('register.errors.default'));
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  return (
    <Container component="main" maxWidth="md">
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            background: theme.palette.background.paper,
            maxWidth: 600
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                mb: 1,
                color: theme.palette.primary.main
              }}
            >
              {t('register.title')}
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              align="center"
            >
              {t('register.subtitle')}
            </Typography>
          </Box>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 3 }}
            >
              {error}
            </Alert>
          )}
          
          <Box 
            component="form" 
            onSubmit={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            sx={{ mt: 1 }}
          >
            {activeStep === 0 && (
              // Account Information
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t('register.emailLabel')}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formValues.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={t('register.passwordLabel')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formValues.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t('register.confirmPasswordLabel')}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyIcon color="primary" />
                      </InputAdornment>
                    )
                  }}
                />
              </>
            )}
            
            {activeStep === 1 && (
              // Personal Information
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="firstName"
                      label={t('register.firstNameLabel')}
                      name="firstName"
                      autoComplete="given-name"
                      value={formValues.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      label={t('register.lastNameLabel')}
                      name="lastName"
                      autoComplete="family-name"
                      value={formValues.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label={t('register.phoneLabel')}
                  name="phone"
                  autoComplete="tel"
                  value={formValues.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dateOfBirth"
                  label={t('register.dobLabel')}
                  name="dateOfBirth"
                  type="date"
                  value={formValues.dateOfBirth}
                  onChange={handleChange}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </>
            )}
            
            {activeStep === 2 && (
              // Medical Information
              <>
                <FormControl 
                  fullWidth 
                  margin="normal"
                  error={!!errors.bloodGroup}
                >
                  <InputLabel id="blood-group-label">{t('register.bloodGroupLabel')}</InputLabel>
                  <Select
                    labelId="blood-group-label"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formValues.bloodGroup}
                    label={t('register.bloodGroupLabel')}
                    onChange={handleChange}
                    startAdornment={
                      <InputAdornment position="start">
                        <MedicalIcon color="primary" />
                      </InputAdornment>
                    }
                  >
                    {bloodGroups.map((group) => (
                      <MenuItem key={group} value={group}>{group}</MenuItem>
                    ))}
                  </Select>
                  {errors.bloodGroup && (
                    <FormHelperText>{errors.bloodGroup}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  margin="normal"
                  fullWidth
                  id="medicalConditions"
                  label={t('register.medicalConditionsLabel')}
                  name="medicalConditions"
                  multiline
                  rows={3}
                  value={formValues.medicalConditions}
                  onChange={handleChange}
                  placeholder={t('register.medicalConditionsPlaceholder')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                        <MedicalIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {t('register.back')}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={activeStep === steps.length - 1 && loading ? <CircularProgress size={20} color="inherit" /> : (activeStep === steps.length - 1 ? <PersonAdd /> : null)}
                sx={{ 
                  py: 1, 
                  px: 2,
                  borderRadius: 1.5,
                  fontWeight: 600
                }}
              >
                {activeStep === steps.length - 1
                  ? (loading ? t('register.creating') : t('register.submit'))
                  : t('register.next')}
              </Button>
            </Box>
            
            {activeStep === 0 && (
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Typography variant="body2" color="textSecondary">
                    {t('register.hasAccount')}{' '}
                    <MuiLink component={Link} to="/login" variant="body2" color="primary">
                      {t('register.login')}
                    </MuiLink>
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </Box>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
