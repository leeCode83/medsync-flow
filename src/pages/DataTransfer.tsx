import React, { useState } from 'react';
import ReferralHistoryCard from '@/components/ReferralHistoryCard';
import { mockReferralRequests, ReferralRequest } from '@/lib/mock-data';

const DataTransfer: React.FC = () => {
  const [referralRequests] = useState<ReferralRequest[]>(mockReferralRequests);
  const referralHistory = referralRequests.filter(r => r.status === 'Completed' || r.status === 'Rejected');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Transfer History</h1>
        <p className="text-muted-foreground mt-1">
          View all incoming and outgoing completed or rejected referrals.
        </p>
      </div>
      <div className="w-full">
        <ReferralHistoryCard referrals={referralHistory} />
      </div>
    </div>
  );
};

export default DataTransfer;
