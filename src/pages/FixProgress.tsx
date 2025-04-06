import React, { useState } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import CustomBadge from '@/components/UI/CustomBadge';
import { dummyPotholes } from '@/lib/dummyData';
import { Calendar, Clock, ArrowRight, CheckCircle, AlertCircle, RefreshCw, User, MessageCircle } from 'lucide-react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const FixProgress: React.FC = () => {
  // Sort potholes by status for display
  const sortedPotholes = [...dummyPotholes].sort((a, b) => {
    const statusOrder = { 'fixed': 0, 'in-progress': 1, 'verified': 2, 'reported': 3 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(sortedPotholes.length / itemsPerPage);
  
  // Get current potholes for pagination
  const indexOfLastPothole = currentPage * itemsPerPage;
  const indexOfFirstPothole = indexOfLastPothole - itemsPerPage;
  const currentPotholes = sortedPotholes.slice(indexOfFirstPothole, indexOfLastPothole);

  // Format date strings
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  // Filter state
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('status');

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle sort changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Filter potholes based on active filter
  const filterPotholes = () => {
    if (activeFilter === 'all') return sortedPotholes;
    return sortedPotholes.filter(pothole => pothole.status === activeFilter);
  };

  // Sort potholes based on sort option
  const sortPotholes = (potholes: typeof sortedPotholes) => {
    switch (sortBy) {
      case 'newest':
        return [...potholes].sort((a, b) => new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime());
      case 'status':
        return [...potholes].sort((a, b) => {
          const statusOrder = { 'fixed': 0, 'in-progress': 1, 'verified': 2, 'reported': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        });
      case 'verified':
        return [...potholes].sort((a, b) => b.verifiedCount - a.verifiedCount);
      default:
        return potholes;
    }
  };

  // Get filtered and sorted potholes
  const filteredAndSortedPotholes = sortPotholes(filterPotholes());
  
  // Get current page potholes
  const displayedPotholes = filteredAndSortedPotholes.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Update total pages based on filtered results
  const filteredTotalPages = Math.ceil(filteredAndSortedPotholes.length / itemsPerPage);

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    
    // Always include first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => handlePageChange(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // Add ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Add pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(filteredTotalPages - 1, currentPage + 1); i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Add ellipsis if needed
    if (currentPage < filteredTotalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always include last page if there is more than one page
    if (filteredTotalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => handlePageChange(filteredTotalPages)} 
            isActive={currentPage === filteredTotalPages}
          >
            {filteredTotalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  // Handle comment submission
  const [commentText, setCommentText] = useState<string>('');
  const [activePotholeId, setActivePotholeId] = useState<string | null>(null);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, potholeId: string) => {
    setCommentText(e.target.value);
    setActivePotholeId(potholeId);
  };

  const handleCommentSubmit = (potholeId: string) => {
    if (!commentText.trim()) return;
    
    console.log('Submitting comment:', {
      potholeId,
      text: commentText
    });
    
    // Reset form
    setCommentText('');
    setActivePotholeId(null);
    
    // In a real implementation, this would send the comment to the backend
    // For now, show a console message
    console.log('Comment submitted successfully');
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
              <button 
                className={`px-3 py-1.5 ${activeFilter === 'all' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1.5 ${activeFilter === 'fixed' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
                onClick={() => handleFilterChange('fixed')}
              >
                Fixed
              </button>
              <button 
                className={`px-3 py-1.5 ${activeFilter === 'in-progress' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
                onClick={() => handleFilterChange('in-progress')}
              >
                In Progress
              </button>
              <button 
                className={`px-3 py-1.5 ${activeFilter === 'verified' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
                onClick={() => handleFilterChange('verified')}
              >
                Verified
              </button>
              <button 
                className={`px-3 py-1.5 ${activeFilter === 'reported' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'} rounded-full text-sm font-medium hover:bg-gray-50 transition-colors`}
                onClick={() => handleFilterChange('reported')}
              >
                Reported
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="newest">Newest</option>
                <option value="status">Status</option>
                <option value="verified">Most Verified</option>
              </select>
            </div>
          </div>
          
          {/* Progress Timeline */}
          <div className="space-y-6">
            {displayedPotholes.length > 0 ? (
              displayedPotholes.map((pothole) => (
                <div key={pothole.id} className="bg-white rounded-2xl shadow-card overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CustomBadge 
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
                          <CustomBadge 
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
                  
                  <div className="px-5 pb-5">
                    <h4 className="font-medium text-charcoal mb-3">Progress Timeline</h4>
                    <div className="relative">
                      <div className="absolute top-0 left-3 h-full w-0.5 bg-gray-200"></div>
                      
                      <div className="space-y-3">
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
                    
                    <div className="mt-4 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Add a comment..." 
                        className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        value={activePotholeId === pothole.id ? commentText : ''}
                        onChange={(e) => handleCommentChange(e, pothole.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCommentSubmit(pothole.id);
                          }
                        }}
                      />
                      <button 
                        className="px-4 py-2 bg-primary text-white rounded-lg font-medium"
                        onClick={() => handleCommentSubmit(pothole.id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl shadow-card p-10 text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-charcoal mb-2">No potholes found</h3>
                <p className="text-gray-600">No potholes match your current filter criteria.</p>
                <button 
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-medium"
                  onClick={() => handleFilterChange('all')}
                >
                  View All Potholes
                </button>
              </div>
            )}
          </div>
          
          {filteredAndSortedPotholes.length > itemsPerPage && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                  )}
                  
                  {renderPaginationItems()}
                  
                  {currentPage < filteredTotalPages && (
                    <PaginationItem>
                      <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FixProgress;
