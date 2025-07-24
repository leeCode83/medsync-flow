// Mock data for MedSync Healthcare Referral System

export interface Facility {
  id: string;
  name: string;
  address: string;
  distance: number; // in km
  availableBeds: number;
  totalBeds: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
  capabilities: string[];
  specialties: string[];
  recentActivity: number; // e.g., number of referrals in the last 24h
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  schedule: Record<string, string>; // e.g., { "Monday": "9am - 5pm", ... }
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  requiredProcedures: string[];
  address: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
  };
  medicalHistory: string[];
  labResults: string[];
  doctorNotes: string;
}

export interface ReferralRequest {
  id: string;
  patientId: string;
  fromFacility: string;
  toFacility: string;
  diagnosis: string;
  requiredProcedures: string[];
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  selectedData: string[];
  createdAt: Date;
  notes?: string;
  rejectionReason?: string;
}

// Mock facilities data
export const mockFacilities: Facility[] = [
  {
    id: 'f1',
    name: 'St. Mary\'s General Hospital',
    address: '123 Healthcare Ave, Medical District',
    distance: 2.5,
    availableBeds: 15,
    totalBeds: 50,
    crowdLevel: 'Low',
    capabilities: ['MRI', 'CT Scan', 'X-Ray', 'Ultrasound', 'ECG'],
    specialties: ['Cardiology', 'Neurology', 'Emergency Medicine', 'Surgery'],
    recentActivity: 25
  },
  {
    id: 'f2',
    name: 'Metropolitan Medical Center',
    address: '456 Main St, Downtown',
    distance: 5.2,
    availableBeds: 8,
    totalBeds: 75,
    crowdLevel: 'Medium',
    capabilities: ['MRI', 'CT Scan', 'X-Ray', 'Ultrasound', 'ECG', 'Angiography'],
    specialties: ['Cardiology', 'Oncology', 'Orthopedics', 'Emergency Medicine'],
    recentActivity: 42
  },
  {
    id: 'f3',
    name: 'University Teaching Hospital',
    address: '789 University Blvd, Academic Quarter',
    distance: 8.1,
    availableBeds: 22,
    totalBeds: 120,
    crowdLevel: 'Low',
    capabilities: ['MRI', 'CT Scan', 'X-Ray', 'Ultrasound', 'ECG', 'Angiography', 'PET Scan'],
    specialties: ['Cardiology', 'Neurology', 'Oncology', 'Pediatrics', 'Surgery', 'Research'],
    recentActivity: 31
  },
  {
    id: 'f4',
    name: 'City Emergency Center',
    address: '321 Emergency Way, Central',
    distance: 3.8,
    availableBeds: 5,
    totalBeds: 30,
    crowdLevel: 'High',
    capabilities: ['X-Ray', 'Ultrasound', 'ECG', 'Basic Surgery'],
    specialties: ['Emergency Medicine', 'Trauma', 'Critical Care'],
    recentActivity: 58
  },
  {
    id: 'f5',
    name: 'Regional Specialty Institute',
    address: '654 Specialist Dr, Medical Campus',
    distance: 12.3,
    availableBeds: 18,
    totalBeds: 60,
    crowdLevel: 'Medium',
    capabilities: ['MRI', 'CT Scan', 'X-Ray', 'Ultrasound', 'ECG', 'Angiography', 'PET Scan', 'Advanced Surgery'],
    specialties: ['Cardiology', 'Neurosurgery', 'Oncology', 'Transplant', 'Research'],
    recentActivity: 29
  }
];

