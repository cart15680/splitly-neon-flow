export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  kycVerified: boolean;
  bankLinked: boolean;
  creditLimit: number;
  availableLimit: number;
}

export interface Merchant {
  id: string;
  name: string;
  logo: string;
  category: string;
  featured: boolean;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  bnplEligible: boolean;
  rating: number;
  reviews: number;
  discount?: number;
  stock?: number; // Added stock as an optional property
}

export interface EMI {
  id: string;
  productId: string;
  productName: string;
  merchantName: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  installmentAmount: number;
  tenure: number;
  nextDueDate: string;
  installmentsPaid: number;
  totalInstallments: number;
  status: 'active' | 'completed' | 'overdue';
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'emi-payment' | 'refund';
  amount: number;
  date: string;
  merchantName?: string;
  productName?: string;
  emiId?: string;
  status: 'success' | 'pending' | 'failed';
}

export const currentUser: User = {
  id: 'user123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  mobile: '9876543210',
  kycVerified: true,
  bankLinked: true,
  creditLimit: 100000,
  availableLimit: 75000
};

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '🏀' },
];

export const merchants: Merchant[] = [
  { 
    id: 'merchant1', 
    name: 'TechWorld', 
    logo: 'https://images.unsplash.com/photo-1596443686812-2f45229eebc3?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'electronics',
    featured: true
  },
  { 
    id: 'merchant2', 
    name: 'FashionHub', 
    logo: 'https://images.unsplash.com/photo-1608228088998-57828365d486?q=80&w=2528&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'fashion',
    featured: true
  },
  { 
    id: 'merchant3', 
    name: 'QuickMart', 
    logo: 'https://images.unsplash.com/photo-1580913428023-02c695666d61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'grocery',
    featured: false 
  },
  { 
    id: 'merchant4', 
    name: 'BeautyBox', 
    logo: 'https://images.unsplash.com/photo-1543322748-33df6d3db806?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'beauty',
    featured: true 
  },
  { 
    id: 'merchant5', 
    name: 'HomeDecor', 
    logo: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'home',
    featured: false 
  }
];

export const products: Product[] = [
  {
    id: 'prod1',
    merchantId: 'merchant1',
    name: 'Smartphone Pro Max',
    description: 'Latest smartphone with advanced camera and long-lasting battery',
    price: 79999,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'electronics',
    bnplEligible: true,
    rating: 4.8,
    reviews: 243,
    discount: 10,
    stock: 45 // Adding stock values to product objects
  },
  {
    id: 'prod2',
    merchantId: 'merchant1',
    name: 'Ultra HD Smart TV',
    description: '55-inch 4K TV with HDR and smart features',
    price: 59999,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=2033&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'electronics',
    bnplEligible: true,
    rating: 4.5,
    reviews: 187,
    stock: 23
  },
  {
    id: 'prod3',
    merchantId: 'merchant2',
    name: 'Designer Handbag',
    description: 'Premium leather designer handbag',
    price: 12999,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1596149615493-f0739de31c2d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'fashion',
    bnplEligible: true,
    rating: 4.7,
    reviews: 96,
    discount: 15,
    stock: 15
  },
  {
    id: 'prod4',
    merchantId: 'merchant4',
    name: 'Premium Skincare Set',
    description: 'Complete skincare routine with natural ingredients',
    price: 4999,
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'beauty',
    bnplEligible: true,
    rating: 4.6,
    reviews: 132,
    stock: 42
  },
  {
    id: 'prod5',
    merchantId: 'merchant3',
    name: 'Organic Food Basket',
    description: 'Assorted organic fruits and vegetables',
    price: 1999,
    images: [
      'https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'grocery',
    bnplEligible: false,
    rating: 4.4,
    reviews: 67,
    stock: 8
  },
  {
    id: 'prod6',
    merchantId: 'merchant5',
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with premium sound',
    price: 9999,
    images: [
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'electronics',
    bnplEligible: true,
    rating: 4.3,
    reviews: 109,
    discount: 20,
    stock: 31
  }
];

export const activeEMIs: EMI[] = [
  {
    id: 'emi1',
    productId: 'prod1',
    productName: 'Smartphone Pro Max',
    merchantName: 'TechWorld',
    totalAmount: 79999,
    paidAmount: 26666,
    remainingAmount: 53333,
    installmentAmount: 13333,
    tenure: 6,
    nextDueDate: '2025-06-15',
    installmentsPaid: 2,
    totalInstallments: 6,
    status: 'active'
  },
  {
    id: 'emi2',
    productId: 'prod3',
    productName: 'Designer Handbag',
    merchantName: 'FashionHub',
    totalAmount: 12999,
    paidAmount: 4333,
    remainingAmount: 8666,
    installmentAmount: 4333,
    tenure: 3,
    nextDueDate: '2025-06-02',
    installmentsPaid: 1,
    totalInstallments: 3,
    status: 'overdue'
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: 'trans1',
    type: 'purchase',
    amount: 79999,
    date: '2025-04-10',
    merchantName: 'TechWorld',
    productName: 'Smartphone Pro Max',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans2',
    type: 'emi-payment',
    amount: 13333,
    date: '2025-05-05',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans3',
    type: 'purchase',
    amount: 12999,
    date: '2025-05-01',
    merchantName: 'FashionHub',
    productName: 'Designer Handbag',
    emiId: 'emi2',
    status: 'success'
  },
  {
    id: 'trans4',
    type: 'emi-payment',
    amount: 13333,
    date: '2025-04-15',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans5',
    type: 'refund',
    amount: 1999,
    date: '2025-04-02',
    merchantName: 'QuickMart',
    productName: 'Organic Food Basket',
    status: 'success'
  }
];

export const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'card', name: 'Debit/Credit Card', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Wallet', icon: '👛' }
];

export const bankOptions = [
  { value: 'sbi', label: 'State Bank of India' },
  { value: 'hdfc', label: 'HDFC Bank' },
  { value: 'icici', label: 'ICICI Bank' },
  { value: 'axis', label: 'Axis Bank' },
  { value: 'kotak', label: 'Kotak Mahindra Bank' },
  { value: 'yes', label: 'Yes Bank' },
  { value: 'pnb', label: 'Punjab National Bank' },
  { value: 'bob', label: 'Bank of Baroda' }
];

export const faqs = [
  {
    question: 'What is Splitly?',
    answer: 'Splitly is a Buy Now Pay Later (BNPL) service that allows you to shop for products and pay for them in easy installments over time.'
  },
  {
    question: 'How do I sign up for Splitly?',
    answer: 'You can sign up by downloading the Splitly app, providing your basic details, and completing the KYC verification process.'
  },
  {
    question: 'Is there any interest charged on EMIs?',
    answer: 'For select offers, EMIs can be interest-free. For other purchases, a nominal interest rate may apply, which will be clearly indicated before confirming your purchase.'
  },
  {
    question: 'What happens if I miss an EMI payment?',
    answer: 'Missing an EMI payment may result in a late fee and could affect your credit score. We recommend setting up automatic payments to avoid missing due dates.'
  },
  {
    question: 'How is my credit limit determined?',
    answer: 'Your credit limit is determined based on various factors including your credit history, income, and repayment behavior.'
  },
  {
    question: 'Can I pay off my EMIs early?',
    answer: 'Yes, you can pay off your EMIs before the due date without any prepayment penalty.'
  }
];
