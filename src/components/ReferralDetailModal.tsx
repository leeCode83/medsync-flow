
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReferralRequest } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Stethoscope,
  Building,
  FileText,
  HeartPulse,
  FlaskConical,
  Pill,
  AlertTriangle,
  ClipboardList,
} from 'lucide-react';

interface ReferralDetailModalProps {
  referral: ReferralRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReferralDetailModal: React.FC<ReferralDetailModalProps> = ({
  referral,
  isOpen,
  onClose,
}) => {
  if (!referral) return null;

  const { patient } = referral;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Referral Details</DialogTitle>
          <DialogDescription>
            Detailed information for referral ID: {referral.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 max-h-[70vh] overflow-y-auto">
          {/* Referral Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Referral Information
            </h3>
            <div className="card-content">
              <p><strong>From:</strong> {referral.fromFacility}</p>
              <p><strong>To:</strong> {referral.toFacility}</p>
              <p><strong>Specialist:</strong> {referral.specialist}</p>
              <p><strong>Urgency:</strong> <Badge variant={referral.urgency === 'High' ? 'destructive' : 'default'}>{referral.urgency}</Badge></p>
              <p><strong>Status:</strong> <Badge variant={referral.status === 'Pending' ? 'secondary' : 'default'}>{referral.status}</Badge></p>
              <p><strong>Required Procedures:</strong></p>
              <ul className="list-disc list-inside">
                {referral.requiredProcedures.map((proc, i) => <li key={i}>{proc}</li>)}
              </ul>
              {referral.notes && <p><strong>Notes:</strong> {referral.notes}</p>}
            </div>
          </div>

          {/* Patient Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-primary flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient Information
            </h3>
            <div className="card-content">
              <p><strong>Name:</strong> {patient.name}</p>
              <p><strong>Age:</strong> {patient.age}</p>
              <p><strong>Gender:</strong> {patient.gender}</p>
              <p><strong>Blood Type:</strong> {patient.bloodType}</p>
              <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>
            </div>
          </div>

          {/* Medical Data */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="font-semibold text-lg text-primary flex items-center">
              <ClipboardList className="mr-2 h-5 w-5" />
              Shared Medical Data
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Vitals */}
              <div className="card-content">
                <h4 className="font-semibold flex items-center mb-2"><HeartPulse className="mr-2 h-4 w-4" />Vitals</h4>
                <p>BP: {patient.vitals.bloodPressure}</p>
                <p>HR: {patient.vitals.heartRate} bpm</p>
                <p>Temp: {patient.vitals.temperature}°F</p>
                <p>O2 Sat: {patient.vitals.oxygenSaturation}%</p>
              </div>

              {/* Lab Results */}
              <div className="card-content">
                <h4 className="font-semibold flex items-center mb-2"><FlaskConical className="mr-2 h-4 w-4" />Lab Results</h4>
                {patient.labResults.map((lab, i) => (
                  <p key={i}><strong>{lab.test}:</strong> {lab.result} ({lab.date})</p>
                ))}
              </div>

              {/* Medications */}
              <div className="card-content">
                <h4 className="font-semibold flex items-center mb-2"><Pill className="mr-2 h-4 w-4" />Medications</h4>
                <ul className="list-disc list-inside">
                  {patient.medications.map((med, i) => (
                    <li key={i}>{med.name} ({med.dosage}, {med.frequency})</li>
                  ))}
                </ul>
              </div>

              {/* Allergies */}
              <div className="card-content">
                <h4 className="font-semibold flex items-center mb-2"><AlertTriangle className="mr-2 h-4 w-4" />Allergies</h4>
                <ul className="list-disc list-inside">
                  {patient.allergies.map((allergy, i) => <li key={i}>{allergy}</li>)}
                </ul>
              </div>

              {/* Medical History */}
              <div className="col-span-1 lg:col-span-2 card-content">
                <h4 className="font-semibold flex items-center mb-2"><Stethoscope className="mr-2 h-4 w-4" />Medical History</h4>
                <p>{patient.medicalHistory.join(', ')}</p>
              </div>
              
              {/* Doctor's Notes */}
              <div className="col-span-1 lg:col-span-2 card-content">
                <h4 className="font-semibold flex items-center mb-2"><FileText className="mr-2 h-4 w-4" />Doctor's Notes</h4>
                <p className="italic">"{patient.doctorNotes}"</p>
              </div>
            </div>
          </div>
        </div>
        {/* <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default ReferralDetailModal;

// Add some basic styling to card-content class for reusability
const style = document.createElement('style');
style.innerHTML = `
  .card-content {
    @apply border border-border rounded-lg p-3 bg-muted/50;
  }
`;
document.head.appendChild(style);
