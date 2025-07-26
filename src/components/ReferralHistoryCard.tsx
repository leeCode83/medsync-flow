import React, { useState, useMemo } from 'react';
import { History, ArrowRight, CheckCircle, XCircle, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReferralRequest, OUR_FACILITY } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ReferralHistoryCardProps {
  referrals: ReferralRequest[];
}

type FilterType = 'outgoing' | 'ingoing';

const ReferralHistoryCard: React.FC<ReferralHistoryCardProps> = ({ referrals }) => {
  const [filter, setFilter] = useState<FilterType>('outgoing');

  const filteredReferrals = useMemo(() => {
    return referrals.filter(r => {
      if (filter === 'outgoing') return r.fromFacility === OUR_FACILITY;
      if (filter === 'ingoing') return r.toFacility === OUR_FACILITY;
      return false;
    });
  }, [referrals, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-blue-600 bg-blue-100';
      case 'Rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card className="medical-card p-0">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="flex items-center gap-1 text-lg">
          <History className="h-5 w-5 text-primary" />
          Referral History
        </CardTitle>
        <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
          <Button
            variant={filter === 'outgoing' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('outgoing')}
            className="h-8 px-3"
          >
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Outgoing
          </Button>
          <Button
            variant={filter === 'ingoing' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('ingoing')}
            className="h-8 px-3"
          >
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Ingoing
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredReferrals.length === 0 ? (
          <p className="text-muted-foreground text-center py-2">
            No {filter} referrals found.
          </p>
        ) : (
          <div className="space-y-2">
            {filteredReferrals.map((referral) => (
              <div key={referral.id} className="border border-border rounded-lg p-3 transition-all hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {referral.patient.name} - {referral.diagnosis}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{referral.fromFacility}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{referral.toFacility}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(referral.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      getStatusColor(referral.status)
                    )}>
                      {referral.status}
                    </span>
                  </div>
                </div>
                
                {referral.rejectionReason && referral.status === 'Rejected' && (
                  <p className="text-xs text-red-600 mt-2 p-2 bg-red-50/50 rounded border border-red-100">
                    <strong>Reason:</strong> {referral.rejectionReason}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralHistoryCard;
