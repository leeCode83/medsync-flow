import React from 'react';
import { History, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReferralRequest } from '@/lib/mock-data';

interface ReferralHistoryCardProps {
  title: string;
  referrals: ReferralRequest[];
  type: 'incoming' | 'outgoing';
}

const ReferralHistoryCard: React.FC<ReferralHistoryCardProps> = ({
  title,
  referrals,
  type
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Rejected': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'Pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="medical-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5 text-primary" />
          {title}
          {referrals.length > 0 && (
            <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
              {referrals.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {referrals.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No {type} referrals found
          </p>
        ) : (
          <div className="space-y-3">
            {referrals.slice(0, 5).map((referral) => (
              <div key={referral.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {referral.diagnosis}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <span>{type === 'outgoing' ? referral.fromFacility : referral.toFacility}</span>
                      <ArrowRight className="h-3 w-3" />
                      <span>{type === 'outgoing' ? referral.toFacility : referral.fromFacility}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {referral.createdAt.toLocaleDateString()} at {referral.createdAt.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(referral.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                      {referral.status}
                    </span>
                  </div>
                </div>
                
                {referral.requiredProcedures.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Procedures: {referral.requiredProcedures.join(', ')}
                  </p>
                )}
                
                {referral.rejectionReason && referral.status === 'Rejected' && (
                  <p className="text-xs text-red-600 mt-1 p-2 bg-red-50 rounded">
                    Rejection reason: {referral.rejectionReason}
                  </p>
                )}
              </div>
            ))}
            
            {referrals.length > 5 && (
              <p className="text-center text-sm text-muted-foreground pt-2">
                ... and {referrals.length - 5} more
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralHistoryCard;