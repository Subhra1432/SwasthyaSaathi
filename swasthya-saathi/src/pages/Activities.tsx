import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Chip
} from '@mui/material';
import { 
  Search as SearchIcon,
  Notifications as NotificationIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Policy as PolicyIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data for activities
const mockActivities = [
  { id: 1, text: 'Sunita added 20 new sanitary pad packets to inventory', time: '2 hours ago', path: '/inventory/12', type: 'inventory' },
  { id: 2, text: 'Health awareness event scheduled for next Tuesday', time: '5 hours ago', path: '/events/5', type: 'event' },
  { id: 3, text: 'Monthly financial report was generated', time: '1 day ago', path: '/finance/reports/2', type: 'finance' },
  { id: 4, text: 'New government scheme for maternal health added', time: '2 days ago', path: '/schemes/8', type: 'scheme' },
  { id: 5, text: 'Anjali updated inventory count for iron tablets', time: '3 days ago', path: '/inventory/8', type: 'inventory' },
  { id: 6, text: 'Health checkup camp attendance recorded', time: '4 days ago', path: '/events/3', type: 'event' },
  { id: 7, text: 'Quarterly financial summary submitted', time: '5 days ago', path: '/finance/reports/1', type: 'finance' },
  { id: 8, text: 'Educational session on menstrual hygiene conducted', time: '1 week ago', path: '/events/2', type: 'event' }
];

const Activities: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activities] = useState(mockActivities);

  const filteredActivities = activities.filter(activity => 
    activity.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleActivityClick = (path: string) => {
    navigate(path);
  };

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'inventory':
        return <InventoryIcon />;
      case 'event':
        return <EventIcon />;
      case 'finance':
        return <MoneyIcon />;
      case 'scheme':
        return <PolicyIcon />;
      default:
        return <NotificationIcon />;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'inventory':
        return 'primary.main';
      case 'event':
        return 'secondary.main';
      case 'finance':
        return 'success.main';
      case 'scheme':
        return 'warning.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" gutterBottom>
          {t('activities.title') || 'Recent Activities'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {t('activities.subtitle') || 'Track all recent actions across the application'}
        </Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <List sx={{ width: '100%' }}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <React.Fragment key={activity.id}>
                <ListItem 
                  alignItems="flex-start"
                  button
                  onClick={() => handleActivityClick(activity.path)}
                  sx={{
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: getActivityColor(activity.type) }}>
                      {getActivityIcon(activity.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Typography component="span" variant="subtitle1">
                          {activity.text}
                        </Typography>
                        <Chip 
                          label={activity.type} 
                          size="small" 
                          sx={{ ml: 1 }} 
                          color="default"
                        />
                      </Box>
                    }
                    secondary={activity.time}
                  />
                </ListItem>
                {index < filteredActivities.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText 
                primary={t('common.noData')} 
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default Activities; 