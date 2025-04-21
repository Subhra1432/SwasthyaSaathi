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
  IconButton,
  Divider 
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Member type
interface MemberData {
  name: string;
  phone: string;
  role: string;
  skills: string[];
  joinDate: string;
  address?: string;
  email?: string;
  notes?: string;
}

const MemberAdd: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  
  // Initial form state
  const [memberData, setMemberData] = useState<MemberData>({
    name: '',
    phone: '',
    role: 'general_member',
    skills: [''],
    joinDate: new Date().toISOString().split('T')[0],
    address: '',
    email: '',
    notes: ''
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleBack = () => {
    navigate('/members');
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemberData(prev => ({
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
    setMemberData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle skill item changes
  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...memberData.skills];
    newSkills[index] = value;
    
    setMemberData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };
  
  // Add new skill item
  const handleAddSkillItem = () => {
    setMemberData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };
  
  // Remove skill item
  const handleRemoveSkillItem = (index: number) => {
    if (memberData.skills.length > 1) {
      const newSkills = [...memberData.skills];
      newSkills.splice(index, 1);
      
      setMemberData(prev => ({
        ...prev,
        skills: newSkills
      }));
    }
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!memberData.name.trim()) {
      newErrors.name = t('validation.required') || 'Name is required';
    }
    
    if (!memberData.phone.trim()) {
      newErrors.phone = t('validation.required') || 'Phone number is required';
    } else if (!/^\d{10}$/.test(memberData.phone.trim())) {
      newErrors.phone = t('validation.phoneFormat') || 'Phone number must be 10 digits';
    }
    
    if (!memberData.role) {
      newErrors.role = t('validation.required') || 'Role is required';
    }
    
    if (!memberData.joinDate) {
      newErrors.joinDate = t('validation.required') || 'Join date is required';
    }
    
    // Check if skill items are filled
    const emptySkillIndex = memberData.skills.findIndex(item => !item.trim());
    if (emptySkillIndex !== -1) {
      newErrors[`skill-${emptySkillIndex}`] = t('validation.required') || 'Skill item is required';
    }
    
    if (memberData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberData.email)) {
      newErrors.email = t('validation.emailFormat') || 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the data to an API
      console.log('Member data:', memberData);
      
      // Navigate back to members page
      navigate('/members', { state: { success: true, message: 'Member added successfully' } });
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
          <Link to="/members" style={{ textDecoration: 'none', color: 'inherit' }}>
            {t('members.title')}
          </Link>
          <Typography color="textPrimary">{t('members.addMember')}</Typography>
        </Breadcrumbs>
      </Box>
      
      {/* Page title */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          {t('members.addMember')}
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
                {t('members.basicInfo') || 'Basic Information'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('members.name')}
                name="name"
                value={memberData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('common.phoneNumber')}
                name="phone"
                value={memberData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required error={!!errors.role}>
                <InputLabel>{t('members.role')}</InputLabel>
                <Select
                  name="role"
                  value={memberData.role}
                  label={t('members.role')}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="leader">{t('members.roles.leader')}</MenuItem>
                  <MenuItem value="health_educator">{t('members.roles.healthEducator')}</MenuItem>
                  <MenuItem value="supply_handler">{t('members.roles.supplyHandler')}</MenuItem>
                  <MenuItem value="finance_manager">{t('members.roles.financeManager')}</MenuItem>
                  <MenuItem value="general_member">{t('members.roles.generalMember')}</MenuItem>
                </Select>
                {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label={t('members.joinedDate')}
                name="joinDate"
                type="date"
                value={memberData.joinDate}
                onChange={handleChange}
                error={!!errors.joinDate}
                helperText={errors.joinDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            {/* Additional Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('members.additionalInfo') || 'Additional Information'}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('common.email')}
                name="email"
                type="email"
                value={memberData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={t('common.address')}
                name="address"
                value={memberData.address}
                onChange={handleChange}
              />
            </Grid>
            
            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t('members.skills')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>
            
            {memberData.skills.map((skill, index) => (
              <Grid item xs={12} key={index} container spacing={1} alignItems="center">
                <Grid item xs>
                  <TextField
                    fullWidth
                    label={`${t('members.skill') || 'Skill'} ${index + 1}`}
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    error={!!errors[`skill-${index}`]}
                    helperText={errors[`skill-${index}`]}
                  />
                </Grid>
                <Grid item>
                  <IconButton 
                    onClick={() => handleRemoveSkillItem(index)}
                    disabled={memberData.skills.length <= 1}
                    color="error"
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddSkillItem}
                variant="outlined"
              >
                {t('common.add')} {t('members.skill')}
              </Button>
            </Grid>
            
            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label={t('common.notes')}
                name="notes"
                value={memberData.notes}
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

export default MemberAdd; 