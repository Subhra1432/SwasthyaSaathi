import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
  Paper,
  LinearProgress
} from '@mui/material';
import { 
  School as SchoolIcon,
  Search as SearchIcon,
  PlayCircleOutline as PlayIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Article as ArticleIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Interface for course data
interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  image: string;
  progress: number;
  instructor: string;
  modules: number;
  completed: boolean;
  certification: boolean;
}

// Interface for a training resource
interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'guidelines' | 'toolkit';
  category: string;
  size: string;
  lastUpdated: string;
  downloadUrl: string;
}

const Training: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  // Mock courses data
  const courses: Course[] = [
    {
      id: 1,
      title: 'Maternal Health Basics',
      description: 'Learn essential skills for supporting maternal health in rural communities.',
      category: 'Maternal Health',
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=200&auto=format&fit=crop',
      progress: 75,
      instructor: 'Dr. Priya Sharma',
      modules: 8,
      completed: false,
      certification: true
    },
    {
      id: 2,
      title: 'Child Nutrition Program',
      description: 'Understand child nutrition needs and how to address malnutrition in communities.',
      category: 'Child Health',
      duration: '6 hours',
      image: 'https://images.unsplash.com/photo-1588072430033-f242a01cb135?q=80&w=200&auto=format&fit=crop',
      progress: 100,
      instructor: 'Dr. Akash Patel',
      modules: 12,
      completed: true,
      certification: true
    },
    {
      id: 3,
      title: 'Basic First Aid Training',
      description: 'Essential first aid skills for community health workers.',
      category: 'Emergency Response',
      duration: '3 hours',
      image: 'https://images.unsplash.com/photo-1576671414121-aa2d70479753?q=80&w=200&auto=format&fit=crop',
      progress: 30,
      instructor: 'Dr. Raj Kumar',
      modules: 6,
      completed: false,
      certification: true
    },
    {
      id: 4,
      title: 'Water and Sanitation',
      description: 'Learn about water safety, sanitation practices, and hygiene education for communities.',
      category: 'Public Health',
      duration: '5 hours',
      image: 'https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=200&auto=format&fit=crop',
      progress: 50,
      instructor: 'Dr. Meena Gupta',
      modules: 10,
      completed: false,
      certification: true
    },
    {
      id: 5,
      title: 'Immunization Awareness',
      description: 'Understand the importance of immunization and how to promote it in communities.',
      category: 'Child Health',
      duration: '2 hours',
      image: 'https://images.unsplash.com/photo-1612277593762-f261318d5704?q=80&w=200&auto=format&fit=crop',
      progress: 0,
      instructor: 'Dr. Sanjay Singh',
      modules: 4,
      completed: false,
      certification: false
    },
    {
      id: 6,
      title: 'Mental Health Awareness',
      description: 'Basic understanding of mental health issues and support strategies.',
      category: 'Mental Health',
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1559595500-e15296bdbb48?q=80&w=200&auto=format&fit=crop',
      progress: 100,
      instructor: 'Dr. Ananya Das',
      modules: 8,
      completed: true,
      certification: true
    }
  ];
  
  // Mock resources data
  const resources: Resource[] = [
    {
      id: 1,
      title: 'ASHA Field Guide',
      type: 'pdf',
      category: 'Guidelines',
      size: '2.4 MB',
      lastUpdated: '2023-04-15',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Maternal Health Assessment Form',
      type: 'pdf',
      category: 'Forms',
      size: '1.2 MB',
      lastUpdated: '2023-05-20',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Child Growth Monitoring Tutorial',
      type: 'video',
      category: 'Tutorials',
      size: '45 MB',
      lastUpdated: '2023-03-10',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'National Immunization Schedule',
      type: 'pdf',
      category: 'Guidelines',
      size: '3.1 MB',
      lastUpdated: '2023-06-05',
      downloadUrl: '#'
    },
    {
      id: 5,
      title: 'Community Health Awareness Toolkit',
      type: 'toolkit',
      category: 'Resources',
      size: '15 MB',
      lastUpdated: '2023-02-28',
      downloadUrl: '#'
    }
  ];
  
  // Filter courses and resources based on search query
  const filteredCourses = searchQuery 
    ? courses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : courses;
    
  const filteredResources = searchQuery 
    ? resources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Get the appropriate icon for resource type
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return <ArticleIcon color="primary" />;
      case 'video':
        return <PlayIcon color="error" />;
      case 'guidelines':
        return <AssignmentIcon color="info" />;
      case 'toolkit':
        return <ArticleIcon color="success" />;
      default:
        return <ArticleIcon />;
    }
  };
  
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('training.title')}
        </Typography>
      </Box>
      
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        {t('training.description') || 'Access training materials and resources to enhance your healthcare skills.'}
      </Typography>
      
      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Search for courses, resources, or topics..."
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
      
      {/* Tabs for Courses and Resources */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="training content tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Courses" icon={<SchoolIcon />} iconPosition="start" />
          <Tab label="Resources" icon={<ArticleIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* Courses Tab Content */}
      {tabValue === 0 && (
        <>
          <Grid container spacing={3}>
            {filteredCourses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt={course.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box mb={1} display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Typography variant="h6" component="div" gutterBottom>
                        {course.title}
                      </Typography>
                      {course.completed && (
                        <Chip 
                          label="Completed" 
                          size="small" 
                          color="success" 
                          icon={<CheckCircleIcon />} 
                        />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                      {course.description}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <TimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Duration: {course.duration}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={1}>
                      <SchoolIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        Instructor: {course.instructor}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <AssignmentIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {course.modules} modules
                      </Typography>
                    </Box>
                    {course.progress > 0 && (
                      <Box mb={2}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="body2">
                            Progress
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {course.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={course.progress} 
                          color={course.progress === 100 ? "success" : "primary"}
                        />
                      </Box>
                    )}
                    <Divider sx={{ mb: 2 }} />
                    <Button
                      variant="contained"
                      fullWidth
                      color={course.progress > 0 ? "primary" : "secondary"}
                      startIcon={course.progress > 0 ? <PlayIcon /> : <SchoolIcon />}
                      onClick={() => alert(`Opening course: ${course.title}`)}
                    >
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Button>
                    {course.certification && (
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        disabled={!course.completed}
                        onClick={() => alert(`Opening certificate for: ${course.title}`)}
                      >
                        {course.completed ? "View Certificate" : "Certificate Available"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {filteredCourses.length === 0 && (
            <Box textAlign="center" py={5}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No courses found matching "{searchQuery}"
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </>
      )}
      
      {/* Resources Tab Content */}
      {tabValue === 1 && (
        <>
          <List sx={{ bgcolor: 'background.paper' }}>
            {filteredResources.map((resource) => (
              <React.Fragment key={resource.id}>
                <ListItem 
                  alignItems="flex-start"
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                      onClick={() => alert(`Downloading: ${resource.title}`)}
                    >
                      Download
                    </Button>
                  }
                >
                  <ListItemIcon>
                    {getResourceIcon(resource.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={resource.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {resource.category}
                        </Typography>
                        {` — ${resource.size} • Last updated: ${new Date(resource.lastUpdated).toLocaleDateString()}`}
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
          
          {filteredResources.length === 0 && (
            <Box textAlign="center" py={5}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No resources found matching "{searchQuery}"
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Training; 