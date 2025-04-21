import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

const ForgotPassword: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            {t('auth.forgotPassword') || 'Forgot Password'}
          </Typography>
          <Typography variant="body1" align="center">
            {t('auth.passwordResetForm') || 'Password reset form coming soon...'}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ForgotPassword; 