import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            maxWidth: '600px',
            width: '100%',
          }}
        >
          <Typography variant="h1" component="h1" sx={{ fontSize: '8rem', fontWeight: 700, color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            {t('common.pageNotFound') || 'Page Not Found'}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {t('common.pageNotFoundMessage') || 'The page you are looking for doesn\'t exist or has been moved.'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            {t('common.backToDashboard') || 'Back to Dashboard'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound; 