// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getProductById, getEMIPlans } from '../services/api';
// import VariantSelector from '../components/VariantSelector';
// import EMIPlanSelector from '../components/EMIPlanSelector';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [emiPlans, setEmiPlans] = useState([]);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const productData = await getProductById(id);
//         setProduct(productData);
//         setSelectedVariant(productData.variants[0]);

//         const plansData = await getEMIPlans(productData._id);
//         setEmiPlans(plansData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleProceed = () => {
//     if (!selectedPlan) {
//       alert('Please select an EMI plan');
//       return;
//     }
//     alert(`Proceeding with ${selectedVariant.name} - ₹${selectedPlan.monthlyPayment}/month for ${selectedPlan.tenure} months`);
//   };

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   if (!product) {
//     return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <img 
//                 src={product.image} 
//                 alt={product.name}
//                 className="w-full rounded-lg"
//               />
//             </div>
            
//             <div>
//               <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//               <div className="mb-4">
//                 <span className="text-gray-500 line-through text-xl">₹{product.mrp.toLocaleString()}</span>
//                 <span className="text-3xl font-bold text-green-600 ml-3">₹{product.price.toLocaleString()}</span>
//               </div>

//               <VariantSelector 
//                 variants={product.variants}
//                 selectedVariant={selectedVariant}
//                 onSelectVariant={setSelectedVariant}
//               />

//               <EMIPlanSelector 
//                 plans={emiPlans}
//                 onSelectPlan={setSelectedPlan}
//               />

//               <button 
//                 onClick={handleProceed}
//                 disabled={!selectedPlan}
//                 className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//               >
//                 Proceed with Selected Plan
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, getEMIPlans } from '../services/api';
import VariantSelector from '../components/VariantSelector';
import EMIPlanSelector from '../components/EMIPlanSelector';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPlans, setShowPlans] = useState(false); // New state for showing plans

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductById(id);
        console.log("id:",id);
        setProduct(productData);
        setSelectedVariant(productData.variants[0]);

        const plansData = await getEMIPlans(productData._id);
        console.log("pData",productData);
        setEmiPlans(plansData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleProceedToSelectPlans = () => {
    setShowPlans(true); // Show the EMI plans
  };

  const handleFinalProceed = () => {
    if (!selectedPlan) {
      alert('Please select an EMI plan');
      return;
    }
    alert(`Proceeding with ${selectedVariant.name} - ₹${selectedPlan.monthlyPayment}/month for ${selectedPlan.tenure} months`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="mb-4">
                <span className="text-gray-500 line-through text-xl">₹{product.mrp.toLocaleString()}</span>
                <span className="text-3xl font-bold text-green-600 ml-3">₹{product.price.toLocaleString()}</span>
              </div>

              <VariantSelector 
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />

              {/* Show button to reveal plans if plans are hidden */}
              {!showPlans ? (
                <button 
                  onClick={handleProceedToSelectPlans}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Select Plans
                </button>
              ) : (
                <>
                  {/* Show EMI plans and final proceed button */}
                  <EMIPlanSelector 
                    plans={emiPlans}
                    onSelectPlan={setSelectedPlan}
                  />

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setShowPlans(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleFinalProceed}
                      disabled={!selectedPlan}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Confirm & Proceed
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;