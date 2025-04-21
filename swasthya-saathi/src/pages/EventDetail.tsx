import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Event as EventIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Group as GroupIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data for events (same as in HealthEvents.tsx)
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
    type: 'awareness',
    agenda: [
      'Introduction to maternal health',
      'Nutrition during pregnancy',
      'Importance of antenatal checkups',
      'Danger signs during pregnancy',
      'Postpartum care'
    ],
    resources: [
      'Projector and screen',
      'Educational brochures',
      'Nutrition charts',
      'Blood pressure monitor',
      'Weighing scale'
    ]
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
    type: 'education',
    agenda: [
      'Introduction to menstrual hygiene',
      'Types of menstrual products',
      'Proper disposal practices',
      'Addressing myths and taboos',
      'Q&A session'
    ],
    resources: [
      'Sanitary pad samples',
      'Educational posters',
      'Informational handouts',
      'Video presentation equipment'
    ]
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
    type: 'checkup',
    agenda: [
      'Registration',
      'Blood pressure check',
      'Weight and height measurement',
      'Hemoglobin testing',
      'General physical examination',
      'Consultation with doctor'
    ],
    resources: [
      'Medical equipment',
      'Medicines',
      'Medical staff',
      'Registration forms',
      'Tents and chairs'
    ]
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
    type: 'workshop',
    agenda: [
      'Importance of nutrition',
      'Essential nutrients for pregnant women',
      'Cooking demonstration',
      'Nutritional supplements',
      'Menu planning for pregnant and lactating women'
    ],
    resources: [
      'Cooking equipment',
      'Food ingredients',
      'Nutrition charts',
      'Recipe handouts',
      'Food samples'
    ]
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
    type: 'awareness',
    agenda: [
      'Introduction to nutrition',
      'Importance of balanced diet',
      'Local food resources',
      'Cooking demonstration',
      'Distribution of nutrition charts'
    ],
    resources: [
      'Projector',
      'Educational materials',
      'Food samples',
      'Cooking utensils',
      'Handouts'
    ]
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
    type: 'medical',
    agenda: [
      'Registration',
      'Screening',
      'Vaccination',
      'Post-vaccination observation',
      'Next vaccination date reminder'
    ],
    resources: [
      'Vaccines',
      'Medical staff',
      'Ice boxes',
      'Syringes',
      'Vaccination cards',
      'First aid kit'
    ]
  }
];

const EventDetail: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('Invalid URL parameters');
      setLoading(false);
      return;
    }

    // Simulate data fetching
    setTimeout(() => {
      try {
        const eventId = parseInt(id);
        const foundEvent = mockEvents.find(e => e.id === eventId);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError('Error loading event details');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate('/events');
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
      case 'ongoing':
        return 'info';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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
          {event?.title || id}
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

      {loading ? (
        <Typography>{t('common.loading') || 'Loading...'}</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : event && (
        <>
          <Box mb={3} display="flex" alignItems="center">
            <Typography variant="h4" component="h1">
              {event.title}
            </Typography>
            <Chip 
              label={event.status} 
              color={getStatusColor(event.status) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}
              sx={{ ml: 2 }} 
            />
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('events.eventDetails') || 'Event Details'}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ '& > div': { mb: 1.5 } }}>
                    <Box display="flex" alignItems="center" mb={1.5}>
                      <CalendarIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography component="span" fontWeight="bold" mr={1}>
                        {t('events.date') || 'Date'}:
                      </Typography>
                      <Typography>
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1.5}>
                      <LocationIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography component="span" fontWeight="bold" mr={1}>
                        {t('events.location') || 'Location'}:
                      </Typography>
                      <Typography>
                        {event.location}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1.5}>
                      <PersonIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography component="span" fontWeight="bold" mr={1}>
                        {t('events.organizer') || 'Organizer'}:
                      </Typography>
                      <Typography>
                        {event.organizer}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" mb={1.5}>
                      <GroupIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                      <Typography component="span" fontWeight="bold" mr={1}>
                        {t('events.attendees') || 'Expected Attendees'}:
                      </Typography>
                      <Typography>
                        {event.attendees}
                      </Typography>
                    </Box>
                    
                    <Box mt={2}>
                      <Typography component="span" fontWeight="bold">
                        {t('events.description') || 'Description'}:
                      </Typography>
                      <Typography paragraph mt={1}>
                        {event.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('events.agenda') || 'Agenda'}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    {event.agenda.map((item: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: '32px' }}>
                          <Typography fontWeight="bold">{index + 1}.</Typography>
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('events.resources') || 'Resources Needed'}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    {event.resources.map((resource: string, index: number) => (
                      <ListItem key={index} disablePadding sx={{ pb: 0.5 }}>
                        <ListItemText primary={resource} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('events.actions') || 'Actions'}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ '& > button': { mb: 1.5, width: '100%' }}}>
                    <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                      {t('events.editEvent') || 'Edit Event'}
                    </Button>
                    
                    {event.status === 'upcoming' && (
                      <Button variant="outlined" color="success" sx={{ mb: 2 }}>
                        {t('events.markOngoing') || 'Mark as Ongoing'}
                      </Button>
                    )}
                    
                    {(event.status === 'upcoming' || event.status === 'ongoing') && (
                      <Button variant="outlined" color="info" sx={{ mb: 2 }}>
                        {t('events.markCompleted') || 'Mark as Completed'}
                      </Button>
                    )}
                    
                    {event.status !== 'cancelled' && (
                      <Button variant="outlined" color="error">
                        {t('events.cancelEvent') || 'Cancel Event'}
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default EventDetail; 