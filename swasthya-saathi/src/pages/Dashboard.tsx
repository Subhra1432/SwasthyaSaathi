import React, { useState } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardHeader, 
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme
} from '@mui/material';
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Event as EventIcon,
  Notifications as NotificationIcon,
  ArrowForward as ArrowIcon,
  AddCircleOutline as AddIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  // State for notifications and dialogs
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'info' | 'warning' | 'error' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number, title: string, path: string } | null>(null);
  
  // Mock data for demonstration
  const stats = [
    { id: 1, title: 'Total Members', value: '12', icon: <PeopleIcon color="primary" fontSize="large" />, color: '#e3f2fd', path: '/members' },
    { id: 2, title: 'Monthly Balance', value: '₹ 5,600', icon: <MoneyIcon color="primary" fontSize="large" />, color: '#e8f5e9', path: '/finance' },
    { id: 3, title: 'Inventory Items', value: '45', icon: <InventoryIcon color="primary" fontSize="large" />, color: '#fff8e1', path: '/inventory' },
    { id: 4, title: 'Upcoming Events', value: '3', icon: <EventIcon color="primary" fontSize="large" />, color: '#ffebee', path: '/events' }
  ];
  
  const recentActivities = [
    { id: 1, text: 'Sunita added 20 new sanitary pad packets to inventory', time: '2 hours ago', path: '/inventory/12' },
    { id: 2, text: 'Health awareness event scheduled for next Tuesday', time: '5 hours ago', path: '/events/5' },
    { id: 3, text: 'Monthly financial report was generated', time: '1 day ago', path: '/finance/reports/2' },
    { id: 4, text: 'New government scheme for maternal health added', time: '2 days ago', path: '/schemes/8' }
  ];
  
  const upcomingEvents = [
    { id: 1, title: 'Awareness Camp', date: '15 May 2025', location: 'Village Community Hall', path: '/events/1' },
    { id: 2, title: 'Monthly Meeting', date: '18 May 2025', location: 'SHG Center', path: '/events/2' },
    { id: 3, title: 'Health Checkup Camp', date: '23 May 2025', location: 'Primary Health Center', path: '/events/3' }
  ];
  
  const quickLinks = [
    { id: 1, title: 'Add New Member', path: '/members/add', color: '#bbdefb', icon: <PeopleIcon /> },
    { id: 2, title: 'Record Transaction', path: '/finance/add', color: '#c8e6c9', icon: <MoneyIcon /> },
    { id: 3, title: 'Update Inventory', path: '/inventory/add', color: '#ffecb3', icon: <InventoryIcon /> },
    { id: 4, title: 'Schedule Event', path: '/events/add', color: '#ffcdd2', icon: <EventIcon /> }
  ];

  // Navigate function for all clickable items
  const handleNavigate = (path: string) => {
    if (path) {
      navigate(path);
    }
  };
  
  // Handle quick link clicks with confirmation dialog
  const handleQuickLinkClick = (item: { id: number, title: string, path: string }) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  
  // Handle stats card clicks
  const handleStatClick = (path: string) => {
    handleNavigate(path);
    showSnackbar(`Navigating to ${path}`, 'info');
  };
  
  // Handle activity item clicks
  const handleActivityClick = (path: string) => {
    handleNavigate(path);
  };
  
  // Handle event item clicks
  const handleEventClick = (path: string) => {
    handleNavigate(path);
  };
  
  // Show snackbar notification
  const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Handle dialog confirmation
  const handleDialogConfirm = () => {
    setDialogOpen(false);
    if (selectedItem) {
      handleNavigate(selectedItem.path);
      showSnackbar(`Starting ${selectedItem.title.toLowerCase()}`, 'success');
    }
  };
  
  // Handle dialog cancel
  const handleDialogCancel = () => {
    setDialogOpen(false);
  };
  
  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('dashboard.title')}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {t('dashboard.welcome')}
        </Typography>
      </Box>
      
      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid key={stat.id} item xs={12} sm={6} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                background: stat.color,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => handleStatClick(stat.path)}
            >
              <Box display="flex" alignItems="center">
                <Box p={1}>{stat.icon}</Box>
                <Box ml={2}>
                  <Typography variant="h5" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Quick Links */}
      <Typography variant="h6" gutterBottom>
        {t('dashboard.quickActions')}
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickLinks.map((link) => (
          <Grid key={link.id} item xs={6} sm={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                background: link.color,
                borderRadius: 2,
                height: '100%',
                transition: 'transform 0.2s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => handleQuickLinkClick(link)}
            >
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                <Box display="flex" alignItems="center" mb={1}>
                  {link.icon}
                  <Typography variant="body1" fontWeight="medium" ml={1}>
                    {link.title}
                  </Typography>
                </Box>
                <Button 
                  size="small"
                  variant="contained" 
                  color="primary"
                  endIcon={<AddIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickLinkClick(link);
                  }}
                >
                  {t('common.add')}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Content Section */}
      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardHeader
              title={t('dashboard.recentActivities')}
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowIcon />}
                  component={Link}
                  to="/activities"
                >
                  {t('common.viewAll') || 'View All'}
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentActivities.map((activity) => (
                  <ListItem
                    key={activity.id}
                    button
                    divider
                    onClick={() => handleActivityClick(activity.path)}
                  >
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card elevation={1}>
            <CardHeader
              title={t('dashboard.upcomingEvents')}
              titleTypographyProps={{ variant: 'h6' }}
              action={
                <Button
                  variant="text"
                  color="primary"
                  endIcon={<ArrowIcon />}
                  component={Link}
                  to="/events"
                >
                  {t('common.viewAll') || 'View All'}
                </Button>
              }
            />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {upcomingEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    button
                    divider
                    onClick={() => handleEventClick(event.path)}
                  >
                    <ListItemIcon>
                      <EventIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`${event.date} • ${event.location}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogCancel}
        aria-labelledby="action-dialog-title"
        aria-describedby="action-dialog-description"
      >
        <DialogTitle id="action-dialog-title">
          {selectedItem ? selectedItem.title : ''}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="action-dialog-description">
            {selectedItem ? `Are you ready to ${selectedItem.title.toLowerCase()}?` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel} color="inherit">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" variant="contained" autoFocus>
            {t('common.continue')}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 