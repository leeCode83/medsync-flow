import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, FileText, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { patientDataCategories, mockFacilities } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const DataTransfer: React.FC = () => {
  const { referralId } = useParams<{ referralId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get referral data from navigation state
  const referralData = location.state;
  
  // Get selected facility info
  const selectedFacility = mockFacilities.find(f => f.id === referralData?.facilityId);

  // State for selected data categories
  const [selectedData, setSelectedData] = useState<string[]>([
    'Patient Vitals',
    'Medical History',
    'Lab Results',
    'Doctor\'s Notes'
  ]);

  const handleDataToggle = (category: string) => {
    setSelectedData(prev => 
      prev.includes(category)
        ? prev.filter(d => d !== category)
        : [...prev, category]
    );
  };

  const handleSubmitTransfer = () => {
    if (selectedData.length === 0) {
      alert('Please select at least one data category to transfer');
      return;
    }

    // Show success toast
    toast({
      title: "Referral Request Sent",
      description: `Your referral request has been sent to ${selectedFacility?.name} and is awaiting approval. Patient data will be transferred securely upon approval.`,
    });

    // Navigate back to dashboard
    navigate('/');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Patient Vitals': return <Heart className="h-4 w-4" />;
      case 'Medical History': return <FileText className="h-4 w-4" />;
      case 'Lab Results': return <FileText className="h-4 w-4" />;
      case 'Doctor\'s Notes': return <FileText className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  if (!referralData || !selectedFacility) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Invalid referral data. Please try again.</p>
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
        <h1 className="text-3xl font-bold text-foreground">Secure Patient Data Transfer</h1>
        <p className="text-muted-foreground mt-1">
          Select patient data to transfer securely via blockchain protocol
        </p>
      </div>

      {/* Referral Summary */}
      <Card className="medical-card border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Referral Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Destination Facility</p>
              <p className="font-semibold text-foreground">{selectedFacility.name}</p>
              <p className="text-sm text-muted-foreground">{selectedFacility.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Referral ID</p>
              <p className="font-mono text-sm text-foreground">{referralId}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Diagnosis</p>
              <p className="font-semibold text-foreground">{referralData.diagnosis}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Required Procedures</p>
              <p className="font-semibold text-foreground">{referralData.procedures.join(', ')}</p>
            </div>
          </div>
          {referralData.urgency && (
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">Urgency Level</p>
              <span className={`status-indicator ${
                referralData.urgency === 'High' ? 'status-high' :
                referralData.urgency === 'Medium' ? 'status-medium' : 'status-low'
              }`}>
                {referralData.urgency} Priority
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Selection */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Select Patient Data to Transfer
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose which patient data categories to include in the secure transfer. 
            Data will only be released after approval from the receiving facility.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientDataCategories.map((category) => (
              <label 
                key={category}
                className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedData.includes(category)
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedData.includes(category)}
                  onChange={() => handleDataToggle(category)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2 flex-1">
                  {getCategoryIcon(category)}
                  <span className="font-medium text-foreground">{category}</span>
                </div>
                {selectedData.includes(category) && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </label>
            ))}
          </div>

          {selectedData.length > 0 && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Selected Data Categories:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedData.map((category) => (
                  <span key={category} className="px-2 py-1 bg-primary text-primary-foreground text-sm rounded">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blockchain Security Info */}
      <Card className="medical-card border-success/20 bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-success" />
            Secure Transfer Protocol
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium text-foreground">Conditional Transfer</p>
                <p className="text-sm text-muted-foreground">
                  Patient data will be encrypted and held securely until the receiving facility approves the referral.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium text-foreground">Approval Required</p>
                <p className="text-sm text-muted-foreground">
                  The receiving facility must approve the referral before any patient data is transferred.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium text-foreground">Automated Transfer</p>
                <p className="text-sm text-muted-foreground">
                  Upon approval, selected data will be automatically and securely transferred to the receiving facility.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button 
          onClick={() => navigate('/referral/new')}
          variant="outline"
          className="flex-1"
        >
          Back to Referral
        </Button>
        <Button 
          onClick={handleSubmitTransfer}
          className="flex-1 medical-button-primary"
          disabled={selectedData.length === 0}
        >
          <Shield className="h-4 w-4 mr-2" />
          Send Secure Referral Request
        </Button>
      </div>
    </div>
  );
};

export default DataTransfer;