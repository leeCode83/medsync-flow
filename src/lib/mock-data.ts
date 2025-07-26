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
  gender: 'Male' | 'Female' | 'Other';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
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
  allergies: string[];
  medications: { name: string; dosage: string; frequency: string }[];
  labResults: { test: string; result: string; date: string }[];
  doctorNotes: string;
}

export interface ReferralRequest {
  id: string;
  patient: Patient;
  fromFacility: string;
  toFacility: string;
  specialist: string;
  diagnosis: string;
  requiredProcedures: string[];
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  selectedData: string[];
  createdAt: Date;
  notes?: string;
  rejectionReason?: string;
}

// Define our main facility for context
export const OUR_FACILITY = "St. Mary's General Hospital";

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
  // Neurology
  {
    id: 'd2',
    name: 'Dr. Ben Adams',
    specialty: 'Neurology',
    schedule: { Tuesday: '8am - 4pm', Thursday: '11am - 7pm' }
  },
  // Emergency Medicine
  {
    id: 'd3',
    name: 'Dr. Olivia Chen',
    specialty: 'Emergency Medicine',
    schedule: { Monday: '2pm - 10pm', Tuesday: '2pm - 10pm', Friday: '6pm - 2am', Saturday: '6pm - 2am' }
  },
  // Orthopedics
  {
    id: 'd4',
    name: 'Dr. James Rodriguez',
    specialty: 'Orthopedics',
    schedule: { Monday: '9am - 5pm', Tuesday: '9am - 1pm (Surgery)', Thursday: '9am - 5pm' }
  },
];

// Mock patients data
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Anderson',
    age: 65,
    gender: 'Male',
    bloodType: 'O+',
    diagnosis: 'Acute Coronary Syndrome',
    requiredProcedures: ['Angiography', 'ECG', 'Cardiac Enzyme Test'],
    address: '142 Pine St, Residential Area',
    vitals: {
      bloodPressure: '145/92',
      heartRate: 95,
      temperature: 98.7,
      oxygenSaturation: 94
    },
    medicalHistory: ['Hypertension', 'Type 2 Diabetes', 'Previous Heart Attack (2019)'],
    allergies: ['Penicillin'],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' },
    ],
    labResults: [
      { test: 'Troponin I', result: '0.8 ng/mL (Elevated)', date: '2024-07-20' },
      { test: 'Cholesterol', result: '220 mg/dL (High)', date: '2024-07-15' },
    ],
    doctorNotes: 'Patient presented with severe chest pain radiating to the left arm. ECG shows ST-segment elevation. Suspected myocardial infarction. Requires urgent cardiac catheterization.'
  },
  {
    id: 'p2',
    name: 'Sarah Williams',
    age: 34,
    gender: 'Female',
    bloodType: 'A-',
    diagnosis: 'Suspected Appendicitis',
    requiredProcedures: ['Abdominal CT Scan', 'Complete Blood Count (CBC)'],
    address: '789 Oak Ave, Suburbia',
    vitals: {
      bloodPressure: '120/80',
      heartRate: 102,
      temperature: 101.2,
      oxygenSaturation: 98
    },
    medicalHistory: ['No significant past medical history'],
    allergies: ['None'],
    medications: [],
    labResults: [
      { test: 'White Blood Cell Count', result: '15,000/uL (Elevated)', date: '2024-07-21' },
    ],
    doctorNotes: 'Patient reports sharp pain in the lower right abdomen, nausea, and fever. Physical exam shows rebound tenderness. High suspicion for appendicitis; needs imaging to confirm before surgery.'
  },
  {
    id: 'p3',
    name: 'David Chen',
    age: 72,
    gender: 'Male',
    bloodType: 'B+',
    diagnosis: 'Ischemic Stroke',
    requiredProcedures: ['Head CT Scan', 'Neurological Assessment'],
    address: '555 Maple Dr, City Center',
    vitals: {
      bloodPressure: '160/100',
      heartRate: 80,
      temperature: 98.5,
      oxygenSaturation: 96
    },
    medicalHistory: ['Atrial Fibrillation', 'High Cholesterol'],
    allergies: ['None'],
    medications: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily' },
      { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily' },
    ],
    labResults: [
      { test: 'INR', result: '2.5', date: '2024-07-20' },
    ],
    doctorNotes: 'Patient presented with sudden onset of left-sided weakness and facial droop. NIH Stroke Scale score is 8. Urgent CT needed to rule out hemorrhage before considering thrombolytic therapy.'
  },
  {
    id: 'p4',
    name: 'Maria Garcia',
    age: 58,
    gender: 'Female',
    bloodType: 'AB+',
    diagnosis: 'Severe Pneumonia',
    requiredProcedures: ['Chest X-Ray', 'Sputum Culture'],
    address: '101 River Rd, West End',
    vitals: {
      bloodPressure: '130/85',
      heartRate: 110,
      temperature: 102.5,
      oxygenSaturation: 91
    },
    medicalHistory: ['COPD', 'Smoker'],
    allergies: ['Sulfa drugs'],
    medications: [
      { name: 'Albuterol Inhaler', dosage: 'As needed', frequency: 'q4h' },
    ],
    labResults: [
      { test: 'CRP', result: '150 mg/L (Elevated)', date: '2024-07-22' },
    ],
    doctorNotes: 'Patient has worsening shortness of breath and productive cough. Chest X-ray shows consolidation in the right lower lobe. Requires admission for IV antibiotics and respiratory support.'
  },
  {
    id: 'p5',
    name: 'James Brown',
    age: 45,
    gender: 'Male',
    bloodType: 'B-',
    diagnosis: 'Kidney Stone',
    requiredProcedures: ['Ultrasound', 'Urology Consult'],
    address: '212 Stone Ave, Northside',
    vitals: {
      bloodPressure: '150/95',
      heartRate: 90,
      temperature: 99.0,
      oxygenSaturation: 99
    },
    medicalHistory: ['Previous kidney stones'],
    allergies: ['None'],
    medications: [
      { name: 'Ibuprofen', dosage: '600mg', frequency: 'As needed for pain' },
    ],
    labResults: [
      { test: 'Urinalysis', result: 'Hematuria', date: '2024-07-22' },
    ],
    doctorNotes: 'Patient presents with severe flank pain. High suspicion for obstructive kidney stone. Needs imaging to confirm size and location for urology intervention.'
  }
];

