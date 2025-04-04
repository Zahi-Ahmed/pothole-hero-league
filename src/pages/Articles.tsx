import React from 'react';
import Navbar from '@/components/Layout/Navbar';
import Footer from '@/components/Layout/Footer';
import { dummyArticles } from '@/lib/dummyData';
import { Clock, User, FileText, Search } from 'lucide-react';
import CustomBadge from '@/components/UI/CustomBadge';

const Articles: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-softWhite">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Articles & Resources</h1>
            <p className="text-gray-600">Stay informed about road safety, pothole impact, and community action.</p>
          </div>
          
          {/* Search & Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 bg-primary text-white rounded-full text-sm font-medium">All</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Community Action</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Legal Resources</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Research</button>
              <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">Success Stories</button>
            </div>
          </div>
          
          {/* Featured Article */}
          <div className="mb-10">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px]">
                <div className="bg-gray-200 min-h-[200px] md:min-h-full">
                  <img 
                    src={dummyArticles[0].imageUrl} 
                    alt={dummyArticles[0].title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 md:p-8 flex flex-col">
                  <div className="mb-1">
                    <CustomBadge text={dummyArticles[0].category} variant="primary" className="mb-2" />
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-charcoal mb-3">
                    {dummyArticles[0].title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {dummyArticles[0].excerpt}
                  </p>
                  
                  <div className="flex flex-wrap justify-between items-center mt-4">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <img 
                        src={dummyArticles[0].author.avatar} 
                        alt={dummyArticles[0].author.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-medium text-charcoal">{dummyArticles[0].author.name}</div>
                        <div className="text-xs text-gray-500">{new Date(dummyArticles[0].date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{dummyArticles[0].readTime} min read</span>
                      </div>
                      <button className="px-4 py-1.5 bg-primary text-white rounded-lg font-medium">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dummyArticles.slice(1).map((article) => (
              <div key={article.id} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-hover transition-shadow">
                <div className="h-48 bg-gray-200">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-5">
                  <div className="mb-2">
                    <CustomBadge text={article.category} variant="primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-charcoal mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 min-h-[72px]">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-2">
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-charcoal">{article.author.name}</div>
                        <div className="text-xs text-gray-500">{new Date(article.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full py-2 bg-gray-50 text-primary border border-primary/20 rounded-lg font-medium hover:bg-primary/5 transition-colors">
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-12 bg-primary/5 rounded-2xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <FileText size={36} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-charcoal mb-2">
              Have a story to share?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether it's a success story about getting potholes fixed in your area or tips for effectively reporting road issues, 
              we'd love to feature your insights.
            </p>
            <button className="btn-primary">
              Submit Your Article
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