// Mock doctors data
export const mockDoctors: Doctor[] = [
  // Cardiology
  {
    id: 'd1',
    name: 'Dr. Emily Carter',
    specialty: 'Cardiology',
    schedule: { Monday: '9am - 5pm', Wednesday: '10am - 6pm', Friday: '8am - 4pm' }
  },
  {
    id: 'd5',
    name: 'Dr. Johnathan Lee',
    specialty: 'Cardiology',
    schedule: { Tuesday: '9am - 5pm', Thursday: '10am - 6pm', Saturday: '9am - 1pm' }
  },
  {
    id: 'd6',
    name: 'Dr. Sophia Garcia',
    specialty: 'Cardiology',
    schedule: { Monday: '8am - 4pm', Wednesday: '9am - 5pm', Friday: '10am - 6pm' }
  },
  {
    id: 'd7',
    name: 'Dr. Michael Brown',
    specialty: 'Cardiology',
    schedule: { Tuesday: '10am - 6pm', Thursday: '8am - 4pm' }
  },
  // Neurology
  {
    id: 'd2',
    name: 'Dr. Ben Adams',
    specialty: 'Neurology',
    schedule: { Tuesday: '8am - 4pm', Thursday: '11am - 7pm' }
  },
  {
    id: 'd8',
    name: 'Dr. Chloe Kim',
    specialty: 'Neurology',
    schedule: { Monday: '10am - 6pm', Wednesday: '8am - 4pm', Friday: '9am - 5pm' }
  },
  {
    id: 'd9',
    name: 'Dr. David Martinez',
    specialty: 'Neurology',
    schedule: { Monday: '9am - 5pm', Thursday: '9am - 5pm' }
  },
  {
    id: 'd10',
    name: 'Dr. Laura Wilson',
    specialty: 'Neurology',
    schedule: { Wednesday: '10am - 6pm', Friday: '8am - 4pm' }
  },
  // Emergency Medicine
  {
    id: 'd3',
    name: 'Dr. Olivia Chen',
    specialty: 'Emergency Medicine',
    schedule: { Monday: '2pm - 10pm', Tuesday: '2pm - 10pm', Friday: '6pm - 2am', Saturday: '6pm - 2am' }
  },
  {
    id: 'd11',
    name: 'Dr. Daniel Taylor',
    specialty: 'Emergency Medicine',
    schedule: { Wednesday: '10pm - 6am', Thursday: '10pm - 6am', Sunday: '8pm - 4am' }
  },
  {
    id: 'd12',
    name: 'Dr. Hannah Wright',
    specialty: 'Emergency Medicine',
    schedule: { Monday: '6am - 2pm', Tuesday: '6am - 2pm', Saturday: '8am - 4pm' }
  },
  {
    id: 'd13',
    name: 'Dr. Chris Evans',
    specialty: 'Emergency Medicine',
    schedule: { Wednesday: '8am - 8pm', Sunday: '8am - 8pm' }
  },
  // Orthopedics
  {
    id: 'd4',
    name: 'Dr. James Rodriguez',
    specialty: 'Orthopedics',
    schedule: { Monday: '9am - 5pm', Tuesday: '9am - 1pm (Surgery)', Thursday: '9am - 5pm' }
  },
  {
    id: 'd14',
    name: 'Dr. Jessica Miller',
    specialty: 'Orthopedics',
    schedule: { Wednesday: '8am - 4pm', Friday: '9am - 5pm' }
  },
  {
    id: 'd15',
    name: 'Dr. Brian Clark',
    specialty: 'Orthopedics',
    schedule: { Tuesday: '1pm - 7pm', Thursday: '8am - 12pm (Surgery)' }
  },
  {
    id: 'd16',
    name: 'Dr. Sarah Davis',
    specialty: 'Orthopedics',
    schedule: { Monday: '10am - 6pm', Friday: '10am - 6pm' }
  }
];

// Mock patients data
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Anderson',
    age: 65,
    diagnosis: 'Cardiac Arrest',
    requiredProcedures: ['Angiography', 'ECG'],
    address: '142 Pine St, Residential Area',
    vitals: {
      bloodPressure: '140/90',
      heartRate: 88,
      temperature: 98.6,
      oxygenSaturation: 95
    },
    medicalHistory: ['Hypertension', 'Type 2 Diabetes', 'Previous Heart Attack (2019)'],
    labResults: ['Elevated Cholesterol', 'High Blood Sugar', 'Abnormal ECG'],
    doctorNotes: 'Patient presented with chest pain and shortness of breath. Requires immediate cardiac intervention.'
  },
  {
    id: 'p2',
    name: 'Sarah Williams',
    age: 34,
    diagnosis: 'Appendicitis',
    requiredProcedures: ['CT Scan', 'Surgery'],
    address: '789 Oak Ave, Suburbia',
    vitals: {
      bloodPressure: '120/80',
      heartRate: 102,
      temperature: 101.2,
      oxygenSaturation: 98
    },
    medicalHistory: ['No significant past medical history'],
    labResults: ['Elevated White Blood Cell Count', 'Signs of Inflammation'],
    doctorNotes: 'Patient experiencing severe abdominal pain. CT scan confirms acute appendicitis requiring immediate surgical intervention.'
  }
];

