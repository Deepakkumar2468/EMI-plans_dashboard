import React from 'react';

const VariantSelector = ({ variants, selectedVariant, onSelectVariant }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Select Variant</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {variants.map((variant) => (
          <button
            key={variant._id}
            onClick={() => onSelectVariant(variant)}
            className={`p-3 border-2 rounded-lg transition-all ${
              selectedVariant?._id === variant._id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-medium">{variant.name}</div>
            <div className="text-sm text-gray-600">{variant.storage || variant.color}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariantSelector;