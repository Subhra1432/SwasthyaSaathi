import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
  Avatar,
  IconButton,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera as CameraIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Dummy user data for testing (when real auth is not available)
const dummyUserData = {
  displayName: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  phoneNumber: '+91 98765 43210',
  role: 'ASHA Worker',
  joinDate: '2021-05-15',
  district: 'Kamrup',
  state: 'Assam',
  address: 'Village Rajgarh, Near Community Center',
  qualifications: 'High School, ASHA Training Certificate',
  supervisorName: 'Dr. Rajesh Kumar',
  supervisorContact: '+91 87654 32109',
  photoURL: ''
};

const Profile: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const { userProfile, updateUserProfile } = useAuth();
  
  // If no user profile is available, use dummy data for development
  const userData = userProfile || dummyUserData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: userData.displayName || '',
    phoneNumber: userData.phoneNumber || '',
    address: userData.address || '',
    qualifications: userData.qualifications || '',
  });
  
  // Update form data if userProfile changes
  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        qualifications: userData.qualifications || '',
      });
    }
  }, [userData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };
  
  const handleCancel = () => {
    // Reset form data to original values
    if (userData) {
      setFormData({
        displayName: userData.displayName || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
        qualifications: userData.qualifications || '',
      });
    }
    setIsEditing(false);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.displayName || !formData.phoneNumber) {
      setError(t('profile.errors.requiredFields') || 'Name and phone number are required');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // If using real auth, update the user profile
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: formData.displayName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          qualifications: formData.qualifications,
        });
      }
      
      setSuccess(t('profile.updateSuccess') || 'Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(t('profile.errors.updateFailed') || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('profile.title')}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        {t('profile.description')}
      </Typography>
      
      {/* User Info Card */}
      <Paper elevation={2} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Box position="relative">
            <Avatar
              src={userData?.photoURL || undefined}
              alt={userData?.displayName || 'User'}
              sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
            >
              {userData?.displayName?.[0] || <PersonIcon fontSize="large" />}
            </Avatar>
            {isEditing && (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.default' }
                }}
              >
                <input hidden accept="image/*" type="file" />
                <CameraIcon />
              </IconButton>
            )}
          </Box>
          
          <Box ml={3} flex={1}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="h5" fontWeight="medium">
                {userData.displayName}
              </Typography>
              
              {!isEditing ? (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  {t('profile.edit')}
                </Button>
              ) : (
                <Box>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    sx={{ mr: 1 }}
                  >
                    {t('common.cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      t('common.save')
                    )}
                  </Button>
                </Box>
              )}
            </Box>
            
            <Typography variant="body1" color="textSecondary">
              {userData.role} • {userData.district}, {userData.state}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {userData.email}
            </Typography>
          </Box>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        {/* Profile Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('profile.name')}
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                fullWidth
                required
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label={t('profile.phone')}
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                required
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('profile.address')}
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label={t('profile.qualifications')}
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                disabled={!isEditing}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Additional Information */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('profile.accountInfo')}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {t('profile.email')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData.email}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {t('profile.memberSince')}
                </Typography>
                <Typography variant="body1">
                  {userData.joinDate || 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('profile.supervisor')}
              </Typography>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {t('profile.supervisorName')}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {userData.supervisorName || 'N/A'}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {t('profile.supervisorContact')}
                </Typography>
                <Typography variant="body1">
                  {userData.supervisorContact || 'N/A'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 