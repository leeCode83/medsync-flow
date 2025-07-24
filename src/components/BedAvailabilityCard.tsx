import React from 'react';
import { Bed, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BedAvailabilityCardProps {
  availableBeds: number;
  totalBeds: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
}

const BedAvailabilityCard: React.FC<BedAvailabilityCardProps> = ({
  availableBeds,
  totalBeds,
  crowdLevel
}) => {
  const occupancyRate = ((totalBeds - availableBeds) / totalBeds) * 100;
  
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'status-low';
      case 'Medium': return 'status-medium';
      case 'High': return 'status-high';
      default: return 'status-low';
    }
  };

  return (
    <Card className="medical-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bed className="h-5 w-5 text-primary" />
          Facility Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {availableBeds}
            </p>
            <p className="text-sm text-muted-foreground">
              Available Beds (of {totalBeds})
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-muted-foreground">
              {occupancyRate.toFixed(0)}%
            </p>
            <p className="text-sm text-muted-foreground">Occupancy</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Crowd Level:</span>
          </div>
          <span className={`status-indicator ${getCrowdLevelColor(crowdLevel)}`}>
            {crowdLevel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BedAvailabilityCard;