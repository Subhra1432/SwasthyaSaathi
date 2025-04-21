import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon,
  Event as EventIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Event type definition
interface EventType {
  title: string;
  date: string;
  location: string;
  organizer: string;
  attendees: string;
  status: string;
  description: string;
  type: string;
  agenda: string[];
  resources: string[];
}

const EventAdd: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  
  // Initial form state
  const [eventData, setEventData] = useState<EventType>({
    title: '',
    date: '',
    location: '',
    organizer: '',
    attendees: '',
    status: 'upcoming',
    description: '',
    type: 'awareness',
    agenda: [''],
    resources: ['']
  });
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleBack = () => {
    navigate('/events');
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData(prev => ({
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
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle agenda item changes
  const handleAgendaChange = (index: number, value: string) => {
    const newAgenda = [...eventData.agenda];
    newAgenda[index] = value;
    
    setEventData(prev => ({
      ...prev,
      agenda: newAgenda
    }));
  };
  
  // Add new agenda item
  const handleAddAgendaItem = () => {
    setEventData(prev => ({
      ...prev,
      agenda: [...prev.agenda, '']
    }));
  };
  
  // Remove agenda item
  const handleRemoveAgendaItem = (index: number) => {
    if (eventData.agenda.length <= 1) return;
    
    const newAgenda = [...eventData.agenda];
    newAgenda.splice(index, 1);
    
    setEventData(prev => ({
      ...prev,
      agenda: newAgenda
    }));
  };
  
  // Handle resource item changes
  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...eventData.resources];
    newResources[index] = value;
    
    setEventData(prev => ({
      ...prev,
      resources: newResources
    }));
  };
  
  // Add new resource item
  const handleAddResourceItem = () => {
    setEventData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };
  
  // Remove resource item
  const handleRemoveResourceItem = (index: number) => {
    if (eventData.resources.length <= 1) return;
    
    const newResources = [...eventData.resources];
    newResources.splice(index, 1);
    
    setEventData(prev => ({
      ...prev,
      resources: newResources
    }));
  };
  
  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!eventData.title.trim()) {
      newErrors.title = t('validation.required') || 'Title is required';
    }
    
    if (!eventData.date.trim()) {
      newErrors.date = t('validation.required') || 'Date is required';
    }
    
    if (!eventData.location.trim()) {
      newErrors.location = t('validation.required') || 'Location is required';
    }
    
    if (!eventData.organizer.trim()) {
      newErrors.organizer = t('validation.required') || 'Organizer is required';
    }
    
    // Check if agenda items are filled
    const emptyAgendaIndex = eventData.agenda.findIndex(item => !item.trim());
    if (emptyAgendaIndex !== -1) {
      newErrors[`agenda-${emptyAgendaIndex}`] = t('validation.required') || 'Agenda item is required';
    }
    
    // Check if resource items are filled
    const emptyResourceIndex = eventData.resources.findIndex(item => !item.trim());
    if (emptyResourceIndex !== -1) {
      newErrors[`resource-${emptyResourceIndex}`] = t('validation.required') || 'Resource item is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the data to an API
      console.log('Event data:', eventData);
      
      // Navigate back to events page
      navigate('/events', { state: { success: true } });
    }
  };
  
  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit">
          {t('navigation.dashboard') || 'Dashboard'}
        </Link>
        <Link component={RouterLink} to="/events" underline="hover" color="inherit">
          {t('events.title') || 'Health Events'}
        </Link>
        <Typography color="text.primary">
          {t('events.addEvent') || 'Add Event'}
        </Typography>
      </Breadcrumbs>

      <Button 
        startIcon={<ArrowBackIcon />} 
        variant="outlined" 
        onClick={handleBack}
        sx={{ mb: 3 }}
      >
        {t('common.back') || 'Back'}
      </Button>
      
      <Typography variant="h4" component="h1" gutterBottom>
        {t('events.addEvent') || 'Add New Event'}
      </Typography>
      
      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {t('events.basicInfo') || 'Basic Information'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('events.title') || 'Event Title'}
              name="title"
              value={eventData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('events.date') || 'Event Date'}
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('events.location') || 'Location'}
              name="location"
              value={eventData.location}
              onChange={handleChange}
              error={!!errors.location}
              helperText={errors.location}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('events.organizer') || 'Organizer'}
              name="organizer"
              value={eventData.organizer}
              onChange={handleChange}
              error={!!errors.organizer}
              helperText={errors.organizer}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('events.attendees') || 'Expected Attendees'}
              name="attendees"
              type="number"
              value={eventData.attendees}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="event-type-label">{t('events.type') || 'Event Type'}</InputLabel>
              <Select
                labelId="event-type-label"
                name="type"
                value={eventData.type}
                onChange={handleSelectChange}
                label={t('events.type') || 'Event Type'}
              >
                <MenuItem value="awareness">{t('events.types.awareness') || 'Awareness'}</MenuItem>
                <MenuItem value="education">{t('events.types.education') || 'Education'}</MenuItem>
                <MenuItem value="checkup">{t('events.types.checkup') || 'Health Checkup'}</MenuItem>
                <MenuItem value="workshop">{t('events.types.workshop') || 'Workshop'}</MenuItem>
                <MenuItem value="medical">{t('events.types.medical') || 'Medical'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('events.description') || 'Description'}
              name="description"
              value={eventData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12} mt={2}>
            <Typography variant="h6" gutterBottom>
              {t('events.agenda') || 'Agenda'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          {eventData.agenda.map((item, index) => (
            <Grid item xs={12} key={`agenda-${index}`} display="flex" alignItems="center">
              <TextField
                fullWidth
                label={`${t('events.agendaItem') || 'Agenda Item'} ${index + 1}`}
                value={item}
                onChange={(e) => handleAgendaChange(index, e.target.value)}
                error={!!errors[`agenda-${index}`]}
                helperText={errors[`agenda-${index}`]}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveAgendaItem(index)}
                disabled={eventData.agenda.length <= 1}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddAgendaItem}
              variant="outlined"
            >
              {t('events.addAgendaItem') || 'Add Agenda Item'}
            </Button>
          </Grid>
          
          <Grid item xs={12} mt={2}>
            <Typography variant="h6" gutterBottom>
              {t('events.resources') || 'Resources Needed'}
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>
          
          {eventData.resources.map((item, index) => (
            <Grid item xs={12} key={`resource-${index}`} display="flex" alignItems="center">
              <TextField
                fullWidth
                label={`${t('events.resourceItem') || 'Resource'} ${index + 1}`}
                value={item}
                onChange={(e) => handleResourceChange(index, e.target.value)}
                error={!!errors[`resource-${index}`]}
                helperText={errors[`resource-${index}`]}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveResourceItem(index)}
                disabled={eventData.resources.length <= 1}
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Button
              startIcon={<AddIcon />}
              onClick={handleAddResourceItem}
              variant="outlined"
            >
              {t('events.addResourceItem') || 'Add Resource'}
            </Button>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              {t('common.cancel') || 'Cancel'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<EventIcon />}
            >
              {t('events.createEvent') || 'Create Event'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EventAdd; 