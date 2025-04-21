import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Divider
} from '@mui/material';
import { 
  Construction as ConstructionIcon,
  Schedule as ScheduleIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

interface ComingSoonPageProps {
  title: string;
  description?: string; 
  features?: string[];
  icon?: React.ReactNode;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ 
  title, 
  description, 
  features = [], 
  icon 
}) => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box 
          display="flex" 
          alignItems="center" 
          mb={3}
        >
          {icon && <Box mr={2} color="primary.main" sx={{ display: 'flex', fontSize: '2rem' }}>{icon}</Box>}
          <Box>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {description || t('common.comingSoonDescription') || 'We are working on this feature. It will be available soon.'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }} variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {t('common.comingSoonWhen') || 'When is it coming?'}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {t('common.comingSoonTimeframe') || 'We are working hard to bring this feature to you in the next update. Stay tuned for announcements!'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }} variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <LightbulbIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {t('common.comingSoonWhy') || 'Why we\'re building this'}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {t('common.comingSoonPurpose') || 'This feature is being developed to help ASHA workers streamline their workflow and improve community health outcomes.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {features.length > 0 && (
            <Grid item xs={12}>
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {t('common.plannedFeatures') || 'Planned Features'}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {features.map((feature, index) => (
                      <Typography component="li" key={index} variant="body2" sx={{ mb: 1 }}>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Paper>
      
      <Box textAlign="center" sx={{ opacity: 0.7 }}>
        <ConstructionIcon fontSize="large" color="action" />
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {t('common.underConstruction') || 'Under Construction'}
        </Typography>
      </Box>
    </Box>
  );
};

export default ComingSoonPage; 