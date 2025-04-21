import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock data for members
const mockMembers = [
  { id: 1, name: 'Sunita Devi', role: 'Leader', phone: '9876543210', joinDate: '2023-01-15' },
  { id: 2, name: 'Pratima Singh', role: 'Health Educator', phone: '9876543211', joinDate: '2023-02-10' },
  { id: 3, name: 'Geeta Kumari', role: 'Finance Manager', phone: '9876543212', joinDate: '2023-03-05' },
  { id: 4, name: 'Anjali Sharma', role: 'Supply Handler', phone: '9876543213', joinDate: '2023-04-20' },
  { id: 5, name: 'Kavita Patel', role: 'General Member', phone: '9876543214', joinDate: '2023-05-12' }
];

const Members: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [members] = useState(mockMembers);

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  
  const handleAddMember = () => {
    navigate('/members/add');
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'Leader':
        return 'primary';
      case 'Health Educator':
        return 'secondary';
      case 'Finance Manager':
        return 'success';
      case 'Supply Handler':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{t('members.title')}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAddMember}
        >
          {t('members.addMember')}
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
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
          sx={{ mb: 2 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('members.name')}</TableCell>
                <TableCell>{t('members.role')}</TableCell>
                <TableCell>{t('common.phoneNumber')}</TableCell>
                <TableCell>{t('members.joinedDate')}</TableCell>
                <TableCell align="right">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={member.role} 
                        color={getRoleColor(member.role) as "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {t('common.noData')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Members; 