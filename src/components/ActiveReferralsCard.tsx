import React, { useState } from 'react';
import { Calendar, Eye, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReferralRequest } from '@/lib/mock-data';
import ReferralDetailModal from './ReferralDetailModal'; // Import the modal

interface ActiveReferralsCardProps {
  referrals: ReferralRequest[];
}

const ActiveReferralsCard: React.FC<ActiveReferralsCardProps> = ({ referrals }) => {
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

  return (
    <>
      <Card className="medical-card p-0">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-1 text-lg">
            <Calendar className="h-5 w-5 text-primary" />
            Active Referrals
            {referrals.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {referrals.length}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <p className="text-muted-foreground text-center py-2">
              No active referrals found.
            </p>
          ) : (
            <div className="space-y-2">
              {referrals.map((referral) => (
                <div key={referral.id} className="border border-border rounded-lg p-3 transition-all hover:shadow-md">
                  {/* Top section */}
                  <div className="flex items-start justify-between">
                    {/* Left side: Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {referral.patient.name} - {referral.diagnosis}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Referred on: {referral.createdAt.toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        For: <strong>{referral.specialist}</strong>
                      </p>
                    </div>
                    {/* Right side: Status */}
                    <div className="ml-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'Approved' 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-amber-700 bg-amber-100'
                      }`}>
                        {referral.status}
                      </span>
                    </div>
                  </div>
                  {/* Bottom section */}
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

export default ActiveReferralsCard;
