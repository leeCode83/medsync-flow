import React from 'react';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReferralRequest } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

interface PendingReferralsCardProps {
  pendingReferrals: ReferralRequest[];
  onApprove: (referralId: string) => void;
  onReject: (referralId: string, reason?: string) => void;
}

const PendingReferralsCard: React.FC<PendingReferralsCardProps> = ({
  pendingReferrals,
  onApprove,
  onReject
}) => {
  const { toast } = useToast();

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'High': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'Medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Low': return <Clock className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleApprove = (referral: ReferralRequest) => {
    onApprove(referral.id);
    toast({
      title: "Referral Approved",
      description: `Patient data has been securely received. Referral for ${referral.diagnosis} approved.`,
    });
  };

  const handleReject = (referral: ReferralRequest) => {
    const reason = prompt("Please provide a reason for rejection (optional):");
    onReject(referral.id, reason || undefined);
    toast({
      title: "Referral Rejected",
      description: `Referral for ${referral.diagnosis} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="medical-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Pending Referral Requests
          {pendingReferrals.length > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
              {pendingReferrals.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingReferrals.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No pending referral requests
          </p>
        ) : (
          <div className="space-y-4">
            {pendingReferrals.map((referral) => (
              <div key={referral.id} className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getUrgencyIcon(referral.urgency)}
                      <h4 className="font-semibold text-foreground">
                        {referral.diagnosis}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(referral.urgency)}`}>
                        {referral.urgency} Priority
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      From: <span className="font-medium">{referral.fromFacility}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Procedures: {referral.requiredProcedures.join(', ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Requested: {referral.createdAt.toLocaleString()}
                    </p>
                    {referral.notes && (
                      <p className="text-sm text-foreground mt-2 p-2 bg-muted rounded">
                        <strong>Notes:</strong> {referral.notes}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2 border-t border-border">
                  <Button
                    onClick={() => handleApprove(referral)}
                    className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(referral)}
                    variant="destructive"
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingReferralsCard;