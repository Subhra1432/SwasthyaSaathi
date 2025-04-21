import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import { 
  Search as SearchIcon,
  Event as EventIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  ArrowForward as ArrowIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data for events
const mockEvents = [
  { 
    id: 1, 
    title: 'Awareness Camp', 
    date: '2025-05-15', 
    location: 'Village Community Hall', 
    organizer: 'Pratima Singh', 
    attendees: 35, 
    status: 'upcoming', 
    description: 'Health awareness camp focusing on maternal health',
    type: 'awareness'
  },
  { 
    id: 2, 
    title: 'Educational Session', 
    date: '2023-04-22', 
    location: 'Primary School', 
    organizer: 'Geeta Kumari', 
    attendees: 28, 
    status: 'completed', 
    description: 'Educational session about menstrual hygiene for teenage girls',
    type: 'education'
  },
  { 
    id: 3, 
    title: 'Health Checkup Camp', 
    date: '2025-05-23', 
    location: 'Primary Health Center', 
    organizer: 'Dr. Rekha Singh', 
    attendees: 42, 
    status: 'upcoming', 
    description: 'General health checkup camp for women and children',
    type: 'checkup'
  },
  { 
    id: 4, 
    title: 'Nutrition Workshop', 
    date: '2025-06-10', 
    location: 'Community Center', 
    organizer: 'Anjali Sharma', 
    attendees: 25, 
    status: 'upcoming', 
    description: 'Workshop on nutritional needs during pregnancy and lactation',
    type: 'workshop'
  },
  { 
    id: 5, 
    title: 'Health Awareness Event', 
    date: '2025-05-23', 
    location: 'Community Center', 
    organizer: 'Sunita Devi', 
    attendees: 30, 
    status: 'upcoming', 
    description: 'Health awareness event about nutrition during pregnancy',
    type: 'awareness'
  },
  { 
    id: 6, 
    title: 'Vaccination Drive', 
    date: '2025-04-15', 
    location: 'Primary Health Center', 
    organizer: 'Dr. Arun Kumar', 
    attendees: 75, 
    status: 'upcoming', 
    description: 'Vaccination drive for children under 5 years',
    type: 'medical'
  }
];

const HealthEvents: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [events] = useState(mockEvents);

  // Filter events based on search term and tab value
  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = 
      (tabValue === 0) || // All events
      (tabValue === 1 && event.status === 'upcoming') || // Upcoming events
      (tabValue === 2 && event.status === 'completed'); // Past events
    
    return matchesSearch && matchesTab;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEventClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  const handleAddEvent = () => {
    navigate('/events/add');
  };

  // Format date string to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color based on event status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'warning';
      case 'completed':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" gutterBottom>
            {t('events.title') || 'Health Events'}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {t('events.subtitle') || 'Manage and track health events in your community'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEvent}
        >
          {t('events.addNew') || 'New Event'}
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <TextField
            variant="outlined"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '60%' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label={t('events.allEvents') || 'All'} />
            <Tab label={t('events.upcoming') || 'Upcoming'} />
            <Tab label={t('events.past') || 'Past'} />
          </Tabs>
        </Box>
        
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={3}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {event.title}
                      </Typography>
                      <Chip 
                        label={event.status} 
                        size="small" 
                        color={getStatusColor(event.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
                      />
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <CalendarIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1}>
                      <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {event.location}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={2}>
                      <GroupIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {event.attendees} {t('events.attendees') || 'Attendees'}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary">
                      {event.description}
                    </Typography>
                  </CardContent>
                  
                  <Divider />
                  
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary" 
                      endIcon={<ArrowIcon />}
                      onClick={() => handleEventClick(event.id)}
                    >
                      {t('events.details') || 'View Details'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" color="textSecondary">
                {t('common.noData') || 'No events found'}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default HealthEvents; 