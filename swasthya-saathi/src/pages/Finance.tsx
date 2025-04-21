import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { 
  AttachMoney as MoneyIcon, 
  Add as AddIcon,
  CallMade as ExpenseIcon,
  CallReceived as IncomeIcon,
  Receipt as ReceiptIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Type definition for translation function to prevent infinite type instantiation
type TFunction = (key: string) => string;

// Mock transaction interface
interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const Finance: React.FC = () => {
  // Using a different approach to prevent type instantiation issues
  const translationHook = useTranslation();
  const t = translationHook.t as unknown as TFunction;
  const navigate = useNavigate();

  // Mock transaction data
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      date: '2023-05-10',
      description: 'Monthly stipend',
      amount: 5000,
      type: 'income',
      category: 'Stipend',
      status: 'completed'
    },
    {
      id: 2,
      date: '2023-05-08',
      description: 'Purchase of first aid kits',
      amount: 1200,
      type: 'expense',
      category: 'Medical Supplies',
      status: 'completed'
    },
    {
      id: 3,
      date: '2023-05-05',
      description: 'Health camp sponsorship',
      amount: 3000,
      type: 'income',
      category: 'Sponsorship',
      status: 'completed'
    },
    {
      id: 4,
      date: '2023-05-01',
      description: 'Transportation for village outreach',
      amount: 500,
      type: 'expense',
      category: 'Transportation',
      status: 'completed'
    },
    {
      id: 5,
      date: '2023-04-28',
      description: 'Reimbursement claim for training',
      amount: 750,
      type: 'income',
      category: 'Reimbursement',
      status: 'pending'
    }
  ]);

  // Calculate summary statistics
  const totalIncome = transactions
    .filter(t => t.type === 'income' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = totalIncome - totalExpense;

  const handleAddTransaction = () => {
    navigate('/finance/add');
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          {t('finance.title')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddTransaction}
        >
          {t('finance.addTransaction')}
        </Button>
      </Box>

      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        {t('finance.description') || 'Manage and track all your financial activities related to community health work.'}
      </Typography>

      {/* Financial Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              background: '#e3f2fd',
              height: '100%'
            }}
          >
            <Box display="flex" flexDirection="column" height="100%">
              <Box display="flex" alignItems="center" mb={1}>
                <WalletIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">Balance</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" mb={1}>₹{balance.toLocaleString()}</Typography>
              <Typography variant="body2" color="textSecondary">Current balance as of today</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              background: '#e8f5e9',
              height: '100%'
            }}
          >
            <Box display="flex" flexDirection="column" height="100%">
              <Box display="flex" alignItems="center" mb={1}>
                <IncomeIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" color="success.main">Income</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="success.main" mb={1}>
                ₹{totalIncome.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total income this month</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              background: '#ffebee',
              height: '100%'
            }}
          >
            <Box display="flex" flexDirection="column" height="100%">
              <Box display="flex" alignItems="center" mb={1}>
                <ExpenseIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" color="error">Expenses</Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" color="error" mb={1}>
                ₹{totalExpense.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">Total expenses this month</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Box mb={4}>
        <Typography variant="h5" mb={2}>Recent Transactions</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {transaction.type === 'income' ? 
                        <IncomeIcon color="success" fontSize="small" sx={{ mr: 1 }} /> : 
                        <ExpenseIcon color="error" fontSize="small" sx={{ mr: 1 }} />}
                      {transaction.description}
                    </Box>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={transaction.type === 'income' ? 'success.main' : 'error'}
                      fontWeight="medium"
                    >
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      size="small"
                      color={
                        transaction.status === 'completed' ? 'success' : 
                        transaction.status === 'pending' ? 'warning' : 'error'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Financial Reports Card */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <ReceiptIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Financial Reports</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => alert('Monthly report would be generated')}
              >
                Monthly Report
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => alert('Quarterly report would be generated')}
              >
                Quarterly Report
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => alert('Custom report would be generated')}
              >
                Custom Report
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Finance; 