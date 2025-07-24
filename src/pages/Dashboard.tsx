import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BedAvailabilityCard from '@/components/BedAvailabilityCard';
import PendingReferralsCard from '@/components/PendingReferralsCard';
import ReferralHistoryCard from '@/components/ReferralHistoryCard';
import { mockReferralRequests, ReferralRequest } from '@/lib/mock-data';

const Dashboard: React.FC = () => {
  // Mock current facility data
  const currentFacility = {
    availableBeds: 15,
    totalBeds: 50,
    crowdLevel: 'Low' as const
  };

  // State for referral requests
  const [referralRequests, setReferralRequests] = useState<ReferralRequest[]>(mockReferralRequests);

  // Filter referrals by status and type
  const pendingReferrals = referralRequests.filter(r => r.status === 'Pending');
  const incomingReferrals = referralRequests.filter(r => r.status !== 'Pending');
  const outgoingReferrals = referralRequests.filter(r => r.fromFacility === 'St. Mary\'s General Hospital');

  const handleApproveReferral = (referralId: string) => {
    setReferralRequests(prev => 
      prev.map(referral => 
        referral.id === referralId 
          ? { ...referral, status: 'Approved' as const }
          : referral
      )
    );
  };

  const handleRejectReferral = (referralId: string, reason?: string) => {
    setReferralRequests(prev => 
      prev.map(referral => 
        referral.id === referralId 
          ? { ...referral, status: 'Rejected' as const, rejectionReason: reason }
          : referral
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Facility Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            St. Mary's General Hospital - Medical District
          </p>
        </div>
        <Link to="/referral/new">
          <Button className="medical-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create New Referral
          </Button>
        </Link>
      </div>

      {/* Top Row - Facility Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BedAvailabilityCard
          availableBeds={currentFacility.availableBeds}
          totalBeds={currentFacility.totalBeds}
          crowdLevel={currentFacility.crowdLevel}
        />
        
        <div className="lg:col-span-2">
          <PendingReferralsCard
            pendingReferrals={pendingReferrals}
            onApprove={handleApproveReferral}
            onReject={handleRejectReferral}
          />
        </div>
      </div>

      {/* Bottom Row - Referral History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReferralHistoryCard
          title="Incoming Referral History"
          referrals={incomingReferrals}
          type="incoming"
        />
        
        <ReferralHistoryCard
          title="Outgoing Referral History"
          referrals={outgoingReferrals}
          type="outgoing"
        />
      </div>
    </div>
  );
};

export default Dashboard;