import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConstructionIcon from '@mui/icons-material/Construction';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type ComingSoonPageProps = {
  title: string;
  icon: React.ReactNode;
  description?: string;
  features?: { [key: string]: string };
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, icon, description, features }) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3, maxWidth: '100%' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          borderRadius: 2,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          border: '1px solid #dee2e6',
          textAlign: 'center'
        }}
      >
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          {icon}
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {t('common.underConstruction')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', opacity: 0.8 }} />
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {description || t('common.comingSoonDescription')}
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">{t('common.comingSoonWhen')}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2">
                {t('common.comingSoonTimeframe')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">{t('common.comingSoonWhy')}</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2">
                {t('common.comingSoonPurpose')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {features && Object.keys(features).length > 0 && (
        <Card sx={{ mt: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FeaturedPlayListIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">{t('common.plannedFeatures')}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {Object.entries(features).map(([key, value]) => (
                <ListItem key={key} disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleOutlineIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={value} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ComingSoonPage; 