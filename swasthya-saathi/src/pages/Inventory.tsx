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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Chip,
  Badge
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  ArrowUpward as IncreaseIcon,
  ArrowDownward as DecreaseIcon,
  Warning as WarningIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data for inventory items
const mockInventoryItems = [
  { id: 1, name: 'Sanitary Pads', category: 'Hygiene', quantity: 150, unit: 'packets', reorderLevel: 50, expiryDate: '2026-05-15' },
  { id: 2, name: 'Pregnancy Test Kits', category: 'Medical', quantity: 45, unit: 'kits', reorderLevel: 20, expiryDate: '2025-08-22' },
  { id: 3, name: 'Iron Tablets', category: 'Nutrition', quantity: 300, unit: 'tablets', reorderLevel: 100, expiryDate: '2025-02-10' },
  { id: 4, name: 'Educational Pamphlets', category: 'Education', quantity: 200, unit: 'pieces', reorderLevel: 50, expiryDate: null },
  { id: 5, name: 'First Aid Kits', category: 'Medical', quantity: 15, unit: 'kits', reorderLevel: 10, expiryDate: '2027-01-30' },
  { id: 6, name: 'Calcium Supplements', category: 'Nutrition', quantity: 5, unit: 'bottles', reorderLevel: 10, expiryDate: '2024-12-25' }
];

// Stats for inventory dashboard
const inventoryStats = [
  { id: 1, title: 'Total Items', value: '6', color: '#e3f2fd' },
  { id: 2, title: 'Low Stock', value: '1', color: '#fff8e1' },
  { id: 3, title: 'Expiring Soon', value: '2', color: '#ffebee' }
];

const Inventory: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [items] = useState(mockInventoryItems);

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleAddItem = () => {
    navigate('/inventory/add');
  };

  const isLowStock = (item: typeof mockInventoryItems[0]) => {
    return item.quantity <= item.reorderLevel;
  };

  const getExpiringStatus = (item: typeof mockInventoryItems[0]) => {
    if (!item.expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);
    
    return expiry <= threeMonthsFromNow;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{t('inventory.title')}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddItem}
        >
          {t('inventory.addItem')}
        </Button>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {inventoryStats.map((stat) => (
          <Grid key={stat.id} item xs={12} sm={4}>
            <Card sx={{ background: stat.color, borderRadius: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" component="div" fontWeight="medium">
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('common.search')}
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {/* Inventory List */}
      <Card>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <InventoryIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        <Typography component="span" variant="subtitle1" fontWeight="medium">
                          {item.name}
                        </Typography>
                        {isLowStock(item) && (
                          <Chip 
                            icon={<WarningIcon />} 
                            label={t('inventory.lowStock')} 
                            color="warning" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        )}
                        {getExpiringStatus(item) && (
                          <Chip 
                            label={t('inventory.expiryDate')} 
                            color="error" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {item.category}
                        </Typography>
                        {" — "}
                        <Typography component="span" variant="body2">
                          <strong>{item.quantity}</strong> {item.unit}
                        </Typography>
                        {item.expiryDate && (
                          <>
                            {" | "}
                            <Typography component="span" variant="body2">
                              {t('inventory.expiryDate')}: {new Date(item.expiryDate).toLocaleDateString()}
                            </Typography>
                          </>
                        )}
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="increase" color="success">
                      <IncreaseIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="decrease" color="error">
                      <DecreaseIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" color="default">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < filteredItems.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText 
                primary={t('common.noData')} 
                sx={{ textAlign: 'center' }}
              />
            </ListItem>
          )}
        </List>
      </Card>
    </Box>
  );
};

export default Inventory; 