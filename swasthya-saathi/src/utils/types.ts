// Member Types
export interface Member {
  id: string;
  name: string;
  phoneNumber: string;
  role: MemberRole;
  skills: string[];
  joinedDate: string;
}

export enum MemberRole {
  LEADER = 'leader',
  HEALTH_EDUCATOR = 'health_educator',
  SUPPLY_HANDLER = 'supply_handler',
  FINANCE_MANAGER = 'finance_manager',
  GENERAL_MEMBER = 'general_member'
}

// Finance Types
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  createdBy: string;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  expiryDate?: string;
}

// Health Event Types
export interface HealthEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  assignedMembers: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

// Health Insights Types
export interface HealthInsight {
  id: string;
  date: string;
  reportedBy: string;
  household: string;
  symptoms: string[];
  notes: string;
}

// Government Scheme Types
export interface GovtScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationProcess: string;
  documents: string[];
  lastUpdated: string;
}

// Training Material Types
export interface TrainingMaterial {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'video' | 'document' | 'audio';
  url: string;
  language: string;
  offlineAvailable: boolean;
}

// Marketplace Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  availableQuantity: number;
  unit: string;
  createdBy: string;
}

// User and Authentication Types
export interface User {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  role: 'admin' | 'member';
  shgId: string;
  // Additional profile fields
  photoURL?: string;
  district?: string;
  state?: string;
  address?: string;
  qualifications?: string;
  joinDate?: string;
  supervisorName?: string;
  supervisorContact?: string;
}

// SHG Types
export interface SHG {
  id: string;
  name: string;
  location: {
    village: string;
    block: string;
    district: string;
    state: string;
  };
  totalMembers: number;
  createdDate: string;
  adminId: string;
} 