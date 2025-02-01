import { useState, useRef, useEffect } from "react"
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Calendar,
  Search,
  Filter,
  PlusCircle,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react"
import { BaseLayout } from "../Layouts"
const THREADS_PER_PAGE = 10

const CommunityForum = () => {
  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Welcome to our Community!",
      author: "Admin",
      content: "Welcome to our community forum! Feel free to ask questions and engage in discussions.",
      replies: [
        { id: 1, author: "John", content: "Great to be here!", likes: 5 },
        { id: 2, author: "Sarah", content: "Thanks for having us!", likes: 3 },
        { id: 3, author: "Mike", content: "Looking forward to engaging discussions!", likes: 2 },
        { id: 4, author: "Emily", content: "Hello everyone!", likes: 1 },
      ],
      replyCount: 24,
      views: 1205,
      likes: 56,
      lastActive: "2h ago",
      isPinned: true,
      showReplies: false,
      likedByCurrentUser: false,
    },
    {
      id: 2,
      title: "How do I get started with the platform?",
      author: "NewUser123",
      content: "I'm new here and wondering how to get started. Any tips?",
      replies: [
        { id: 1, author: "Expert1", content: "Check out our getting started guide!", likes: 8 },
        { id: 2, author: "Helper", content: "Feel free to ask specific questions.", likes: 4 },
        { id: 3, author: "Guru", content: "I recommend starting with the tutorials section.", likes: 6 },
      ],
      replyCount: 8,
      views: 342,
      likes: 12,
      lastActive: "4h ago",
      isPinned: false,
      showReplies: false,
      likedByCurrentUser: false,
    },
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const [newThreadContent, setNewThreadContent] = useState("")
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [isCreatingNewThread, setIsCreatingNewThread] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredThreads, setFilteredThreads] = useState(threads)

  const totalPages = Math.ceil(filteredThreads.length / THREADS_PER_PAGE)

  const getCurrentPageThreads = () => {
    const startIndex = (currentPage - 1) * THREADS_PER_PAGE
    const endIndex = startIndex + THREADS_PER_PAGE
    return sortedThreads.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  const handleViewReplies = (threadId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId ? { ...thread, showReplies: !thread.showReplies } : { ...thread, showReplies: false },
      ),
    )
  }

  const handleLike = (threadId) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              likes: thread.likedByCurrentUser ? thread.likes - 1 : thread.likes + 1,
              likedByCurrentUser: !thread.likedByCurrentUser,
            }
          : thread,
      ),
    )
  }

  const handleNewThread = () => {
    if (!isCreatingNewThread) {
      const newThread = {
        id: Date.now(),
        title: "",
        author: "CurrentUser", // Replace with actual current user's name
        content: "",
        replies: [],
        replyCount: 0,
        views: 0,
        likes: 0,
        lastActive: "Just now",
        isPinned: false,
        showReplies: false,
        isNew: true,
        likedByCurrentUser: false,
      }
      setThreads([...threads, newThread])
      setIsCreatingNewThread(true)
      setNewThreadTitle("")
      setNewThreadContent("")
    }
  }

  const handlePostNewThread = () => {
    if (newThreadContent.trim() && newThreadTitle.trim()) {
      setThreads(
        threads.map((thread) =>
          thread.isNew
            ? {
                ...thread,
                title: newThreadTitle,
                content: newThreadContent,
                isNew: false,
              }
            : thread,
        ),
      )
      setIsCreatingNewThread(false)
      setNewThreadTitle("")
      setNewThreadContent("")
    }
  }

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setFilteredThreads(threads)
    } else {
      const filtered = threads.filter(
        (thread) =>
          thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          thread.content.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredThreads(filtered)
    }
  }

  const handleAddReply = (threadId, replyContent) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              replies: [
                ...thread.replies,
                {
                  id: Date.now(),
                  author: "CurrentUser", // Replace with actual current user's name
                  content: replyContent,
                  likes: 0,
                },
              ],
              replyCount: thread.replyCount + 1,
              lastActive: "Just now",
            }
          : thread,
      ),
    )
  }

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return 0
  })

  useEffect(() => {
    handleSearch()
  }, [threads, searchQuery])

  return (
    <BaseLayout>
      <div className="min-h-screen bg-gray-50 py-8 mt-15">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Community Forum</h1>
            <button
              onClick={handleNewThread}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer"
              disabled={isCreatingNewThread}
            >
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    handleSearch()
                  }}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer"
                >
                  <Search size={20} />
                  <span>Search</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 ">
                  <Filter size={20} />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Thread List */}
          <div className="bg-white rounded-lg shadow-sm divide-y">
            {getCurrentPageThreads().map((thread) => (
              <div
                key={thread.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${thread.isPinned ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      {thread.isPinned && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Pinned</span>
                      )}
                    </div>
                    {thread.isNew ? (
                      <div className="mb-4 space-y-4">
                        <input
                          type="text"
                          value={newThreadTitle}
                          onChange={(e) => setNewThreadTitle(e.target.value)}
                          placeholder="Enter thread title..."
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <textarea
                          value={newThreadContent}
                          onChange={(e) => setNewThreadContent(e.target.value)}
                          placeholder="Write your thread content here..."
                          className="w-full px-3 py-2 border rounded-lg mb-2 h-32"
                        />
                        <button
                          onClick={handlePostNewThread}
                          disabled={!newThreadTitle.trim() || !newThreadContent.trim()}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          <Send size={20} />
                          <span>Post Thread</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{thread.title}</h3>
                        <p className="text-gray-700 mb-2">{thread.content}</p>
                      </>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>By {thread.author}</span>
                      <button
                        onClick={() => handleViewReplies(thread.id)}
                        className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare size={16} />
                        <span>{thread.replyCount} replies</span>
                        {thread.showReplies ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{thread.views} views</span>
                      </div>
                      <button
                        onClick={() => handleLike(thread.id)}
                        className={`flex items-center gap-1 transition-colors hover:cursor-pointer ${
                          thread.likedByCurrentUser ? "text-red-600" : "hover:text-blue-600"
                        }`}
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
                {thread.showReplies && (
                  <RepliesSection
                    replies={thread.replies}
                    onAddReply={(content) => handleAddReply(thread.id, content)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded ${
                    pageNum === currentPage ? "bg-blue-600 text-white" : "border hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

const RepliesSection = ({ replies, onAddReply }) => {
  const [visibleReplies, setVisibleReplies] = useState(2)
  const [newReplyContent, setNewReplyContent] = useState("")
  const replyContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (replyContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = replyContainerRef.current
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          setVisibleReplies((prev) => Math.min(prev + 2, replies.length))
        }
      }
    }

    const currentRef = replyContainerRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [replies.length])

  const handleAddReply = () => {
    if (newReplyContent.trim()) {
      onAddReply(newReplyContent)
      setNewReplyContent("")
    }
  }

  return (
    <div className="mt-4 space-y-4">
      <div ref={replyContainerRef} className="max-h-60 overflow-y-auto space-y-4 pr-4">
        {replies.slice(0, visibleReplies).map((reply) => (
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
        {visibleReplies < replies.length && (
          <button
            onClick={() => setVisibleReplies((prev) => Math.min(prev + 2, replies.length))}
            className="w-full text-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            Show More
          </button>
        )}
      </div>
      <div className="mt-4">
        <textarea
          value={newReplyContent}
          onChange={(e) => setNewReplyContent(e.target.value)}
          placeholder="Write your reply here..."
          className="w-full px-3 py-2 border rounded-lg mb-2 h-24"
        />
        <button
          onClick={handleAddReply}
          disabled={!newReplyContent.trim()}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Send size={20} />
          <span>Post Reply</span>
        </button>
      </div>
    </div>
  )
}

export default CommunityForum

