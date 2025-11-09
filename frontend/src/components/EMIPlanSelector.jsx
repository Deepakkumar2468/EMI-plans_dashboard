import React, { useState } from 'react';

const EMIPlanSelector = ({ plans, onSelectPlan }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    onSelectPlan(plan);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">EMI Plans</h3>
      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            onClick={() => handleSelect(plan)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan?._id === plan._id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-lg">₹{plan.monthlyPayment.toLocaleString()}/month</div>
                <div className="text-sm text-gray-600">
                  {plan.tenure} months • {plan.interestRate}% interest
                </div>
                {plan.cashback > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Cashback: ₹{plan.cashback.toLocaleString()}
                  </div>
                )}
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${
                selectedPlan?._id === plan._id
                  ? 'border-green-600 bg-green-600'
                  : 'border-gray-300'
              }`}>
                {selectedPlan?._id === plan._id && (
                  <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EMIPlanSelector;