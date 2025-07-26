import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PatientInfoForm from '@/components/PatientInfoForm';
import InsuranceForm from '@/components/InsuranceForm';
import MedicalInfoForm from '@/components/MedicalInfoForm';
import { mockFacilities } from '@/lib/mock-data'; // Assuming facilities can be fetched

const DataTransfer: React.FC = () => {
  const { referralId } = useParams<{ referralId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Find the facility details from mock data
  const facility = mockFacilities.find(f => f.id === state?.facilityId);

  const handleSubmit = () => {
    // Here you would typically gather all form data and send it to a server
    console.log('Submitting data for referral:', referralId, 'to facility:', facility?.name);
    alert(`Patient data for referral ${referralId} has been prepared for transfer to ${facility?.name}.`);
    navigate('/'); // Navigate back to dashboard or a confirmation page
  };

  if (!state || !facility) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Invalid Referral</h1>
        <p className="text-muted-foreground">
          No referral data found. Please start a new referral.
        </p>
        <Button onClick={() => navigate('/referral/new')} className="mt-4">
          Create New Referral
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Patient Data Transfer</h1>
        <p className="text-muted-foreground mt-1">
          Complete the patient's data to be sent for the referral.
        </p>
      </div>

      {/* Referral Details Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Referral Details</CardTitle>
          <CardDescription>
            You are preparing to transfer patient data for the following referral:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="font-medium">
              <p className="text-sm text-muted-foreground">To Facility</p>
              <p className="text-lg text-foreground">{facility.name}</p>
            </div>
            <ArrowRight className="h-6 w-6 text-muted-foreground" />
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Diagnosis</p>
              <p className="text-lg text-foreground">{state.diagnosis}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Sections */}
      <div className="space-y-6">
        <PatientInfoForm />
        <InsuranceForm />
        <MedicalInfoForm />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button size="lg" onClick={handleSubmit}>
          <Send className="h-4 w-4 mr-2" />
          Confirm and Prepare Data Transfer
        </Button>
      </div>
    </div>
  );
};

export default DataTransfer;
