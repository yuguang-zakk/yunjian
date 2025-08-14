import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  BookOpen, 
  Menu, 
  User, 
  Plus, 
  FileText, 
  Calendar, 
  Briefcase, 
  Brain,
  Archive,
  Upload,
  Link,
  Video,
  MessageSquare,
  List,
  BookMarked,
  Clock,
  ChevronRight,
  X,
  Play,
  File,
  ExternalLink,
  Check,
  Loader,
  Sparkles,
  Home,
  Folder,
  Tag,
  Share2,
  PenTool,
  Globe,
  Search,
  Heart,
  Inbox,
  Eye
} from 'lucide-react';

interface SourceCard {
  id: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  title: string;
  content?: string;
  url?: string;
  uploadProgress?: number;
  isProcessing?: boolean;
  timestamp: string;
  size?: string;
}

interface NoteCard {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  tags: string[];
  wordCount: number;
}

interface Course {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [sources, setSources] = useState<SourceCard[]>([
    {
      id: '1',
      type: 'pdf',
      title: 'Ancient Chinese Philosophy.pdf',
      content: 'Comprehensive study of Confucian and Taoist principles in modern context.',
      timestamp: '2 hours ago',
      size: '2.4 MB'
    },
    {
      id: '2',
      type: 'video',
      title: 'The Art of Chinese Calligraphy',
      url: 'https://www.youtube.com/watch?v=example',
      content: 'Traditional brush techniques and their philosophical meanings.',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'link',
      title: 'Digital Humanities in East Asian Studies',
      url: 'https://example.com/article',
      content: 'Modern approaches to studying ancient texts using technology.',
      timestamp: '3 days ago'
    },
    {
      id: '4',
      type: 'doc',
      title: 'Research Notes - Tang Dynasty.docx',
      content: 'Personal research compilation on Tang Dynasty cultural practices.',
      timestamp: '1 week ago',
      size: '1.8 MB'
    }
  ]);

  const [notes, setNotes] = useState<NoteCard[]>([
    {
      id: '1',
      title: 'Synthesis: Technology & Ancient Wisdom',
      preview: 'Exploring how ancient Chinese philosophical principles can inform modern technological design patterns...',
      timestamp: '3 hours ago',
      tags: ['philosophy', 'technology', 'synthesis'],
      wordCount: 1247
    },
    {
      id: '2',
      title: 'Comparative Analysis: Confucius vs. Modern UX',
      preview: 'The concept of 仁 (ren) - benevolence - as applied to user-centered design thinking and empathetic interfaces...',
      timestamp: '1 day ago',
      tags: ['confucius', 'ux-design', 'ethics'],
      wordCount: 892
    },
    {
      id: '3',
      title: 'The Dao of Information Architecture',
      preview: 'How Taoist principles of natural flow and wu wei can guide the creation of intuitive digital experiences...',
      timestamp: '2 days ago',
      tags: ['taoism', 'information-architecture'],
      wordCount: 1456
    },
    {
      id: '4',
      title: 'Calligraphy & Code: Aesthetic Parallels',
      preview: 'The meditative practice of brush writing shares surprising similarities with the craft of clean code...',
      timestamp: '5 days ago',
      tags: ['calligraphy', 'programming', 'aesthetics'],
      wordCount: 734
    }
  ]);

  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const courses: Course[] = [
    { id: '1', name: 'Digital Humanities', color: '#2FA58E', icon: <Brain className="w-3 h-3" /> },
    { id: '2', name: 'East Asian Studies', color: '#C7A14A', icon: <BookOpen className="w-3 h-3" /> },
    { id: '3', name: 'Philosophy & Technology', color: '#D24C3E', icon: <Sparkles className="w-3 h-3" /> }
  ];

