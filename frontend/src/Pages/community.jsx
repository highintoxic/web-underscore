import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Calendar, Search, Filter, PlusCircle, X } from 'lucide-react';
import { BaseLayout } from '../Layouts';


const CommunityForum = () => {
  // State for managing threads and replies
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: 'Welcome to our Community!',
      author: 'Admin',
      replies: [
        { id: 1, author: 'John', content: 'Great to be here!', likes: 5 },
        { id: 2, author: 'Sarah', content: 'Thanks for having us!', likes: 3 }
      ],
      replyCount: 24,
      views: 1205,
      likes: 56,
      lastActive: '2h ago',
      isPinned: true
    },
    {
      id: 2,
      title: 'How do I get started with the platform?',
      author: 'NewUser123',
      replies: [
        { id: 1, author: 'Expert1', content: 'Check out our getting started guide!', likes: 8 },
        { id: 2, author: 'Helper', content: 'Feel free to ask specific questions.', likes: 4 }
      ],
      replyCount: 8,
      views: 342,
      likes: 12,
      lastActive: '4h ago',
      isPinned: false
    }
  ]);

  // State for managing the replies modal
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  // Handle opening replies modal
  const handleViewReplies = (thread) => {
    setSelectedThread(thread);
    setIsRepliesOpen(true);
  };

  // Handle liking a thread
  const handleLike = (threadId) => {
    setThreads(threads.map(thread => 
      thread.id === threadId 
        ? { ...thread, likes: thread.likes + 1 }
        : thread
    ));
  };

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
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {thread.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>By {thread.author}</span>
                      <button 
                        onClick={() => handleViewReplies(thread)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare size={16} />
                        <span>{thread.replyCount} replies</span>
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{thread.views} views</span>
                      </div>
                      <button 
                        onClick={() => handleLike(thread.id)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp size={16} />
                        <span>{thread.likes} likes</span>
                      </button>
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

          {/* Replies Modal */}
          <div open={isRepliesOpen} onOpenChange={setIsRepliesOpen}>
            <div className="max-w-2xl">
              <div>
                <div>{selectedThread?.title} - Replies</div>
              </div>
              <div className="mt-4 space-y-4">
                {selectedThread?.replies.map(reply => (
                  <div key={reply.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium">{reply.author}</span>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-blue-600">
                        <ThumbsUp size={14} />
                        <span>{reply.likes} likes</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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