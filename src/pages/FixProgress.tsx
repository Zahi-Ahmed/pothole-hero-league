
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { dummyPotholes } from '@/lib/dummyData';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import FilterBar from '@/components/FixProgress/FilterBar';
import PotholeDetailCard from '@/components/FixProgress/PotholeDetailCard';
import EmptyState from '@/components/FixProgress/EmptyState';
import { Pothole } from '@/lib/types';

const FixProgress: React.FC = () => {
  // State for all potholes (combined dummy and user-submitted)
  const [allPotholes, setAllPotholes] = useState<Pothole[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Filter state
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('status');

  // Comment state
  const [commentText, setCommentText] = useState<string>('');
  const [activePotholeId, setActivePotholeId] = useState<string | null>(null);

  // Load potholes on initial render and whenever localStorage changes
  useEffect(() => {
    const loadPotholes = () => {
      // Get user-submitted reports from localStorage
      const userSubmittedReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
      
      // Combine with dummy data
      setAllPotholes([...userSubmittedReports, ...dummyPotholes]);
    };

    // Load initially
    loadPotholes();

    // Set up event listener for storage changes
    window.addEventListener('storage', loadPotholes);

    // Clean up
    return () => {
      window.removeEventListener('storage', loadPotholes);
    };
  }, []);

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
    if (activeFilter === 'all') return allPotholes;
    return allPotholes.filter(pothole => pothole.status === activeFilter);
  };

  // Sort potholes based on sort option
  const sortPotholes = (potholes: Pothole[]) => {
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
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, potholeId: string) => {
    setCommentText(e.target.value);
    setActivePotholeId(potholeId);
  };

  const handleCommentSubmit = (potholeId: string) => {
    if (!commentText.trim()) return;
    
    // Create new comment
    const newComment = {
      id: `comment-${Date.now()}`,
      userId: 'current-user',
      userName: 'Current User',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      text: commentText,
      date: new Date().toISOString(),
      likes: 0
    };
    
    // Update potholes with the new comment
    const updatedPotholes = allPotholes.map(pothole => {
      if (pothole.id === potholeId) {
        return {
          ...pothole,
          comments: [...pothole.comments, newComment]
        };
      }
      return pothole;
    });
    
    setAllPotholes(updatedPotholes);
    
    // If this is a user-submitted report, update localStorage
    const userSubmittedReports = JSON.parse(localStorage.getItem('potholeReports') || '[]');
    const updatedUserReports = userSubmittedReports.map(pothole => {
      if (pothole.id === potholeId) {
        return {
          ...pothole,
          comments: [...pothole.comments, newComment]
        };
      }
      return pothole;
    });
    
    localStorage.setItem('potholeReports', JSON.stringify(updatedUserReports));
    
    // Reset form
    setCommentText('');
    setActivePotholeId(null);
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
          <FilterBar 
            activeFilter={activeFilter} 
            sortBy={sortBy} 
            onFilterChange={handleFilterChange} 
            onSortChange={handleSortChange} 
          />
          
          {/* Progress Timeline */}
          <div className="space-y-6">
            {displayedPotholes.length > 0 ? (
              displayedPotholes.map((pothole) => (
                <PotholeDetailCard 
                  key={pothole.id}
                  pothole={pothole}
                  formatDate={formatDate}
                  commentText={commentText}
                  activePotholeId={activePotholeId}
                  onCommentChange={handleCommentChange}
                  onCommentSubmit={handleCommentSubmit}
                />
              ))
            ) : (
              <EmptyState onResetFilter={() => handleFilterChange('all')} />
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
