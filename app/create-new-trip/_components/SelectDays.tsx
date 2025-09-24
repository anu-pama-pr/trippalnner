'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface SelectDaysProps {
  onSelectOption: (days: string) => void;
}

const SelectDays = ({ onSelectOption }: SelectDaysProps) => {
  const [days, setDays] = useState<number>(1);

  const incrementDays = () => {
    setDays(prev => prev + 1);
  };

  const decrementDays = () => {
    if (days > 1) {
      setDays(prev => prev - 1);
    }
  };

  const handleConfirm = () => {
    onSelectOption(`${days} days`);
  };

  return (
    <div className="mt-3 p-4 bg-white border rounded-lg">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-800">How many days do you want to travel?</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={decrementDays}
          variant="outline"
          className="w-10 h-10 p-0 rounded-full"
        >
          -
        </Button>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{days}</div>
          <div className="text-sm text-gray-600">Days</div>
        </div>
        
        <Button
          onClick={incrementDays}
          variant="outline"
          className="w-10 h-10 p-0 rounded-full"
        >
          +
        </Button>
      </div>

      <Button
        onClick={handleConfirm}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Confirm
      </Button>
    </div>
  );
};

export default SelectDays;