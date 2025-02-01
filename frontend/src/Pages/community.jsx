import React from 'react';
import { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Calendar, Search, Filter, PlusCircle } from 'lucide-react';
import { BaseLayout } from '../Layouts';

const CommunityForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'general', name: 'General Discussion' },
    { id: 'questions', name: 'Questions & Answers' },
    { id: 'support', name: 'Support' },
    { id: 'announcements', name: 'Announcements' }
  ];

  const threads = [
    {
      id: 1,
      title: 'Welcome to our Community!',
      author: 'Admin',
      category: 'announcements',
      replies: 24,
      views: 1205,
      likes: 56,
      lastActive: '2h ago',
      isPinned: true
    },
    {
      id: 2,
      title: 'How do I get started with the platform?',
      author: 'NewUser123',
      category: 'questions',
      replies: 8,
      views: 342,
      likes: 12,
      lastActive: '4h ago',
      isPinned: false
    },
    // Add more thread examples as needed
  ];

  return (
    <BaseLayout>
    <div className="min-h-screen bg-gray-50 py-8 mt-15">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Forum</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <PlusCircle size={20} />
            <span>New Thread</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Thread List */}
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {threads.map(thread => (
            <div
              key={thread.id}
              className={`p-4 hover:bg-gray-50 transition-colors ${
                thread.isPinned ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    {thread.isPinned && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Pinned
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {categories.find(c => c.id === thread.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {thread.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>By {thread.author}</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={16} />
                      <span>{thread.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{thread.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{thread.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Last active {thread.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
            <span className="px-2">...</span>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </div>
    </BaseLayout>
    
  );
};

export default CommunityForum;