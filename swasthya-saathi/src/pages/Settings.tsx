import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Avatar,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import {
  Language as LanguageIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  WifiOff as WifiOffIcon,
  Sync as SyncIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Edit as EditIcon,
  CameraAlt as CameraIcon,
} from '@mui/icons-material';

// Mock user profile data
const mockUserProfile = {
  name: 'Priya Sharma',
  role: 'ASHA Worker',
  district: 'Kamrup',
  state: 'Assam',
  phone: '+91 98765 43210',
  email: 'priya.sharma@example.com',
  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  joinDate: '2021-05-15',
};

// Mock settings data
const mockSettings = {
  language: 'en-US',
  notifications: {
    events: true,
    reminders: true,
    updates: false,
    messages: true,
  },
  theme: 'light',
  offlineMode: false,
  autoSync: true,
  syncInterval: 60, // in minutes
  lastSync: '2023-06-15T10:30:25',
};

const Settings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState(mockSettings);
  const [profileData, setProfileData] = useState(mockUserProfile);

  // Handle language change
  const handleLanguageChange = (event: SelectChangeEvent) => {
    const newLang = event.target.value;
    setSettings({
      ...settings,
      language: newLang,
    });
    i18n.changeLanguage(newLang);
  };

  // Handle toggle switches
  const handleToggle = (setting: string, subsetting?: string) => () => {
    if (subsetting) {
      setSettings((prevSettings) => {
        const settingObj = prevSettings[setting as keyof typeof prevSettings] as Record<string, boolean>;
        return {
          ...prevSettings,
          [setting]: {
            ...settingObj,
            [subsetting]: !settingObj[subsetting],
          },
        };
      });
    } else {
      setSettings((prevSettings) => ({
        ...prevSettings,
        [setting]: !prevSettings[setting as keyof typeof prevSettings],
      }));
    }
  };

  // Handle sync interval change
  const handleSyncIntervalChange = (event: SelectChangeEvent<number>) => {
    setSettings({
      ...settings,
      syncInterval: Number(event.target.value),
    });
  };

  // Handle theme change
  const handleThemeChange = (event: SelectChangeEvent) => {
    setSettings({
      ...settings,
      theme: event.target.value,
    });
  };

  // Format last sync time
  const formatLastSync = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Trigger manual sync
  const handleManualSync = () => {
    // In a real app, this would trigger a sync operation
    setSettings({
      ...settings,
      lastSync: new Date().toISOString(),
    });
  };

  // Available languages
  const languages = [
    { code: 'en-US', name: 'English' },
    { code: 'hin-IN', name: 'Hindi' },
    { code: 'asm-IN', name: 'Assamese' },
    { code: 'man-IN', name: 'Manipuri' },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title')}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        {t('settings.description')}
      </Typography>

      {/* Profile Summary */}
      <Paper elevation={2} sx={{ mb: 4, p: 3 }}>
        <Box display="flex" alignItems="center">
          <Box position="relative">
            <Avatar
              src={profileData.avatar}
              alt={profileData.name}
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              size="small"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              <CameraIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box ml={3} flex={1}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">{profileData.name}</Typography>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                size="small"
                href="/profile"
              >
                {t('settings.profile')}
              </Button>
            </Box>
            <Typography variant="body2" color="textSecondary">
              {profileData.role} • {profileData.district}, {profileData.state}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {profileData.phone} • {profileData.email}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          {/* Language Settings */}
          <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <LanguageIcon color="primary" sx={{ mr: 1 }} />
                {t('settings.language')}
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <FormControl fullWidth margin="normal">
              <InputLabel id="language-select-label">
                {t('settings.language')}
              </InputLabel>
              <Select
                labelId="language-select-label"
                value={settings.language}
                onChange={handleLanguageChange}
                label={t('settings.language')}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>

          {/* Notifications */}
          <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                {t('settings.notifications')}
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              <ListItem>
                <ListItemText primary="Events" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.events}
                    onChange={handleToggle('notifications', 'events')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Reminders" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.reminders}
                    onChange={handleToggle('notifications', 'reminders')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="App Updates" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.updates}
                    onChange={handleToggle('notifications', 'updates')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Messages" />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.messages}
                    onChange={handleToggle('notifications', 'messages')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          {/* Theme & Appearance */}
          <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <PaletteIcon color="primary" sx={{ mr: 1 }} />
                {t('settings.appearance')}
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <FormControl fullWidth margin="normal">
              <InputLabel id="theme-select-label">
                {t('settings.theme')}
              </InputLabel>
              <Select
                labelId="theme-select-label"
                value={settings.theme}
                onChange={handleThemeChange}
                label={t('settings.theme')}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="system">System Default</MenuItem>
              </Select>
            </FormControl>
          </Paper>

          {/* Data Sync */}
          <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <SyncIcon color="primary" sx={{ mr: 1 }} />
                {t('settings.dataSync')}
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              <ListItem>
                <ListItemText 
                  primary={t('settings.autoSync')}
                  secondary="Automatically sync data when online"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.autoSync}
                    onChange={handleToggle('autoSync')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              {settings.autoSync && (
                <ListItem>
                  <ListItemText primary={t('settings.syncInterval')} />
                  <ListItemSecondaryAction>
                    <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={settings.syncInterval}
                        onChange={handleSyncIntervalChange}
                      >
                        <MenuItem value={15}>15 min</MenuItem>
                        <MenuItem value={30}>30 min</MenuItem>
                        <MenuItem value={60}>1 hour</MenuItem>
                        <MenuItem value={360}>6 hours</MenuItem>
                        <MenuItem value={720}>12 hours</MenuItem>
                      </Select>
                    </FormControl>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              <ListItem>
                <ListItemText 
                  primary={t('settings.lastSync')}
                  secondary={formatLastSync(settings.lastSync)}
                />
                <ListItemSecondaryAction>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={handleManualSync}
                    startIcon={<SyncIcon />}
                  >
                    {t('settings.syncNow')}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          {/* Offline Mode */}
          <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              <Box display="flex" alignItems="center">
                <WifiOffIcon color="primary" sx={{ mr: 1 }} />
                {t('settings.offlineMode')}
              </Box>
            </Typography>
            <Divider sx={{ my: 1 }} />
            <ListItem>
              <ListItemText 
                primary={t('settings.enableOffline')}
                secondary={t('settings.offlineDescription')}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.offlineMode}
                  onChange={handleToggle('offlineMode')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
