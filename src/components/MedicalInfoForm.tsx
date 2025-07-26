// src/components/MedicalInfoForm.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Stethoscope, FileUp, FlaskConical } from 'lucide-react';

const MedicalInfoForm: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          Medical Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Diagnosis */}
        <div className="space-y-2">
          <Label htmlFor="currentDiagnosis">Current Diagnosis from Referring Facility</Label>
          <Input id="currentDiagnosis" placeholder="e.g., Acute Myocardial Infarction" />
        </div>
        
        {/* Medical History */}
        <div className="space-y-2">
          <Label htmlFor="medicalHistory">Relevant Medical History</Label>
          <Textarea 
            id="medicalHistory" 
            placeholder="List previous conditions, surgeries, or relevant medical history."
            className="min-h-[100px]"
          />
        </div>

        {/* Allergies */}
        <div className="space-y-2">
          <Label htmlFor="allergies">Known Allergies</Label>
          <Textarea 
            id="allergies" 
            placeholder="e.g., Penicillin, Peanuts"
            className="min-h-[60px]"
          />
        </div>

        {/* Lab Results */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            Previous Lab Results
          </Label>
          <div className="border border-dashed border-border rounded-lg p-6 text-center">
            <FileUp className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag & drop files here, or click to browse.
            </p>
            <Button variant="outline" className="mt-4">
              <FileUp className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG (Max 5MB each)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalInfoForm;
