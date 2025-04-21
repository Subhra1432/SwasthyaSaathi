import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Alert,
  Paper,
  SelectChangeEvent,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Insights as InsightsIcon,
  DateRange as DateRangeIcon,
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
  Report as ReportIcon,
  LocationOn as LocationIcon,
  ShowChart as ChartIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Print as PrintIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock chart component to simulate chart.js
const MockBarChart = ({ data, title }: { data: any; title: string }) => {
  // This is a mock chart component
  // In a real app, you would use a chart library like Chart.js
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" component="div">{title}</Typography>
        <Box>
          <Tooltip title="Download Data">
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small">
              <PrintIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box 
        sx={{ 
          height: 250, 
          position: 'relative', 
          bgcolor: 'rgba(0,0,0,0.02)', 
          borderRadius: 1, 
          p: 2,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Mock chart - In real app replace with actual chart component */}
        <Box flex="1" display="flex" alignItems="flex-end">
          {data.labels.map((label: string, index: number) => {
            const value = data.datasets[0].data[index];
            const maxValue = Math.max(...data.datasets[0].data);
            const height = (value / maxValue) * 100;
            
            return (
              <Box 
                key={index} 
                sx={{ 
                  width: `${100 / data.labels.length - 5}%`, 
                  height: `${height}%`,
                  bgcolor: data.datasets[0].backgroundColor[index] || 'primary.main',
                  mx: '2.5%',
                  borderRadius: '4px 4px 0 0',
                  position: 'relative',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <Tooltip title={`${label}: ${value}`}>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: -20, 
                      left: 0, 
                      right: 0, 
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="caption" fontWeight="bold">
                      {value}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            );
          })}
        </Box>
        <Box 
          display="flex" 
          justifyContent="space-around" 
          mt={1}
          sx={{ borderTop: '1px dashed rgba(0,0,0,0.1)', pt: 1 }}
        >
          {data.labels.map((label: string, index: number) => (
            <Typography key={index} variant="caption" sx={{ fontSize: '0.7rem' }}>
              {label}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MockLineChart = ({ data, title }: { data: any; title: string }) => {
  // This is a mock chart component
  // In a real app, you would use a chart library like Chart.js
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" component="div">{title}</Typography>
        <Box>
          <Tooltip title="Download Data">
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small">
              <PrintIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box 
        sx={{ 
          height: 250, 
          position: 'relative', 
          bgcolor: 'rgba(0,0,0,0.02)', 
          borderRadius: 1, 
          p: 2 
        }}
      >
        {/* Mock line - In real app replace with actual chart component */}
        <Box sx={{ height: '100%', position: 'relative' }}>
          <Box 
            sx={{ 
              position: 'absolute', 
              left: 0, 
              bottom: 0, 
              width: '100%', 
              height: '70%',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                bgcolor: 'rgba(0,0,0,0.1)',
                zIndex: 1
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                bgcolor: 'rgba(0,0,0,0.1)',
                zIndex: 1
              }
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={data.datasets[0].data.map((value: number, index: number) => 
                  `${index * (100 / (data.datasets[0].data.length - 1))},${100 - value}`
                ).join(' ')}
                fill="none"
                stroke={data.datasets[0].borderColor}
                strokeWidth="2"
              />
            </svg>
            
            {/* Data points */}
            {data.datasets[0].data.map((value: number, index: number) => (
              <Tooltip key={index} title={`${data.labels[index]}: ${value}`}>
                <Box 
                  sx={{ 
                    position: 'absolute',
                    left: `${index * (100 / (data.datasets[0].data.length - 1))}%`,
                    bottom: `${value}%`,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    border: `2px solid ${data.datasets[0].borderColor}`,
                    transform: 'translate(-50%, 50%)',
                    zIndex: 2
                  }}
                />
              </Tooltip>
            ))}
          </Box>
          
          {/* X-axis labels */}
          <Box 
            display="flex" 
            justifyContent="space-between" 
            sx={{ 
              position: 'absolute', 
              bottom: -20, 
              left: 0, 
              right: 0 
            }}
          >
            {data.labels.map((label: string, index: number) => (
              <Typography key={index} variant="caption" sx={{ fontSize: '0.7rem' }}>
                {label}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const MockPieChart = ({ data, title }: { data: any; title: string }) => {
  // This is a mock chart component - simplified version
  const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6" component="div">{title}</Typography>
        <Box>
          <Tooltip title="Download Data">
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small">
              <PrintIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share">
            <IconButton size="small">
              <ShareIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box 
        sx={{ 
          height: 250, 
          position: 'relative', 
          bgcolor: 'rgba(0,0,0,0.02)', 
          borderRadius: 1, 
          p: 2,
          display: 'flex'
        }}
      >
        {/* Simplified pie chart visualization */}
        <Box 
          sx={{ 
            width: '60%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              position: 'relative',
              bgcolor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* We'll use a simplified representation for the pie segments */}
            {data.datasets[0].data.map((_value: number, index: number) => {
              // Position the color blocks in a circle pattern
              const angle = (index / data.datasets[0].data.length) * 2 * Math.PI;
              const size = 60 * (data.datasets[0].data[index] / total) + 20;
              
              return (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    bgcolor: data.datasets[0].backgroundColor[index],
                    transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 30}px, ${Math.sin(angle) * 30}px)`,
                    opacity: 0.8,
                    transition: '0.3s all',
                    '&:hover': {
                      opacity: 1,
                      transform: `translate(-50%, -50%) translate(${Math.cos(angle) * 40}px, ${Math.sin(angle) * 40}px)`,
                    }
                  }}
                />
              );
            })}
            <Typography variant="caption" fontWeight="bold">
              Total: {total}
            </Typography>
          </Box>
        </Box>
        
        {/* Legend */}
        <Box 
          sx={{ 
            width: '40%', 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center' 
          }}
        >
          {data.labels.map((label: string, index: number) => (
            <Box key={index} display="flex" alignItems="center" mb={1}>
              <Box 
                sx={{ 
                  width: 12, 
                  height: 12, 
                  mr: 1, 
                  bgcolor: data.datasets[0].backgroundColor[index],
                  borderRadius: 0.5
                }}
              />
              <Typography variant="caption" sx={{ mr: 1 }}>{label}:</Typography>
              <Typography variant="caption" fontWeight="bold">
                {data.datasets[0].data[index]} ({Math.round(data.datasets[0].data[index] / total * 100)}%)
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const HealthInsights: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const [timeRange, setTimeRange] = useState('6months');
  const [location, setLocation] = useState('all');
  
  // Mock data for charts
  const healthTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Health Check-ups',
        data: [65, 59, 80, 81, 56, 75],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const maternalHealthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Maternal Check-ups',
        data: [30, 45, 39, 50, 55, 60],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  };
  
  const childHealthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Child Health Visits',
        data: [40, 35, 45, 50, 48, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  };
  
  const healthIssuesData = {
    labels: ['Respiratory', 'Digestive', 'Skin', 'Fever', 'Injury', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 20, 10, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  const vaccinationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Vaccinations',
        data: [120, 150, 180, 170, 160, 190],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };
  
  const nutritionStatusData = {
    labels: ['Healthy', 'Mild Malnutrition', 'Moderate Malnutrition', 'Severe Malnutrition'],
    datasets: [
      {
        data: [60, 25, 10, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };
  
  // Handle time range change
  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };
  
  // Handle location change
  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
  };
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('insights.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ReportIcon />}
          onClick={() => alert('Generating health report')}
        >
          Generate Report
        </Button>
      </Box>
      
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        {t('insights.description') || 'Gain valuable insights into community health patterns and trends.'}
      </Typography>
      
      {/* Filters and Controls */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="time-range-label">Time Range</InputLabel>
              <Select
                labelId="time-range-label"
                id="time-range"
                value={timeRange}
                label="Time Range"
                onChange={handleTimeRangeChange}
                startAdornment={
                  <InputAdornment position="start">
                    <DateRangeIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="3months">Last 3 months</MenuItem>
                <MenuItem value="6months">Last 6 months</MenuItem>
                <MenuItem value="1year">Last 1 year</MenuItem>
                <MenuItem value="custom">Custom range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                labelId="location-label"
                id="location"
                value={location}
                label="Location"
                onChange={handleLocationChange}
                startAdornment={
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="all">All Villages</MenuItem>
                <MenuItem value="north">Northern Villages</MenuItem>
                <MenuItem value="south">Southern Villages</MenuItem>
                <MenuItem value="east">Eastern Villages</MenuItem>
                <MenuItem value="west">Western Villages</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Health Issues"
              placeholder="e.g. malaria, dengue, etc."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <InsightsIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      
      {/* Key Insights Alert */}
      <Alert 
        severity="info" 
        sx={{ mb: 4 }}
        icon={<TrendingUpIcon />}
        action={
          <Button color="inherit" size="small">
            View Details
          </Button>
        }
      >
        <Typography variant="subtitle2">Key Insight</Typography>
        <Typography variant="body2">
          Child health check-ups have increased by 15% in the last quarter. Maternal health visits are showing a consistently positive trend.
        </Typography>
      </Alert>
      
      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Top Row */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <MockBarChart data={healthTrendsData} title="Health Check-ups Trend" />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <MockPieChart data={healthIssuesData} title="Common Health Issues" />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Middle Row */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <MockLineChart data={maternalHealthData} title="Maternal Health Trend" />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <MockLineChart data={childHealthData} title="Child Health Trend" />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Bottom Row */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <MockBarChart data={vaccinationData} title="Vaccination Coverage" />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <MockPieChart data={nutritionStatusData} title="Nutrition Status" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HealthInsights; 