
import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { Heart, Shield, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
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
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  
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
  
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  
  const handleDonate = async () => {
    const amount = getFinalAmount();
    if (!amount) {
      toast({
        title: "No amount selected",
        description: "Please select or enter a donation amount",
        variant: "destructive",
      });
      return;
    }
    
    if (!donorName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!donorEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorEmail)) {
      toast({
        title: "Valid email required",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Load Razorpay script
    const res = await loadRazorpay();
    
    if (!res) {
      toast({
        title: "Razorpay failed to load",
        description: "Please check your internet connection",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Razorpay options
    const options = {
      key: "rzp_test_YourRazorpayTestKey", // Replace with your actual Razorpay key
      amount: amount * 100, // Amount in paise
      currency: "INR",
      name: "Team Nexium",
      description: "Donation for pothole repair",
      image: "https://via.placeholder.com/128",
      handler: function(response: any) {
        // Handle successful payment
        setIsLoading(false);
        setIsSuccess(true);
        
        // Save donation details to localStorage
        const donationDetails = {
          id: response.razorpay_payment_id,
          amount: amount,
          name: donorName,
          email: donorEmail,
          date: new Date().toISOString(),
        };
        
        const existingDonations = JSON.parse(localStorage.getItem('donations') || '[]');
        localStorage.setItem('donations', JSON.stringify([...existingDonations, donationDetails]));
        
        toast({
          title: "Thank you for your donation!",
          description: `Your contribution of ₹${amount} will help fix potholes.`,
        });
      },
      prefill: {
        name: donorName,
        email: donorEmail,
      },
      theme: {
        color: "#4169E1",
      },
      modal: {
        ondismiss: function() {
          setIsLoading(false);
          toast({
            title: "Payment cancelled",
            description: "You can try again when you're ready.",
            variant: "destructive",
          });
        },
      },
    };
    
    // Initialize Razorpay
    const razorpayWindow = new (window as any).Razorpay(options);
    razorpayWindow.open();
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We need your support to make our roads safer and more accessible. Your donations help us 
                  maintain our servers, develop new features, and expand our impact to more communities across India. 
                  Team Nexium is committed to binding citizens and government together for the betterment of our country.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-2">
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
                    
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="text-xl font-semibold text-charcoal mb-4">Your Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="donor-name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="donor-name"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="donor-email" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="donor-email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
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
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-card overflow-hidden p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-accent" />
                    <h2 className="text-xl font-semibold text-charcoal">Your Impact</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/5 rounded-xl">
                      <h3 className="font-medium text-charcoal mb-2">₹100</h3>
                      <p className="text-sm text-gray-600">
                        Helps fix a small pothole that could damage vehicles.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-secondary/5 rounded-xl">
                      <h3 className="font-medium text-charcoal mb-2">₹500</h3>
                      <p className="text-sm text-gray-600">
                        Repairs a medium-sized pothole that could cause accidents.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-accent/5 rounded-xl">
                      <h3 className="font-medium text-charcoal mb-2">₹1000+</h3>
                      <p className="text-sm text-gray-600">
                        Helps repair major road damage and prevents accidents.
                      </p>
                    </div>
                    
                    <div className="text-center mt-6">
                      <p className="text-sm text-gray-600 italic">
                        "The true measure of any society can be found in how it treats its most vulnerable citizens."
                      </p>
                      <p className="text-sm font-medium mt-1">- Mahatma Gandhi</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 text-center">
                <h3 className="text-xl font-bold text-charcoal mb-2">Team Nexium's Promise</h3>
                <p className="text-gray-600">
                  We believe in transparency. Every donation is tracked and used exclusively for road safety 
                  initiatives. Together, we can make a difference in our communities.
                </p>
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
