import React, { useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Button,
  useMediaQuery,
  useTheme,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AttachMoney as FinanceIcon,
  Inventory as InventoryIcon,
  Event as EventIcon,
  InsightsOutlined as InsightsIcon,
  Policy as PolicyIcon,
  School as TrainingIcon,
  ShoppingCart as MarketplaceIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  LanguageOutlined as LanguageIcon,
  AccountCircle
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 240;

interface LayoutProps {
  children: ReactNode;
}

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;
type I18n = {
  language: string;
  changeLanguage: (lang: string) => Promise<void>;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Destructure separately and cast to prevent infinite type instantiation
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  const i18n = translationHook.i18n as unknown as I18n;
  
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  
  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };
  
  // Prepare menu items with translations
  const menuItems = [
    { text: t('navigation.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('navigation.members'), icon: <PeopleIcon />, path: '/members' },
    { text: t('navigation.finance'), icon: <FinanceIcon />, path: '/finance' },
    { text: t('navigation.inventory'), icon: <InventoryIcon />, path: '/inventory' },
    { text: t('navigation.events'), icon: <EventIcon />, path: '/events' },
    { text: t('navigation.insights'), icon: <InsightsIcon />, path: '/insights' },
    { text: t('navigation.schemes'), icon: <PolicyIcon />, path: '/schemes' },
    { text: t('navigation.training'), icon: <TrainingIcon />, path: '/training' },
    { text: t('navigation.marketplace'), icon: <MarketplaceIcon />, path: '/marketplace' },
    { text: t('navigation.settings'), icon: <SettingsIcon />, path: '/settings' }
  ];
  
  const drawer = (
    <div>
      <Toolbar>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            {t('app.name')}
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) {
                  setMobileOpen(false);
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary={t('navigation.logout')} />
        </ListItemButton>
      </ListItem>
    </div>
  );
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || ''}
          </Typography>
          
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, marginRight: 2, color: 'white' }}>
            <Select
              value={i18n.language || "en-US"}
              onChange={handleLanguageChange}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                }
              }}
              startAdornment={<LanguageIcon sx={{ mr: 1 }} />}
            >
              <MenuItem value="en-US">English</MenuItem>
              <MenuItem value="hin-IN">हिंदी</MenuItem>
              <MenuItem value="asm-IN">অসমীয়া</MenuItem>
              <MenuItem value="man-IN">মণিপুরী</MenuItem>
            </Select>
          </FormControl>
          
          {userProfile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt={userProfile.displayName}
                  src="#"
                  sx={{ width: 32, height: 32 }}
                >
                  {userProfile.displayName.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => {
                  handleProfileMenuClose();
                  navigate('/profile');
                }}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t('settings.profile')}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleProfileMenuClose();
                  handleLogout();
                }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">{t('navigation.logout')}</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>
              {t('auth.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 