  const templates = [
    { id: '1', name: 'Research Paper', icon: <FileText className="w-4 h-4" /> },
    { id: '2', name: 'Study Guide', icon: <BookMarked className="w-4 h-4" /> },
    { id: '3', name: 'Presentation', icon: <Play className="w-4 h-4" /> }
  ];

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadFiles(files);
    files.forEach(processFile);
    setUploadModalOpen(false);
  }, []);

  const processFile = (file: File) => {
    const newSource: SourceCard = {
      id: Date.now().toString(),
      type: file.type.includes('pdf') ? 'pdf' : 'doc',
      title: file.name,
      uploadProgress: 0,
      isProcessing: true,
      timestamp: 'Just now',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    };

    setSources(prev => [newSource, ...prev]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setSources(prev => prev.map(source => 
        source.id === newSource.id 
          ? { ...source, uploadProgress: Math.min((source.uploadProgress || 0) + 20, 100) }
          : source
      ));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setSources(prev => prev.map(source => 
        source.id === newSource.id 
          ? { ...source, isProcessing: false, content: `Content from ${file.name} has been processed and is ready for analysis.` }
          : source
      ));
      setShowUploadPrompt(true);
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles(files);
    files.forEach(processFile);
    setUploadModalOpen(false);
  };

  const addUrlSource = () => {
    if (urlInput.trim()) {
      const url = urlInput.trim();
      const isVideo = url.includes('youtube.com') || url.includes('youtu.be') || url.includes('.mp4');
      const newSource: SourceCard = {
        id: Date.now().toString(),
        type: isVideo ? 'video' : 'link',
        title: isVideo ? 'Video Content' : 'Web Article',
        url,
        content: `Content from ${url} will be analyzed shortly.`,
        isProcessing: true,
        timestamp: 'Just now'
      };

      setSources(prev => [newSource, ...prev]);
      setUrlInput('');
      setUploadModalOpen(false);

      setTimeout(() => {
        setSources(prev => prev.map(source => 
          source.id === newSource.id 
            ? { ...source, isProcessing: false }
            : source
        ));
        setShowUploadPrompt(true);
      }, 1500);
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <File className="w-5 h-5 text-red-500" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'link': return <Globe className="w-5 h-5 text-jade" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && !(event.target as Element).closest('.sidebar')) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (uploadModalOpen && !(event.target as Element).closest('.upload-modal')) {
        setUploadModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [uploadModalOpen]);

  return (
    <div className="min-h-screen bg-rice-paper text-charcoal font-sans relative overflow-hidden">
      {/* Ancient Chinese Cloud Watermark */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-cloud-pattern bg-repeat opacity-30"></div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40 transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Upload Modal Overlay */}
      {uploadModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setUploadModalOpen(false)}
        >
          <div 
            className="upload-modal bg-white rounded-lg shadow-pavilion max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-charcoal font-chinese">Add Sources</h2>
                <p className="text-sm text-gray-secondary mt-1">
                  Sources let Borderless Scholar base its responses on the information that matters most to you.
                </p>
              </div>
              <button 
                onClick={() => setUploadModalOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Area */}
            <div className="p-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  isDragOver 
                    ? 'border-jade bg-jade/5' 
                    : 'border-gray-200 hover:border-jade/50 hover:bg-jade/5'
                }`}
              >
                <Upload className="w-12 h-12 text-jade mx-auto mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">Upload sources</h3>
                <p className="text-gray-secondary mb-4">
                  Drag and drop or <button 
                    onClick={handleFileUpload}
                    className="text-jade hover:text-jade-600 underline"
                  >
                    choose file
                  </button> to upload
                </p>
                <p className="text-sm text-gray-secondary">
                  Supported file types: PDF, txt, Markdown, Audio (e.g. mp3)
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Folder className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Google Drive</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Link className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Link</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Google Docs</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Video className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">YouTube</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Website</span>
                  </button>
                  <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">Paste text</span>
                  </button>
                </div>
              </div>

              {/* URL Input */}
              <div className="mt-6">
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                  <Link className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Source limit"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 outline-none text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addUrlSource()}
                  />
                  <span className="text-xs text-gray-secondary">0/50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar (Off-Canvas) */}
      <aside className={`sidebar fixed left-0 top-0 h-full w-80 bg-white shadow-pavilion z-50 transform transition-transform duration-300 ease-smooth ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-jade" />
              <h1 className="text-xl font-bold text-charcoal font-chinese">Borderless Scholar</h1>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-6">
            {/* Main Navigation */}
            <div>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Home className="w-5 h-5 text-jade" />
                    <span>Dashboard</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Search className="w-5 h-5" />
                    <span>Explore</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Inbox className="w-5 h-5" />
                    <span>Inbox</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Share2 className="w-5 h-5" />
                    <span>Shared</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Heart className="w-5 h-5" />
                    <span>Liked</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Archive className="w-5 h-5" />
                    <span>Archive</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* My Sources */}
            <div>
              <div className="hairline-divider mb-4"></div>
              <h3 className="text-sm font-medium text-gray-secondary mb-3">My Sources</h3>
              <ul className="space-y-1">
                {courses.map(course => (
                  <li key={course.id}>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: course.color}}></div>
                      <span className="text-sm truncate">{course.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Templates */}
            <div>
              <div className="hairline-divider mb-4"></div>
              <h3 className="text-sm font-medium text-gray-secondary mb-3">Templates</h3>
              <ul className="space-y-1">
                {templates.map(template => (
                  <li key={template.id}>
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                      {template.icon}
                      <span className="text-sm">{template.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-soft px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-jade" />
              <h1 className="text-xl font-bold text-charcoal font-chinese">Borderless Scholar</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple">
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div 
          className="p-8 relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {isDragOver && (
            <div className="absolute inset-4 border-2 border-dashed border-jade bg-jade/5 rounded-lg flex items-center justify-center z-20">
              <div className="text-center">
                <Upload className="w-8 h-8 text-jade mx-auto mb-2" />
                <p className="text-jade font-medium">Drop files here to upload</p>
              </div>
            </div>
          )}

          {/* Recent Sources Row */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-charcoal">Recent Sources</h3>
              <button className="flex items-center gap-2 text-jade hover:text-jade-600 transition-colors ink-ripple">
                <span>See All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden">
              {/* Create New Source Card */}
              <div className="flex-shrink-0">
                <button 
                  onClick={() => setUploadModalOpen(true)}
                  className="w-60 h-40 border-2 border-dashed border-jade/30 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-jade/50 hover:bg-jade/5 transition-all ink-ripple"
                >
                  <Plus className="w-8 h-8 text-jade" />
                  <span className="text-jade font-medium">Upload New Source</span>
                  <span className="text-sm text-gray-secondary">PDF, DOCX, links, or videos</span>
                </button>
              </div>

              {/* Source Cards */}
              {sources.map(source => (
                <div key={source.id} className="flex-shrink-0 w-60">
                  <div className="bg-white rounded-lg p-4 shadow-soft hover:shadow-medium transition-all cursor-pointer ink-ripple h-40">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(source.type)}
                        <span className="text-xs text-gray-secondary uppercase font-medium">
                          {source.type}
                        </span>
                      </div>
                      {source.isProcessing && <Loader className="w-4 h-4 animate-spin text-jade" />}
                    </div>
                    
                    <h4 className="font-medium text-charcoal mb-2 line-clamp-2">{source.title}</h4>
                    
                    {source.uploadProgress !== undefined && source.uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-1 mb-3">
                        <div 
                          className="bg-jade h-1 rounded-full transition-all duration-300" 
                          style={{ width: `${source.uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-gray-secondary mt-auto">
                      <span>{source.timestamp}</span>
                      {source.size && <span>{source.size}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Notes Row */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-charcoal">Recent Notes</h3>
              <button className="flex items-center gap-2 text-jade hover:text-jade-600 transition-colors ink-ripple">
                <span>See All</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hidden">
              {/* Create New Note Card */}
              <div className="flex-shrink-0">
                <button className="w-64 h-48 border-2 border-dashed border-brass/30 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-brass/50 hover:bg-brass/5 transition-all ink-ripple">
                  <PenTool className="w-8 h-8 text-brass" />
                  <span className="text-brass font-medium">Open New Note</span>
                  <span className="text-sm text-gray-secondary">Start writing and synthesizing</span>
                </button>
              </div>

              {/* Note Cards */}
              {notes.map(note => (
                <div key={note.id} className="flex-shrink-0 w-64">
                  <div className="bg-white rounded-lg p-5 shadow-soft hover:shadow-medium transition-all cursor-pointer ink-ripple h-48">
                    <h4 className="font-semibold text-charcoal mb-3 line-clamp-2">{note.title}</h4>
                    <p className="text-sm text-gray-secondary mb-4 line-clamp-3">{note.preview}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-jade/10 text-jade text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-secondary mt-auto">
                      <span>{note.timestamp}</span>
                      <span>{note.wordCount} words</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Upload Prompt */}
          {showUploadPrompt && (
            <div className="bg-jade/10 border border-jade/20 rounded-lg p-6 mb-8">
              <h4 className="font-medium text-jade mb-2">Sources uploaded successfully!</h4>
              <p className="text-gray-secondary mb-4">What do you want to learn from these sources?</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-jade text-white rounded-lg hover:bg-jade-600 transition-colors">
                  Generate Summary
                </button>
                <button className="px-4 py-2 bg-white border border-jade text-jade rounded-lg hover:bg-jade/5 transition-colors">
                  Create Quiz
                </button>
                <button 
                  onClick={() => setShowUploadPrompt(false)}
                  className="px-4 py-2 text-gray-secondary hover:text-charcoal transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />
      </main>
    </div>
  );
}

export default App;