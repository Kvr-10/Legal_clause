import axios from 'axios';

// API base URL - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for file uploads
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const apiEndpoints = {
  // Document upload
  uploadDocument: (file: File, persona?: string) => {
    const formData = new FormData();
    formData.append('document', file);
    if (persona) formData.append('persona', persona);
    
    return api.post('/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Get document analysis
  getDocumentAnalysis: (documentId: string) => 
    api.get(`/documents/${documentId}/`),

  // Generate counter-offer for a clause
  generateCounterOffer: (clauseId: string) => 
    api.post(`/counter_offer/${clauseId}/`),

  // Get risk analysis
  getRiskAnalysis: (documentId: string, persona?: string) => 
    api.get(`/documents/${documentId}/risk/`, { 
      params: persona ? { persona } : {} 
    }),

  // Export document analysis as PDF
  exportPDF: (documentId: string) => 
    api.get(`/documents/${documentId}/export/`, { 
      responseType: 'blob' 
    }),
};

// Mock data for development/testing
export const mockData = {
  documentAnalysis: {
    id: 'doc-123',
    filename: 'lease-agreement.pdf',
    status: 'completed',
    overall_risk_score: 75,
    risk_categories: {
      'Financial Risk': 85,
      'Legal Compliance': 60,
      'Termination Risk': 80,
      'Liability Risk': 70,
    },
    clauses: [
      {
        id: 'clause-1',
        original_text: 'The tenant shall pay rent in the amount of $2,500 per month, due on the first day of each month without exception.',
        summary: 'Monthly rent payment of $2,500 due on the 1st of each month with no grace period.',
        risk_level: 'medium' as const,
        risk_score: 65,
        issues: ['No grace period for late payment', 'High monthly amount'],
        category: 'Financial Risk'
      },
      {
        id: 'clause-2', 
        original_text: 'The landlord may terminate this lease at any time with 24 hours written notice for any reason.',
        summary: 'Landlord can terminate lease with only 24 hours notice for any reason.',
        risk_level: 'critical' as const,
        risk_score: 95,
        issues: ['Very short notice period', 'No cause required', 'Tenant has no protection', 'Potentially illegal in many jurisdictions'],
        category: 'Termination Risk'
      },
      {
        id: 'clause-3',
        original_text: 'Tenant agrees to maintain the property in good condition and repair any damages.',
        summary: 'Tenant responsible for property maintenance and damage repairs.',
        risk_level: 'low' as const,
        risk_score: 30,
        issues: ['Standard maintenance clause'],
        category: 'Legal Compliance'
      },
      {
        id: 'clause-4',
        original_text: 'Tenant shall be liable for all damages to the property, including normal wear and tear, and shall pay triple damages for any breach of this agreement.',
        summary: 'Tenant liable for all damages including normal wear and tear, with triple damage penalties.',
        risk_level: 'high' as const,
        risk_score: 85,
        issues: ['Unreasonable liability for normal wear and tear', 'Excessive penalty clauses', 'May be unenforceable'],
        category: 'Liability Risk'
      }
    ]
  },
  
  counterOffer: {
    clause_id: 'clause-2',
    suggested_text: 'The landlord may terminate this lease with 30 days written notice for cause, including non-payment of rent or material breach of lease terms.',
    explanation: 'This revision provides more reasonable notice period and requires cause for termination, giving tenant better protection.'
  }
};

// Error handling utilities
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error - please check your connection',
      status: 0,
      data: null
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 0,
      data: null
    };
  }
};

export default api;