// Mock referral requests
export const mockReferralRequests: ReferralRequest[] = [
  // Active Referrals (for other cards)
  {
    id: 'r1',
    patient: mockPatients[0],
    fromFacility: 'Community Health Clinic',
    toFacility: OUR_FACILITY, // Ingoing, Approved
    specialist: 'Cardiology',
    diagnosis: 'Acute Coronary Syndrome',
    requiredProcedures: ['Angiography', 'ECG'],
    urgency: 'High',
    status: 'Approved',
    selectedData: ['Patient Vitals', 'Medical History', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    notes: 'Urgent cardiac case requiring immediate attention'
  },
  {
    id: 'r2',
    patient: mockPatients[1],
    fromFacility: OUR_FACILITY,
    toFacility: 'Metropolitan Medical Center', // Outgoing, Approved
    specialist: 'General Surgery',
    diagnosis: 'Suspected Appendicitis',
    requiredProcedures: ['CT Scan', 'Surgery'],
    urgency: 'High',
    status: 'Approved',
    selectedData: ['Patient Vitals', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 'r3',
    patient: mockPatients[2],
    fromFacility: 'City Emergency Center',
    toFacility: 'University Teaching Hospital', // Not involving us, but pending
    specialist: 'Neurology',
    diagnosis: 'Ischemic Stroke',
    requiredProcedures: ['Head CT Scan', 'Neurological Assessment'],
    urgency: 'High',
    status: 'Pending',
    selectedData: ['Patient Vitals', 'Medical History', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    notes: 'Patient is within the window for tPA administration. Time is critical.'
  },
  
  // History: Outgoing from OUR_FACILITY
  {
    id: 'r4',
    patient: mockPatients[0],
    fromFacility: OUR_FACILITY,
    toFacility: 'Metropolitan Medical Center',
    specialist: 'Cardiology',
    diagnosis: 'Follow-up Consultation',
    requiredProcedures: ['Echocardiogram'],
    urgency: 'Medium',
    status: 'Completed',
    selectedData: ['Medical History', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'r5',
    patient: mockPatients[1],
    fromFacility: OUR_FACILITY,
    toFacility: 'University Teaching Hospital',
    specialist: 'Orthopedics',
    diagnosis: 'Post-operative Checkup',
    requiredProcedures: ['X-Ray'],
    urgency: 'Low',
    status: 'Completed',
    selectedData: ['Medical History', 'Lab Results'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'r6',
    patient: mockPatients[0],
    fromFacility: OUR_FACILITY,
    toFacility: 'City Emergency Center',
    specialist: 'Emergency Medicine',
    diagnosis: 'Trauma Care',
    requiredProcedures: ['X-Ray'],
    urgency: 'High',
    status: 'Rejected',
    rejectionReason: 'Facility at full capacity',
    selectedData: ['Patient Vitals', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },

  // History: Ingoing to OUR_FACILITY
  {
    id: 'r9',
    patient: mockPatients[3],
    fromFacility: 'Metropolitan Medical Center',
    toFacility: OUR_FACILITY,
    specialist: 'Pulmonology',
    diagnosis: 'Pneumonia Follow-up',
    requiredProcedures: ['Chest X-Ray'],
    urgency: 'Low',
    status: 'Completed',
    selectedData: ['Medical History', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'r10',
    patient: mockPatients[4],
    fromFacility: 'Regional Specialty Institute',
    toFacility: OUR_FACILITY,
    specialist: 'Urology',
    diagnosis: 'Post-op Kidney Stone',
    requiredProcedures: ['Ultrasound'],
    urgency: 'Medium',
    status: 'Completed',
    selectedData: ['Medical History', 'Lab Results'],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },

  // Pending (for other card)
  {
    id: 'r7',
    patient: mockPatients[3],
    fromFacility: 'Community Health Clinic',
    toFacility: 'Metropolitan Medical Center',
    specialist: 'Pulmonology',
    diagnosis: 'Severe Pneumonia',
    requiredProcedures: ['Chest X-Ray', 'IV Antibiotics'],
    urgency: 'High',
    status: 'Pending',
    selectedData: ['Patient Vitals', 'Medical History', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
    notes: 'Patient requires immediate admission and respiratory support.'
  },
  {
    id: 'r8',
    patient: mockPatients[4],
    fromFacility: 'Downtown Urgent Care',
    toFacility: 'Regional Specialty Institute',
    specialist: 'Urology',
    diagnosis: 'Kidney Stone',
    requiredProcedures: ['Ultrasound', 'Urology Consult'],
    urgency: 'Medium',
    status: 'Pending',
    selectedData: ['Patient Vitals', 'Lab Results', 'Doctor\'s Notes'],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    notes: 'Patient in significant pain, requires urgent consultation.'
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

// Get active referrals
export function getActiveReferrals(): ReferralRequest[] {
  return mockReferralRequests.filter(r => r.status === 'Approved' || r.status === 'Pending');
}

// Get pending referrals
export function getPendingReferrals(): ReferralRequest[] {
  return mockReferralRequests.filter(r => r.status === 'Pending');
}

// Get referral history
export function getReferralHistory(): ReferralRequest[] {
  return mockReferralRequests.filter(r => r.status === 'Completed' || r.status === 'Rejected');
}

// Get system stats
export function getSystemStats() {
  const totalReferrals = mockReferralRequests.length;
  const successfulReferrals = mockReferralRequests.filter(r => r.status === 'Completed').length;
  const averageTransferTime = 35; // in minutes, mock value
  const patientSatisfaction = 92; // percentage, mock value
  
  return {
    totalReferrals,
    successfulReferrals,
    averageTransferTime,
    patientSatisfaction
  };
}