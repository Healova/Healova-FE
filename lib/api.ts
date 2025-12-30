const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from cookie
const getAuthToken = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(c => c.trim().startsWith('auth_token='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Helper function to set auth token in cookie
const setAuthToken = (token: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

// Helper function to remove auth token from cookie
const removeAuthToken = () => {
  if (typeof document === 'undefined') return;
  document.cookie = 'auth_token=; path=/; max-age=0';
};

// Generic fetch wrapper
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  return response;
};

// Auth API
export const authAPI = {
  signUp: async (
    email: string,
    password: string,
    name: string,
    role: 'patient' | 'doctor',
    phone?: string
  ) => {
    const response = await apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, role, phone }),
    });
    const data = await response.json();
    if (data.success && data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  signIn: async (email: string, password: string) => {
    const response = await apiRequest('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success && data.token) {
      setAuthToken(data.token);
    }
    return data;
  },

  signOut: () => {
    removeAuthToken();
  },

  getCurrentUser: async () => {
    const response = await apiRequest('/auth/me');
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data.success ? data.user : null;
  },
};

// Consultations API
export const consultationsAPI = {
  create: async (consultationData: any) => {
    const response = await apiRequest('/consultations', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
    return response.json();
  },

  getByPatient: async () => {
    const response = await apiRequest('/consultations/patient');
    const data = await response.json();
    return data.success ? data.consultations : [];
  },

  getByDoctor: async () => {
    const response = await apiRequest('/consultations/doctor');
    const data = await response.json();
    return data.success ? data.consultations : [];
  },

  getById: async (id: string) => {
    const response = await apiRequest(`/consultations/${id}`);
    const data = await response.json();
    return data.success ? data.consultation : null;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await apiRequest(`/consultations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return response.json();
  },
};

// Prescriptions API
export const prescriptionsAPI = {
  create: async (prescriptionData: any) => {
    const response = await apiRequest('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(prescriptionData),
    });
    return response.json();
  },

  getByPatient: async (patientId: string) => {
    const response = await apiRequest(`/prescriptions/patient/${patientId}`);
    const data = await response.json();
    return data.success ? data.prescriptions : [];
  },

  getByConsultation: async (consultationId: string) => {
    const response = await apiRequest(`/prescriptions/consultation/${consultationId}`);
    const data = await response.json();
    return data.success ? data.prescription : null;
  },

  getById: async (id: string) => {
    const response = await apiRequest(`/prescriptions/${id}`);
    const data = await response.json();
    return data.success ? data.prescription : null;
  },
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  },

  uploadMultiple: async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/upload/multiple`, {
      method: 'POST',
      headers,
      body: formData,
    });

    return response.json();
  },
};

