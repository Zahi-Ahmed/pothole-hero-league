
import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import Badge from '@/components/UI/Badge';
import { dummyPotholes } from '@/lib/dummyData';
import { Calendar, Clock, ArrowRight, CheckCircle, AlertCircle, RefreshCw, User, MessageCircle } from 'lucide-react';

const FixProgress: React.FC = () => {
  // Sort potholes by status for display
  const sortedPotholes = [...dummyPotholes].sort((a, b) => {
    const statusOrder = { 'fixed': 0, 'in-progress': 1, 'verified': 2, 'reported': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Format date strings
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Fix Progress</h1>
            <p className="text-gray-600">Track the status of reported potholes in your community.</p>
          </div>
          
          {/* Filter & Sort Controls */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-primary text-white rounded-full text-sm font-medium">All</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Fixed</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">In Progress</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Verified</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Reported</button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Newest</option>
                <option>Status</option>
                <option>Most Verified</option>
              </select>
            </div>
          </div>
          
          {/* Progress Timeline */}
          <div className="space-y-6">
            {sortedPotholes.map((pothole) => (
              <div key={pothole.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge 
                          text={pothole.status === 'fixed' 
                            ? 'Fixed' 
                            : pothole.status === 'in-progress' 
                              ? 'In Progress' 
                              : pothole.status === 'verified' 
                                ? 'Verified' 
                                : 'Reported'} 
                          variant={pothole.status === 'fixed' 
                            ? 'secondary' 
                            : pothole.status === 'in-progress' 
                              ? 'accent' 
                              : 'primary'} 
                        />
                        <Badge 
                          text={`${pothole.severity.charAt(0).toUpperCase() + pothole.severity.slice(1)} Severity`} 
                          variant={pothole.severity === 'high' ? 'alert' : pothole.severity === 'medium' ? 'accent' : 'secondary'} 
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-charcoal">
                        Pothole at {pothole.location.address}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>Reported {formatDate(pothole.reportedDate)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{pothole.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <User size={14} />
                      <span>Reported by {pothole.reportedBy.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle size={14} className="text-secondary" />
                      <span>{pothole.verifiedCount} verifications</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MessageCircle size={14} className="text-primary" />
                      <span>{pothole.comments.length} comments</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
                  {/* Before Image */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={16} className="text-alert" />
                      <h4 className="font-medium text-charcoal">Before</h4>
                    </div>
                    <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
                      <img 
                        src={pothole.image} 
                        alt="Before fix" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* After Image (or Status) */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-secondary" />
                      <h4 className="font-medium text-charcoal">After</h4>
                    </div>
                    {pothole.status === 'fixed' && pothole.fixedImage ? (
                      <div className="rounded-lg overflow-hidden h-48 bg-gray-100">
                        <img 
                          src={pothole.fixedImage} 
                          alt="After fix" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="rounded-lg border border-gray-200 h-48 flex flex-col items-center justify-center">
                        {pothole.status === 'in-progress' ? (
                          <>
                            <RefreshCw size={32} className="text-accent mb-2 animate-spin" style={{ animationDuration: '3s' }} />
                            <p className="text-gray-600 font-medium">Repair in progress</p>
                            <p className="text-sm text-gray-500">Municipal team assigned</p>
                          </>
                        ) : (
                          <>
                            <Clock size={32} className="text-gray-400 mb-2" />
                            <p className="text-gray-600 font-medium">Awaiting repair</p>
                            <p className="text-sm text-gray-500">Report received by authorities</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="px-5 pb-5">
                  <h4 className="font-medium text-charcoal mb-3">Progress Timeline</h4>
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-3">
                      {/* Reported step */}
                      <div className="ml-8 relative pb-3">
                        <div className="absolute -left-8 w-6 h-6 bg-primary rounded-full flex items-center justify-center -mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                            <span>Reported</span>
                            <ArrowRight size={12} className="text-gray-400" />
                            <span>{formatDate(pothole.reportedDate)}</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            New pothole reported by {pothole.reportedBy.name}
                          </p>
                        </div>
                      </div>
                      
                      {/* Verified step - only show if verified or beyond */}
                      {(pothole.status === 'verified' || pothole.status === 'in-progress' || pothole.status === 'fixed') && (
                        <div className="ml-8 relative pb-3">
                          <div className="absolute -left-8 w-6 h-6 bg-primary rounded-full flex items-center justify-center -mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                              <span>Verified</span>
                              <ArrowRight size={12} className="text-gray-400" />
                              <span>{new Date(new Date(pothole.reportedDate).getTime() + 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Verified by {pothole.verifiedCount} community members
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* In Progress step - only show if in-progress or fixed */}
                      {(pothole.status === 'in-progress' || pothole.status === 'fixed') && (
                        <div className="ml-8 relative pb-3">
                          <div className="absolute -left-8 w-6 h-6 bg-accent rounded-full flex items-center justify-center -mt-1">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                              <span>Work Started</span>
                              <ArrowRight size={12} className="text-gray-400" />
                              <span>{new Date(new Date(pothole.reportedDate).getTime() + 86400000 * 5).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Municipal repair team assigned to fix the pothole
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Fixed step - only show if fixed */}
                      {pothole.status === 'fixed' && pothole.fixedDate && (
                        <div className="ml-8 relative">
                          <div className="absolute -left-8 w-6 h-6 bg-secondary rounded-full flex items-center justify-center -mt-1">
                            <CheckCircle size={12} className="text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-sm font-medium text-charcoal">
                              <span>Fixed</span>
                              <ArrowRight size={12} className="text-gray-400" />
                              <span>{formatDate(pothole.fixedDate)}</span>
                            </div>
                            <p className="text-sm text-gray-600">
                              Repair completed successfully
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Comments Section */}
                {pothole.comments.length > 0 && (
                  <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-charcoal mb-3">Comments</h4>
                    <div className="space-y-3">
                      {pothole.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <img 
                            src={comment.userAvatar} 
                            alt={comment.userName} 
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="bg-gray-50 rounded-lg p-3 flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-charcoal">{comment.userName}</span>
                              <span className="text-xs text-gray-500">{formatDate(comment.date)}</span>
                            </div>
                            <p className="text-gray-600 text-sm">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Comment Input */}
                    <div className="mt-4 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                      <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FixProgress;