// Mock referral requests
export const mockReferralRequests: ReferralRequest[] = [
  {
    id: 'r1',
    patientId: 'p1',
    fromFacility: 'Community Health Clinic',
    toFacility: 'St. Mary\'s General Hospital',
    diagnosis: 'Cardiac Arrest',
    requiredProcedures: ['Angiography', 'ECG'],
    urgency: 'High',
    status: 'Pending',
    selectedData: ['Patient Vitals', 'Medical History', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    notes: 'Urgent cardiac case requiring immediate attention'
  },
  {
    id: 'r2',
    patientId: 'p2',
    fromFacility: 'Downtown Urgent Care',
    toFacility: 'Metropolitan Medical Center',
    diagnosis: 'Appendicitis',
    requiredProcedures: ['CT Scan', 'Surgery'],
    urgency: 'High',
    status: 'Approved',
    selectedData: ['Patient Vitals', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'r3',
    patientId: 'p1',
    fromFacility: "St. Mary's General Hospital",
    toFacility: 'Metropolitan Medical Center',
    diagnosis: 'Follow-up Consultation',
    requiredProcedures: ['Cardiology'],
    urgency: 'Medium',
    status: 'Completed',
    selectedData: ['Medical History', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'r4',
    patientId: 'p2',
    fromFacility: "St. Mary's General Hospital",
    toFacility: 'University Teaching Hospital',
    diagnosis: 'Specialist Evaluation',
    requiredProcedures: ['Neurology'],
    urgency: 'Low',
    status: 'Approved',
    selectedData: ['Medical History', 'Lab Results'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'r5',
    patientId: 'p1',
    fromFacility: "St. Mary's General Hospital",
    toFacility: 'City Emergency Center',
    diagnosis: 'Trauma Care',
    requiredProcedures: ['X-Ray'],
    urgency: 'High',
    status: 'Rejected',
    rejectionReason: 'Facility at full capacity',
    selectedData: ['Patient Vitals', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'r6',
    patientId: 'p2',
    fromFacility: "St. Mary's General Hospital",
    toFacility: 'Regional Specialty Institute',
    diagnosis: 'Oncology Consultation',
    requiredProcedures: ['PET Scan'],
    urgency: 'Medium',
    status: 'Completed',
    selectedData: ['Medical History', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  }
];

// Available medical procedures
export const medicalProcedures = [
  'MRI Scan',
  'CT Scan',
  'X-Ray',
  'Ultrasound',
  'ECG',
  'Angiography',
  'PET Scan',
  'Blood Test',
  'Surgery',
  'Endoscopy',
  'Biopsy',
  'Dialysis'
];

// Common diagnoses
export const commonDiagnoses = [
  'Cardiac Arrest',
  'Appendicitis',
  'Pneumonia',
  'Stroke',
  'Heart Attack',
  'Diabetes Emergency',
  'Severe Asthma',
  'Kidney Stones',
  'Fracture',
  'Severe Allergic Reaction',
  'Internal Bleeding',
  'Seizure Disorder'
];

// Patient data categories that can be transferred
export const patientDataCategories = [
  'Patient Vitals',
  'Medical History',
  'Lab Results',
  'Doctor\'s Notes',
  'Medication List',
  'Allergy Information',
  'Emergency Contacts',
  'Insurance Information'
];

// Calculate facility score for recommendations
export function calculateFacilityScore(
  facility: Facility,
  requiredProcedures: string[],
  diagnosis: string
): number {
  let score = 0;
  
  // Distance score (closer is better, max 30 points)
  const distanceScore = Math.max(0, 30 - facility.distance * 2);
  score += distanceScore;
  
  // Availability score (more beds available is better, max 25 points)
  const availabilityRatio = facility.availableBeds / facility.totalBeds;
  const availabilityScore = availabilityRatio * 25;
  score += availabilityScore;
  
  // Capability score (having required equipment, max 30 points)
  const hasAllCapabilities = requiredProcedures.every(proc => 
    facility.capabilities.some(cap => cap.toLowerCase().includes(proc.toLowerCase()))
  );
  if (hasAllCapabilities) score += 30;
  else {
    const matchingCapabilities = requiredProcedures.filter(proc =>
      facility.capabilities.some(cap => cap.toLowerCase().includes(proc.toLowerCase()))
    );
    score += (matchingCapabilities.length / requiredProcedures.length) * 30;
  }
  
  // Crowd level score (lower crowd is better, max 15 points)
  const crowdScore = facility.crowdLevel === 'Low' ? 15 : 
                    facility.crowdLevel === 'Medium' ? 10 : 5;
  score += crowdScore;
  
  return Math.round(score);
}

// Get recommended facilities based on patient needs
export function getRecommendedFacilities(
  requiredProcedures: string[],
  diagnosis: string,
  patientAddress: string
): Array<Facility & { score: number; reasons: string[] }> {
  return mockFacilities
    .map(facility => {
      const score = calculateFacilityScore(facility, requiredProcedures, diagnosis);
      const reasons: string[] = [];
      
      // Add reasons for recommendation
      if (facility.distance <= 5) reasons.push('Close proximity');
      if (facility.availableBeds / facility.totalBeds > 0.3) reasons.push('High availability');
      if (facility.crowdLevel === 'Low') reasons.push('Low crowd level');
      
      const hasAllCapabilities = requiredProcedures.every(proc => 
        facility.capabilities.some(cap => cap.toLowerCase().includes(proc.toLowerCase()))
      );
      if (hasAllCapabilities) reasons.push('Has all required equipment');
      
      return { ...facility, score, reasons };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}