import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Activity, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getRecommendedFacilities, 
  medicalProcedures, 
  commonDiagnoses, 
  Facility 
} from '@/lib/mock-data';
import { provinces, City, District } from '@/lib/address-data';

const NewReferral: React.FC = () => {
  const navigate = useNavigate();
  const recommendationsRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    diagnosis: '',
    otherDiagnosis: '',
    procedures: [] as string[],
    otherProcedure: '',
    address: {
      province: '',
      city: '',
      district: '',
      fullAddress: ''
    },
    urgency: '',
    notes: ''
  });

  // Derived state for cascading dropdowns
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const cities = useMemo(() => {
    if (!selectedProvince) return [];
    return provinces.find(p => p.id === selectedProvince)?.cities || [];
  }, [selectedProvince]);

  const districts = useMemo(() => {
    if (!selectedCity) return [];
    return cities.find(c => c.id === selectedCity)?.districts || [];
  }, [selectedCity, cities]);


  // Results state
  const [recommendations, setRecommendations] = useState<Array<Facility & { score: number; reasons: string[] }>>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof formData.address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));

    if (field === 'province') {
      setSelectedProvince(value);
      setSelectedCity('');
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, city: '', district: '' }
      }));
    }
    if (field === 'city') {
      setSelectedCity(value);
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, district: '' }
      }));
    }
  };

  const handleProcedureToggle = (procedure: string) => {
    setFormData(prev => ({
      ...prev,
      procedures: prev.procedures.includes(procedure)
        ? prev.procedures.filter(p => p !== procedure)
        : [...prev.procedures, procedure]
    }));
  };

  const handleGetRecommendations = () => {
    const finalDiagnosis = formData.diagnosis === 'Other' ? formData.otherDiagnosis : formData.diagnosis;
    const finalProcedures = formData.procedures.includes('Other') 
      ? [...formData.procedures.filter(p => p !== 'Other'), formData.otherProcedure]
      : formData.procedures;

    if (!finalDiagnosis || finalProcedures.length === 0) {
      alert('Please fill in diagnosis and select at least one procedure');
      return;
    }

    const provinceName = provinces.find(p => p.id === formData.address.province)?.name || '';
    const cityName = cities.find(c => c.id === formData.address.city)?.name || '';
    const districtName = districts.find(d => d.id === formData.address.district)?.name || '';

    const fullAddress = [
      formData.address.fullAddress,
      districtName,
      cityName,
      provinceName,
    ].filter(Boolean).join(', ');


    const results = getRecommendedFacilities(
      finalProcedures,
      finalDiagnosis,
      fullAddress
    );
    
    setRecommendations(results);
    setShowRecommendations(true);
    setTimeout(() => {
      recommendationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectFacility = (facilityId: string) => {
    setSelectedFacility(facilityId);
  };

  const handleRequestReferral = () => {
    if (!selectedFacility) {
      alert('Please select a facility');
      return;
    }

    const finalDiagnosis = formData.diagnosis === 'Other' ? formData.otherDiagnosis : formData.diagnosis;
    const finalProcedures = formData.procedures.includes('Other')
      ? [...formData.procedures.filter(p => p !== 'Other'), formData.otherProcedure]
      : formData.procedures;

    // Generate a referral ID and navigate to data transfer page
    const referralId = `ref_${Date.now()}`;
    navigate(`/referral/data-transfer/${referralId}`, {
      state: {
        facilityId: selectedFacility,
        diagnosis: finalDiagnosis,
        procedures: finalProcedures,
        urgency: formData.urgency,
        notes: formData.notes
      }
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const finalDiagnosis = formData.diagnosis === 'Other' ? formData.otherDiagnosis : formData.diagnosis;
  const finalProcedures = formData.procedures.includes('Other')
    ? [...formData.procedures.filter(p => p !== 'Other'), formData.otherProcedure]
    : formData.procedures;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Referral</h1>
        <p className="text-muted-foreground mt-1">
          Find the best facility for your patient's needs
        </p>
      </div>

      {/* Referral Form */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Patient Information & Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Diagnosis */}
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Primary Diagnosis *</Label>
            <Select value={formData.diagnosis} onValueChange={(value) => handleInputChange('diagnosis', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary diagnosis" />
              </SelectTrigger>
              <SelectContent>
                {commonDiagnoses.map(diagnosis => (
                  <SelectItem key={diagnosis} value={diagnosis}>{diagnosis}</SelectItem>
                ))}
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {formData.diagnosis === 'Other' && (
              <Input
                placeholder="Please specify other diagnosis"
                value={formData.otherDiagnosis}
                onChange={(e) => handleInputChange('otherDiagnosis', e.target.value)}
                className="medical-input mt-2"
              />
            )}
          </div>

          {/* Required Procedures */}
          <div className="space-y-2">
            <Label>Required Medical Procedures *</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {medicalProcedures.map(procedure => (
                <label key={procedure} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.procedures.includes(procedure)}
                    onChange={() => handleProcedureToggle(procedure)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{procedure}</span>
                </label>
              ))}
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.procedures.includes('Other')}
                  onChange={() => handleProcedureToggle('Other')}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-foreground">Other</span>
              </label>
            </div>
            {formData.procedures.includes('Other') && (
              <Input
                placeholder="Please specify other procedure"
                value={formData.otherProcedure}
                onChange={(e) => handleInputChange('otherProcedure', e.target.value)}
                className="medical-input mt-2"
              />
            )}
          </div>

          {/* Patient Address */}
          <div className="space-y-4">
            <Label>Patient's Residential Address</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Province */}
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={formData.address.province} onValueChange={(value) => handleAddressChange('province', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City/Regency</Label>
                <Select value={formData.address.city} onValueChange={(value) => handleAddressChange('city', value)} disabled={!selectedProvince}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City/Regency" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {/* District */}
              <div className="space-y-2">
                <Label htmlFor="district">District</Label>
                <Select value={formData.address.district} onValueChange={(value) => handleAddressChange('district', value)} disabled={!selectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullAddress">Full Address</Label>
              <Textarea
                id="fullAddress"
                placeholder="Enter street name, building, house number, etc."
                value={formData.address.fullAddress}
                onChange={(e) => handleAddressChange('fullAddress', e.target.value)}
                className="medical-input"
              />
            </div>
          </div>


          {/* Urgency */}
          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low Priority</SelectItem>
                <SelectItem value="Medium">Medium Priority</SelectItem>
                <SelectItem value="High">High Priority - Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the patient or case"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="medical-input min-h-[100px]"
            />
          </div>

          {/* Get Recommendations Button */}
          <Button 
            onClick={handleGetRecommendations}
            className="w-full medical-button-primary"
            disabled={!finalDiagnosis || finalProcedures.length === 0}
          >
            <Search className="h-4 w-4 mr-2" />
            Get Facility Recommendations
          </Button>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {showRecommendations && (
        <div ref={recommendationsRef}>
          <Card className="medical-card mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Top 5 Recommended Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((facility, index) => (
                  <div 
                    key={facility.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedFacility === facility.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleSelectFacility(facility.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <h3 className="font-semibold text-foreground text-lg">
                            {facility.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          {facility.address}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(facility.score)}`}>
                          Score: {facility.score}/100
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-2 bg-muted rounded">
                        <p className="text-lg font-bold text-foreground">{facility.distance} km</p>
                        <p className="text-xs text-muted-foreground">Distance</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <p className="text-lg font-bold text-foreground">{facility.availableBeds}/{facility.totalBeds}</p>
                        <p className="text-xs text-muted-foreground">Available Beds</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <span className={`status-indicator ${
                          facility.crowdLevel === 'Low' ? 'status-low' :
                          facility.crowdLevel === 'Medium' ? 'status-medium' : 'status-high'
                        }`}>
                          {facility.crowdLevel}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Crowd Level</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Reasons for Recommendation:</p>
                      <div className="flex flex-wrap gap-1">
                        {facility.reasons.map((reason, idx) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedFacility === facility.id && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Button 
                          onClick={handleRequestReferral}
                          className="w-full medical-button-primary"
                        >
                          Request Referral to this Facility
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NewReferral;