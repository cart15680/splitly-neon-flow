export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  kycVerified: boolean;
  bankLinked: boolean;
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
  bankLinked: true
};

export const categories = [
  { id: 'cars', name: 'Cars & Automotive', icon: '🚗' },
  { id: 'electronics', name: 'Insurance', icon: '🛡️' },
  { id: 'fashion', name: 'Travel and Tourism', icon: '✈️' },
  { id: 'grocery', name: 'Home Furniture', icon: '🛋️' },
  // { id: 'beauty', name: 'Beauty', icon: '💄' },
  // { id: 'home', name: 'Home', icon: '🏠' },
  // { id: 'sports', name: 'Sports', icon: '🏀' },
];

export const merchants: Merchant[] = [
  { 
    id: 'qatar_auto_showroom', 
    name: 'Qatar Auto Showroom', 
    logo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3',
    category: 'cars',
    featured: true
  },
  { 
    id: 'merchant1', 
    name: 'Mall', 
    logo: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/06/Logo-lulu-saudi-hypermarket-free-download-PNG.png',
    category: 'electronics',
    featured: true
  },
  { 
    id: 'merchant2', 
    name: 'Gym', 
    logo: 'https://powerhouse.qa/wp-content/uploads/2023/12/cropped-POWERHOUSE-QATAR-01.png',
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
  // Cars - Qatar Auto Showroom
  {
    id: 'car1',
    merchantId: 'qatar_auto_showroom',
    name: 'Toyota Camry 2024',
    description: 'Brand new Toyota Camry with advanced safety features, hybrid engine, and luxury interior. Perfect for Qatar roads.',
    price: 98000,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2764&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.9,
    reviews: 156,
    discount: 5,
    stock: 8
  },
  {
    id: 'car2',
    merchantId: 'qatar_auto_showroom',
    name: 'Honda Accord 2024',
    description: 'Latest Honda Accord with turbocharged engine, premium features, and excellent fuel efficiency.',
    price: 105000,
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.8,
    reviews: 134,
    stock: 5
  },
  {
    id: 'car3',
    merchantId: 'qatar_auto_showroom',
    name: 'Nissan Altima 2024',
    description: 'Modern Nissan Altima with intelligent mobility features and sporty design.',
    price: 89000,
    images: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.7,
    reviews: 98,
    discount: 8,
    stock: 6
  },
  {
    id: 'car4',
    merchantId: 'qatar_auto_showroom',
    name: 'Hyundai Sonata 2024',
    description: 'Elegant Hyundai Sonata with smart technology and premium comfort features.',
    price: 95000,
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2966&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.6,
    reviews: 87,
    stock: 4
  },
  {
    id: 'car5',
    merchantId: 'qatar_auto_showroom',
    name: 'Kia K5 2024',
    description: 'Stylish Kia K5 with bold design and advanced driver assistance systems.',
    price: 92000,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.5,
    reviews: 76,
    discount: 3,
    stock: 7
  },
  {
    id: 'car6',
    merchantId: 'qatar_auto_showroom',
    name: 'Chevrolet Malibu 2024',
    description: 'Reliable Chevrolet Malibu with spacious interior and advanced connectivity.',
    price: 87000,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd17c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'cars',
    bnplEligible: true,
    rating: 4.4,
    reviews: 65,
    stock: 3
  },
  {
    id: 'prod1',
    merchantId: 'merchant1',
    name: 'Smartphone Pro Max',
    description: 'Latest smartphone with advanced camera and long-lasting battery',
    price: 2999,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=2736&auto=format&fit=crop&ixlib=rb-4.0.3'
    ],
    category: 'electronics',
    bnplEligible: true,
    rating: 4.8,
    reviews: 243,
    discount: 10,
    stock: 45
  },
  {
    id: 'prod2',
    merchantId: 'merchant1',
    name: 'Ultra HD Smart TV',
    description: '55-inch 4K TV with HDR and smart features',
    price: 2199,
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
    price: 499,
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
    price: 189,
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
    price: 75,
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
    price: 379,
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
    id: 'car_emi1',
    productId: 'car1',
    productName: 'Toyota Camry 2024',
    merchantName: 'Qatar Auto Showroom',
    totalAmount: 98000,
    paidAmount: 24500,
    remainingAmount: 73500,
    installmentAmount: 4083,
    tenure: 24,
    nextDueDate: '2025-06-20',
    installmentsPaid: 6,
    totalInstallments: 24,
    status: 'active'
  },
  {
    id: 'car_emi2',
    productId: 'car3',
    productName: 'Nissan Altima 2024',
    merchantName: 'Qatar Auto Showroom',
    totalAmount: 89000,
    paidAmount: 14833,
    remainingAmount: 74167,
    installmentAmount: 2472,
    tenure: 36,
    nextDueDate: '2025-06-10',
    installmentsPaid: 6,
    totalInstallments: 36,
    status: 'active'
  },
  {
    id: 'emi1',
    productId: 'prod1',
    productName: 'Smartphone Pro Max',
    merchantName: 'TechWorld',
    totalAmount: 1099,
    paidAmount: 366,
    remainingAmount: 733,
    installmentAmount: 183,
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
    totalAmount: 299,
    paidAmount: 100,
    remainingAmount: 199,
    installmentAmount: 100,
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
    amount: 1099,
    date: '2025-04-10',
    merchantName: 'TechWorld',
    productName: 'Smartphone Pro Max',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans2',
    type: 'emi-payment',
    amount: 183,
    date: '2025-05-05',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans3',
    type: 'purchase',
    amount: 299,
    date: '2025-05-01',
    merchantName: 'FashionHub',
    productName: 'Designer Handbag',
    emiId: 'emi2',
    status: 'success'
  },
  {
    id: 'trans4',
    type: 'emi-payment',
    amount: 183,
    date: '2025-04-15',
    emiId: 'emi1',
    status: 'success'
  },
  {
    id: 'trans5',
    type: 'refund',
    amount: 45,
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
