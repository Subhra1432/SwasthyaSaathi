import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button,
  Breadcrumbs,
  Link,
  Divider,
  Card,
  CardContent,
  Chip,
  Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Inventory as InventoryIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Policy as PolicyIcon
} from '@mui/icons-material';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data mapping
const mockDataMap: Record<string, Record<string, any>> = {
  inventory: {
    '12': {
      id: '12',
      name: 'Sanitary Pads',
      category: 'Hygiene',
      quantity: 150,
      unit: 'packets',
      addedBy: 'Sunita Devi',
      addedOn: '2023-05-15',
      description: 'Regular size sanitary pads for menstrual hygiene',
      reorderLevel: 50,
      expiryDate: '2026-05-15'
    },
    '8': {
      id: '8',
      name: 'Iron Tablets',
      category: 'Nutrition',
      quantity: 300,
      unit: 'tablets',
      addedBy: 'Anjali Sharma',
      addedOn: '2023-04-10',
      description: 'Iron supplements for pregnant women',
      reorderLevel: 100,
      expiryDate: '2025-02-10'
    }
  },
  events: {
    '1': {
      id: '1',
      title: 'Awareness Camp',
      date: '2025-05-15',
      location: 'Village Community Hall',
      organizer: 'Pratima Singh',
      attendees: 35,
      status: 'upcoming',
      description: 'Health awareness camp focusing on maternal health'
    },
    '2': {
      id: '2',
      title: 'Educational Session',
      date: '2023-04-22',
      location: 'Primary School',
      organizer: 'Geeta Kumari',
      attendees: 28,
      status: 'completed',
      description: 'Educational session about menstrual hygiene for teenage girls'
    },
    '3': {
      id: '3',
      title: 'Health Checkup Camp',
      date: '2025-05-23',
      location: 'Primary Health Center',
      organizer: 'Dr. Rekha Singh',
      attendees: 42,
      status: 'upcoming',
      description: 'General health checkup camp for women and children'
    },
    '5': {
      id: '5',
      title: 'Health Awareness Event',
      date: '2023-05-23',
      location: 'Community Center',
      organizer: 'Sunita Devi',
      attendees: 0,
      status: 'upcoming',
      description: 'Health awareness event about nutrition during pregnancy'
    }
  },
  finance: {
    'reports/1': {
      id: '1',
      title: 'Quarterly Financial Summary',
      date: '2023-03-31',
      prepared: 'Geeta Kumari',
      totalIncome: 25000,
      totalExpense: 18500,
      balance: 6500,
      description: 'Summary of financial activities for Q1 2023'
    },
    'reports/2': {
      id: '2',
      title: 'Monthly Financial Report',
      date: '2023-04-30',
      prepared: 'Geeta Kumari',
      totalIncome: 8200,
      totalExpense: 6100,
      balance: 2100,
      description: 'Financial report for April 2023'
    }
  },
  schemes: {
    '8': {
      id: '8',
      name: 'Maternal Health Scheme',
      launchedBy: 'Ministry of Health',
      launchDate: '2023-04-28',
      eligibility: 'Pregnant women from rural areas',
      benefits: 'Free health checkups, nutrition supplements, and financial aid',
      applicationProcess: 'Apply through local health center with required documents',
      documents: ['Aadhaar Card', 'Bank Account', 'Pregnancy Certificate']
    }
  }
};

const ItemDetail: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!type || !id) {
      setError('Invalid URL parameters');
      setLoading(false);
      return;
    }

    // Simulate data fetching
    setTimeout(() => {
      try {
        // Check if the type and ID are valid
        if (mockDataMap[type] && mockDataMap[type][id]) {
          setItem(mockDataMap[type][id]);
        } else {
          setError('Item not found');
        }
      } catch (err) {
        setError('Error loading item details');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [type, id]);

  const getTypeLabel = () => {
    switch (type) {
      case 'inventory':
        return t('inventory.title') || 'Inventory';
      case 'events':
        return t('events.title') || 'Events';
      case 'finance':
        return t('finance.title') || 'Finance';
      case 'schemes':
        return t('schemes.title') || 'Schemes';
      default:
        return 'Details';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'inventory':
        return <InventoryIcon />;
      case 'events':
        return <EventIcon />;
      case 'finance':
        return <MoneyIcon />;
      case 'schemes':
        return <PolicyIcon />;
      default:
        return null;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'inventory':
        return 'primary';
      case 'events':
        return 'secondary';
      case 'finance':
        return 'success';
      case 'schemes':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleBack = () => {
    if (type) {
      navigate(`/${type}`);
    } else {
      navigate('/dashboard');
    }
  };

  const renderItemDetails = () => {
    if (!item) return null;

    switch (type) {
      case 'inventory':
        return (
          <>
            <Box mb={3} display="flex" alignItems="center">
              <Typography variant="h4" component="h1">
                {item.name}
              </Typography>
              <Chip 
                label={item.category} 
                color={getTypeColor() as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"} 
                sx={{ ml: 2 }} 
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('inventory.itemDetails') || 'Item Details'}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ '& > div': { mb: 1.5 } }}>
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('inventory.quantity') || 'Quantity'}:
                        </Typography>{' '}
                        {item.quantity} {item.unit}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('inventory.reorderLevel') || 'Reorder Level'}:
                        </Typography>{' '}
                        {item.reorderLevel} {item.unit}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('inventory.expiryDate') || 'Expiry Date'}:
                        </Typography>{' '}
                        {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('common.description') || 'Description'}:
                        </Typography>{' '}
                        {item.description}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('inventory.addedInfo') || 'Added Info'}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ '& > div': { mb: 1.5 } }}>
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('inventory.addedBy') || 'Added By'}:
                        </Typography>{' '}
                        {item.addedBy}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('inventory.addedOn') || 'Added On'}:
                        </Typography>{' '}
                        {new Date(item.addedOn).toLocaleDateString()}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        );
      
      case 'events':
        return (
          <>
            <Box mb={3} display="flex" alignItems="center">
              <Typography variant="h4" component="h1">
                {item.title}
              </Typography>
              <Chip 
                label={item.status} 
                color={item.status === 'upcoming' ? 'warning' : (item.status === 'completed' ? 'success' : 'default')}
                sx={{ ml: 2 }} 
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {t('events.eventDetails') || 'Event Details'}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ '& > div': { mb: 1.5 } }}>
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('events.date') || 'Date'}:
                        </Typography>{' '}
                        {new Date(item.date).toLocaleDateString()}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('events.location') || 'Location'}:
                        </Typography>{' '}
                        {item.location}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('events.organizer') || 'Organizer'}:
                        </Typography>{' '}
                        {item.organizer}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('events.attendees') || 'Expected Attendees'}:
                        </Typography>{' '}
                        {item.attendees}
                      </Box>
                      
                      <Box>
                        <Typography component="span" fontWeight="bold">
                          {t('common.description') || 'Description'}:
                        </Typography>{' '}
                        {item.description}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </>
        );
      
      // Add other cases for finance and schemes
      
      default:
        return (
          <Typography>
            {t('common.detailsNotAvailable') || 'Details are not available for this item type.'}
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/dashboard" underline="hover" color="inherit">
          {t('navigation.dashboard') || 'Dashboard'}
        </Link>
        <Link component={RouterLink} to={`/${type}`} underline="hover" color="inherit">
          {getTypeLabel()}
        </Link>
        <Typography color="text.primary">
          {item?.name || item?.title || id}
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
      ) : (
        renderItemDetails()
      )}
    </Box>
  );
};

export default ItemDetail; 