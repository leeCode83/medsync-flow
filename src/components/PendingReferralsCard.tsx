import React, { useState } from 'react';
import { Clock, Check, X, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReferralRequest } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';
import ReferralDetailModal from './ReferralDetailModal';

interface PendingReferralsCardProps {
  pendingReferrals: ReferralRequest[];
  onApprove: (referralId: string) => void;
  onReject: (referralId: string, reason?: string) => void;
}

const PendingReferralsCard: React.FC<PendingReferralsCardProps> = ({
  pendingReferrals,
  onApprove,
  onReject,
}) => {
  const { toast } = useToast();
  const [selectedReferral, setSelectedReferral] = useState<ReferralRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (referral: ReferralRequest) => {
    setSelectedReferral(referral);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReferral(null);
  };

  const handleApproveClick = (e: React.MouseEvent, referral: ReferralRequest) => {
    e.stopPropagation();
    onApprove(referral.id);
    toast({
      title: 'Referral Approved',
      description: `Referral for ${referral.patient.name} has been approved.`,
    });
  };

  const handleRejectClick = (e: React.MouseEvent, referral: ReferralRequest) => {
    e.stopPropagation();
    const reason = prompt('Please provide a reason for rejection (optional):');
    onReject(referral.id, reason || undefined);
    toast({
      title: 'Referral Rejected',
      description: `Referral for ${referral.patient.name} has been rejected.`,
      variant: 'destructive',
    });
  };

  return (
    <>
      <Card className="medical-card p-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-1 text-lg">
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
            <p className="text-muted-foreground text-center py-2">
              No pending referral requests
            </p>
          ) : (
            <div className="space-y-2">
              {pendingReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="border border-border rounded-lg p-3 transition-all hover:shadow-md"
                >
                  {/* Top Section */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {referral.patient.name} - {referral.diagnosis}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        From: {referral.fromFacility}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                        onClick={(e) => handleApproveClick(e, referral)}
                      >
                        <Check className="h-4 w-4 mr-0" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-100 text-red-700 hover:bg-red-200"
                        onClick={(e) => handleRejectClick(e, referral)}
                      >
                        <X className="h-4 w-4 mr-0" />
                        Reject
                      </Button>
                    </div>
                  </div>
                  {/* Bottom Section */}
                  <div className="mt-3 flex items-center border-t border-border pt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(referral)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ReferralDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        referral={selectedReferral}
      />
    </>
  );
};

export default PendingReferralsCard;
