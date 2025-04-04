import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-primary">PatchItUp</Link>
            <p className="mt-2 text-sm text-gray-600">
              Spot it. Report it. Fix it.
              <br />
              Making our roads safer, together.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/report" className="text-gray-600 hover:text-primary transition-colors">Report Pothole</Link></li>
              <li><Link to="/verify" className="text-gray-600 hover:text-primary transition-colors">Verify Reports</Link></li>
              <li><Link to="/leaderboard" className="text-gray-600 hover:text-primary transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/articles" className="text-gray-600 hover:text-primary transition-colors">Articles</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/donate" className="text-gray-600 hover:text-primary transition-colors">Donate</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Road Safety</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-500" />
                <a href="mailto:contact@patchitup.org" className="text-gray-600 hover:text-primary transition-colors">
                  contact@patchitup.org
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Join our Discord</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary transition-colors">Telegram Group</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; 2025 PatchItUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
