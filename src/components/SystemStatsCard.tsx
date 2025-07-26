import React from 'react';
import { BarChart, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facility } from '@/lib/mock-data';

interface SystemStatsCardProps {
  facilities: Facility[];
  onOpenSchedule: () => void;
}

const SystemStatsCard: React.FC<SystemStatsCardProps> = ({ facilities, onOpenSchedule }) => {
  const busiestFacilities = [...facilities]
    .sort((a, b) => b.recentActivity - a.recentActivity)
    .slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          System Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Busiest Facilities (Last 24h)
          </h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {busiestFacilities.map((facility, index) => (
              <li key={facility.id} className="flex justify-between">
                <span>{index + 1}. {facility.name}</span>
                <span className="font-medium text-foreground">{facility.recentActivity} referrals</span>
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={onOpenSchedule} className="w-full" variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Doctor Schedules
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemStatsCard;
