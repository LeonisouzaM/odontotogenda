
import React from 'react';

interface PasswordStrengthIndicatorProps {
  passwordStrength: number;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ passwordStrength }) => {
  return (
    <div className="mt-1">
      <div className="text-xs mb-1 flex justify-between">
        <span>Força da senha:</span>
        <span>
          {passwordStrength === 0 && "Fraca"}
          {passwordStrength === 1 && "Média"}
          {passwordStrength === 2 && "Forte"}
        </span>
      </div>
      <div className="flex gap-1 h-1">
        <div 
          className={`w-1/3 rounded-l ${
            passwordStrength >= 1 ? "bg-yellow-500" : "bg-gray-300"
          }`}
        />
        <div 
          className={`w-1/3 ${
            passwordStrength >= 1 ? "bg-yellow-500" : "bg-gray-300"
          }`}
        />
        <div 
          className={`w-1/3 rounded-r ${
            passwordStrength >= 2 ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
