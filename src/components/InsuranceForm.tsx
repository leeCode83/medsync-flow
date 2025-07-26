// src/components/InsuranceForm.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield } from 'lucide-react';

const InsuranceForm: React.FC = () => {
  const [hasBpjs, setHasBpjs] = React.useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Insurance Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="hasBpjs" checked={hasBpjs} onCheckedChange={(checked) => setHasBpjs(checked as boolean)} />
          <Label htmlFor="hasBpjs" className="font-medium">Patient has BPJS?</Label>
        </div>
        {hasBpjs && (
          <div className="space-y-4 pt-2 border-t border-border">
            <div className="space-y-2">
              <Label htmlFor="bpjsNumber">BPJS Number</Label>
              <Input id="bpjsNumber" placeholder="Enter 13-digit BPJS number" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InsuranceForm;
