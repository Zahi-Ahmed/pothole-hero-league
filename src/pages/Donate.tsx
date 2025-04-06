
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Heart, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DonationOption = ({ 
  amount, 
  description, 
  isSelected, 
  onSelect 
}: { 
  amount: number; 
  description: string; 
  isSelected: boolean; 
  onSelect: () => void 
}) => (
  <div 
    className={`p-6 rounded-xl cursor-pointer transition-all ${
      isSelected ? 'bg-primary/10 border-2 border-primary' : 'bg-white border border-gray-200 hover:border-primary/50'
    }`}
    onClick={onSelect}
  >
    <div className="mb-2 font-bold text-2xl text-charcoal">₹{amount}</div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const Donate: React.FC = () => {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const donationOptions = [
    { amount: 100, description: "Fix a small pothole" },
    { amount: 500, description: "Repair a medium-sized pothole" },
    { amount: 1000, description: "Help fix a large, dangerous pothole" },
    { amount: 5000, description: "Support repairs for an entire section of road" },
  ];
  
  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === '' || /^\d+$/.test(value)) {
      setCustomAmount(value);
      setSelectedAmount(null);
    }
  };
  
  const getFinalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount);
    return null;
  };
  
  const handleDonate = () => {
    const amount = getFinalAmount();
    if (!amount) {
      toast({
        title: "No amount selected",
        description: "Please select or enter a donation amount",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate payment processing with timeout
    setTimeout(() => {
      // In a real implementation, this is where you would integrate with Razorpay
      setIsLoading(false);
      setIsSuccess(true);
      
      toast({
        title: "Thank you for your donation!",
        description: `Your contribution of ₹${amount} will help fix potholes.`,
      });
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-card p-8 text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full mx-auto flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-charcoal mb-2">Donation Successful!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your generous contribution. Together, we're making our roads safer.
              </p>
              <button 
                onClick={() => setIsSuccess(false)} 
                className="btn-primary inline-flex items-center gap-2"
              >
                <Heart size={18} />
                Make Another Donation
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full">
                  <Shield size={32} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-charcoal mb-2">Support Our Mission</h1>
                <p className="text-gray-600 max-w-lg mx-auto">
                  Your donations help us maintain our servers, develop new features, and expand our impact to more communities.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-charcoal mb-4">Choose a Donation Amount</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {donationOptions.map((option) => (
                      <DonationOption
                        key={option.amount}
                        amount={option.amount}
                        description={option.description}
                        isSelected={selectedAmount === option.amount}
                        onSelect={() => handleSelectAmount(option.amount)}
                      />
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Or enter a custom amount (₹)
                    </label>
                    <input
                      type="text"
                      id="custom-amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter amount"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg mb-6">
                    <AlertCircle size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-gray-700 text-sm">
                        This is a demo payment page. In a real implementation, clicking "Donate Now" would open the Razorpay payment gateway.
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDonate}
                    disabled={isLoading || !getFinalAmount()}
                    className={`
                      w-full btn-primary flex items-center justify-center gap-2
                      ${(isLoading || !getFinalAmount()) ? 'opacity-70 cursor-not-allowed' : ''}
                    `}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Heart size={18} />
                        Donate Now
                      </>
                    )}
                  </button>
                  
                  <p className="mt-4 text-sm text-gray-500 text-center">
                    Your donation will help us fix more potholes and make our roads safer for everyone.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
