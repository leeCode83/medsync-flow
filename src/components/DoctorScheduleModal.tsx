import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Doctor } from '@/lib/mock-data';

interface DoctorScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
}

const DoctorScheduleModal: React.FC<DoctorScheduleModalProps> = ({ isOpen, onClose, doctors }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const specialties = ['All', ...Array.from(new Set(doctors.map(d => d.specialty)))];

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Doctor Weekly Schedule</DialogTitle>
          <DialogDescription>
            On-duty schedules for specialist doctors. Use the filter to select a specialty.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4">
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filter by specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map(specialty => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-auto border rounded-lg" style={{ maxHeight: '60vh' }}>
          <Table>
            <TableHeader className="sticky top-0 bg-card">
              <TableRow>
                <TableHead className="font-semibold">Doctor</TableHead>
                <TableHead className="font-semibold">Specialty</TableHead>
                {weekDays.map(day => (
                  <TableHead key={day} className="text-center">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map(doctor => (
                <TableRow key={doctor.id}>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  {weekDays.map(day => (
                    <TableCell key={day} className="text-center text-xs">
                      {doctor.schedule[day] || 'Off-duty'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorScheduleModal;
