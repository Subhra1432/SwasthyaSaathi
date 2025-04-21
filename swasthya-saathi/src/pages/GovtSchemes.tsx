import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tab,
  Tabs
} from '@mui/material';
import {
  Policy as PolicyIcon,
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarIcon,
  Ballot as BallotIcon,
  LocalHospital as HealthIcon,
  ChildCare as ChildIcon,
  PregnantWoman as MaternityIcon,
  People as PeopleIcon,
  NotificationsActive as AlertIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Interface for government scheme data
interface Scheme {
  id: number;
  title: string;
  description: string;
  category: 'maternal' | 'child' | 'general' | 'nutrition' | 'elderly';
  beneficiaries: string;
  eligibility: string;
  documents: string[];
  applicationProcess: string;
  lastDate?: string;
  website: string;
  ministry: string;
  status: 'active' | 'upcoming' | 'expired';
}

const GovtSchemes: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  // Mock schemes data
  const schemes: Scheme[] = [
    {
      id: 1,
      title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
      description: 'A maternity benefit program that provides financial support to pregnant women and lactating mothers.',
      category: 'maternal',
      beneficiaries: 'Pregnant women and lactating mothers',
      eligibility: 'All pregnant women and lactating mothers, excluding those who are in regular employment with the Central Government or the State Governments or PSUs.',
      documents: ['Aadhar Card', 'Bank Account Details', 'MCP Card', 'Birth Certificate (for second installment)'],
      applicationProcess: 'Apply through ASHA worker or at nearest health center using the PMMVY application form.',
      website: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana',
      ministry: 'Ministry of Women and Child Development',
      status: 'active'
    },
    {
      id: 2,
      title: 'Janani Suraksha Yojana (JSY)',
      description: 'A safe motherhood intervention under the National Health Mission that promotes institutional delivery among poor pregnant women.',
      category: 'maternal',
      beneficiaries: 'Pregnant women, especially from low-income families',
      eligibility: 'All pregnant women belonging to BPL households, SC, ST, and women aged 19 and above for up to two live births.',
      documents: ['BPL Card or SC/ST Certificate', 'Aadhar Card', 'Age Proof', 'Bank Account Details'],
      applicationProcess: 'Register with ASHA worker or ANM during pregnancy and complete at least 3 antenatal check-ups.',
      website: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    },
    {
      id: 3,
      title: 'National Rural Health Mission (NRHM)',
      description: 'A program that provides accessible, affordable, and quality healthcare to rural areas, especially to poor and vulnerable sections.',
      category: 'general',
      beneficiaries: 'Rural population',
      eligibility: 'Rural citizens of India',
      documents: ['Aadhar Card', 'Residence Proof'],
      applicationProcess: 'Benefits available through local health centers. No direct application needed.',
      website: 'https://nhm.gov.in/',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    },
    {
      id: 4,
      title: 'Poshan Abhiyaan (National Nutrition Mission)',
      description: 'An initiative to improve nutritional outcomes for children, pregnant women, and lactating mothers.',
      category: 'nutrition',
      beneficiaries: 'Children, pregnant women, and lactating mothers',
      eligibility: 'All children under 6 years, pregnant women, and lactating mothers',
      documents: ['Aadhar Card'],
      applicationProcess: 'Enroll through local Anganwadi centers or ASHA workers.',
      website: 'https://poshanabhiyaan.gov.in/',
      ministry: 'Ministry of Women and Child Development',
      status: 'active'
    },
    {
      id: 5,
      title: 'Rashtriya Bal Swasthya Karyakram (RBSK)',
      description: 'A child health screening and early intervention program for children from birth to 18 years.',
      category: 'child',
      beneficiaries: 'Children from birth to 18 years',
      eligibility: 'All children from birth to 18 years',
      documents: ['Birth Certificate', 'Aadhar Card (if available)'],
      applicationProcess: 'Mobile health teams visit communities. No direct application needed.',
      website: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1254&lid=651',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    },
    {
      id: 6,
      title: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB-PMJAY)',
      description: 'Health insurance scheme that aims to provide free health coverage to economically vulnerable families.',
      category: 'general',
      beneficiaries: 'Economically vulnerable families',
      eligibility: 'Families identified based on SECC data and families included in RSBY.',
      documents: ['Aadhar Card', 'SECC Status', 'Ration Card', 'Income Certificate'],
      applicationProcess: 'Check eligibility on the PMJAY website or through Common Service Centers.',
      lastDate: '2023-12-31',
      website: 'https://pmjay.gov.in/',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    },
    {
      id: 7,
      title: 'National Program for Health Care of the Elderly (NPHCE)',
      description: 'Program to provide dedicated healthcare facilities for elderly people.',
      category: 'elderly',
      beneficiaries: 'Elderly citizens (60 years and above)',
      eligibility: 'Indian citizens aged 60 years and above',
      documents: ['Aadhar Card', 'Age Proof'],
      applicationProcess: 'Visit nearest government health facility with geriatric section.',
      website: 'https://main.mohfw.gov.in/major-programmes/non-communicable-diseases-injury-trauma/non-communicable-diseases-ii/national-programme-health-care-elderly-nphce',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    },
    {
      id: 8,
      title: 'Universal Immunization Program (UIP)',
      description: 'A vaccination program to prevent mortality and morbidity in children due to preventable diseases.',
      category: 'child',
      beneficiaries: 'Infants and children',
      eligibility: 'All children up to 5 years of age',
      documents: ['Birth Certificate', 'Immunization Card'],
      applicationProcess: 'Visit nearest health center or Anganwadi center.',
      website: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=824&lid=220',
      ministry: 'Ministry of Health and Family Welfare',
      status: 'active'
    }
  ];
  
  // Filter schemes based on search query and tab selection
  const filteredSchemes = searchQuery 
    ? schemes.filter(scheme => 
        scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tabValue === 0 
      ? schemes 
      : tabValue === 1 
        ? schemes.filter(scheme => scheme.status === 'active')
        : tabValue === 2 
          ? schemes.filter(scheme => scheme.category === 'maternal' || scheme.category === 'child')
          : tabValue === 3 
            ? schemes.filter(scheme => scheme.category === 'general' || scheme.category === 'nutrition')
            : schemes;
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Get icon based on scheme category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'maternal':
        return <MaternityIcon />;
      case 'child':
        return <ChildIcon />;
      case 'general':
        return <HealthIcon />;
      case 'nutrition':
        return <BallotIcon />;
      case 'elderly':
        return <PeopleIcon />;
      default:
        return <PolicyIcon />;
    }
  };
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('schemes.title')}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AlertIcon />}
          onClick={() => alert('You would receive notifications about new schemes')}
        >
          Get Alerts
        </Button>
      </Box>
      
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        {t('schemes.description') || 'Access and manage government health schemes for your community.'}
      </Typography>
      
      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Search for schemes, benefits, or ministries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs for different categories */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="scheme category tabs"
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="All Schemes" icon={<PolicyIcon />} iconPosition="start" />
          <Tab label="Active Schemes" icon={<HealthIcon />} iconPosition="start" />
          <Tab label="Mother & Child" icon={<MaternityIcon />} iconPosition="start" />
          <Tab label="General Health" icon={<BallotIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* Schemes List */}
      <Box>
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <Accordion key={scheme.id} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`scheme-${scheme.id}-content`}
                id={`scheme-${scheme.id}-header`}
              >
                <Box display="flex" alignItems="center" width="100%">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getCategoryIcon(scheme.category)}
                    </Avatar>
                  </ListItemAvatar>
                  <Box flex="1">
                    <Typography variant="h6">{scheme.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {scheme.ministry}
                    </Typography>
                  </Box>
                  <Chip 
                    label={scheme.status.toUpperCase()} 
                    color={
                      scheme.status === 'active' ? 'success' : 
                      scheme.status === 'upcoming' ? 'info' : 
                      'error'
                    }
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="body1" paragraph>
                      {scheme.description}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Beneficiaries
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {scheme.beneficiaries}
                    </Typography>
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Eligibility
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {scheme.eligibility}
                    </Typography>
                    
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Required Documents
                    </Typography>
                    <Box component="ul" pl={2}>
                      {scheme.documents.map((doc, index) => (
                        <Typography component="li" variant="body2" key={index}>
                          {doc}
                        </Typography>
                      ))}
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      How to Apply
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {scheme.applicationProcess}
                    </Typography>
                    
                    {scheme.lastDate && (
                      <>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Last Date to Apply
                        </Typography>
                        <Typography variant="body2" paragraph display="flex" alignItems="center">
                          <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                          {scheme.lastDate}
                        </Typography>
                      </>
                    )}
                    
                    <Button 
                      variant="contained" 
                      color="primary"
                      fullWidth
                      onClick={() => window.open(scheme.website, '_blank')}
                      sx={{ mt: 2 }}
                    >
                      Visit Official Website
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => alert(`Checking eligibility for: ${scheme.title}`)}
                    >
                      Check Eligibility
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Box textAlign="center" py={5}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No schemes found matching "{searchQuery}"
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GovtSchemes; 