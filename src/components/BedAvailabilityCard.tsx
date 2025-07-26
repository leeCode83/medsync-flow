import React from 'react';
import { Bed, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { RadialBar, RadialBarChart } from 'recharts';

interface BedAvailabilityCardProps {
  availableBeds: number;
  totalBeds: number;
  crowdLevel: 'Low' | 'Medium' | 'High';
}

const BedAvailabilityCard: React.FC<BedAvailabilityCardProps> = ({
  availableBeds,
  totalBeds,
  crowdLevel,
}) => {
  const occupancyRate = totalBeds > 0 ? ((totalBeds - availableBeds) / totalBeds) * 100 : 0;
  const chartData = [{ name: 'Occupancy', value: occupancyRate, fill: 'var(--color-occupancy)' }];

  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'status-low';
      case 'Medium': return 'status-medium';
      case 'High': return 'status-high';
      default: return 'status-low';
    }
  };

  return (
    <Card className="medical-card flex flex-col p-0">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Bed className="h-5 w-5 text-primary" />
          Facility Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="relative flex-1 flex items-center justify-center">
          <ChartContainer
            config={{
              occupancy: {
                label: 'Occupancy',
                color: 'hsl(var(--chart-1))',
              },
            }}
            className="mx-auto aspect-square h-40 w-full" // Increased size for better spacing
          >
            <RadialBarChart
              data={chartData}
              startAngle={180}
              endAngle={0}
              innerRadius={80} // Adjusted innerRadius
              outerRadius={100} // Adjusted outerRadius
              barSize={12}
              cy="60%"
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <RadialBar
                dataKey="value"
                background={{ fill: 'hsl(var(--muted))' }}
                cornerRadius={10}
              />
            </RadialBarChart>
          </ChartContainer>
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold text-foreground mt-4">
              {availableBeds}/{totalBeds}
            </p>
            <p className="text-1xl text-muted-foreground">
              Available
            </p>
          </div>
        </div>
        {/* <div className="text-center">
          <p className="text-sm text-muted-foreground ">
            Total Beds: {totalBeds}
          </p>
        </div> */}
        <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
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
