import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  BookOpen, 
  Menu, 
  User, 
  Brain,
  Archive,
  X,
  Sparkles,
  Home,
  Folder,
  Share2,
  Search,
  Heart,
  Inbox,
  FileText
} from 'lucide-react';
import { useNavigation } from './hooks/useNavigation';
import { SourceCard, NoteCard, Course } from './types';
import Dashboard from './components/Dashboard';
import SourcePage from './components/SourcePage';

function App() {
  // Navigation state management
  const { currentPage, navigateTo, goBack, isCurrentPage } = useNavigation('dashboard');
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<SourceCard | null>(null);
  
  // Data state
  const [sources, setSources] = useState<SourceCard[]>([
    {
      id: '1',
      type: 'pdf',
      title: 'Ancient Chinese Philosophy.pdf',
      content: 'Comprehensive study of Confucian and Taoist principles in modern context.',
      timestamp: '2 hours ago',
      size: '2.4 MB',
      description: 'This comprehensive text explores the fundamental principles of ancient Chinese philosophy and its applications in modern contexts.'
    },
    {
      id: '2',
      type: 'video',
      title: 'The Art of Chinese Calligraphy',
      url: 'https://www.youtube.com/watch?v=example',
      content: 'Traditional brush techniques and their philosophical meanings.',
      timestamp: '1 day ago',
      description: 'Explore traditional brush techniques and their deep philosophical meanings in Chinese culture.'
    },
    {
      id: '3',
      type: 'link',
      title: 'Digital Humanities in East Asian Studies',
      url: 'https://example.com/article',
      content: 'Modern approaches to studying ancient texts using technology.',
      timestamp: '3 days ago',
      description: 'Modern approaches to studying ancient texts using cutting-edge technology and digital methodologies.'
    },
    {
      id: '4',
      type: 'doc',
      title: 'Research Notes - Tang Dynasty.docx',
      content: 'Personal research compilation on Tang Dynasty cultural practices.',
      timestamp: '1 week ago',
      size: '1.8 MB',
      description: 'Personal research compilation focusing on Tang Dynasty cultural practices and their lasting influence.'
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

  const courses: Course[] = [
    { id: '1', name: 'Digital Humanities', color: '#2FA58E', icon: <Brain className="w-3 h-3" /> },
    { id: '2', name: 'East Asian Studies', color: '#C7A14A', icon: <BookOpen className="w-3 h-3" /> },
    { id: '3', name: 'Philosophy & Technology', color: '#D24C3E', icon: <Sparkles className="w-3 h-3" /> }
  ];

  /**
   * Handle source upload with automatic navigation to source page
   * @param source - The uploaded source to add or update
   */
  const handleSourceUpload = useCallback((source: SourceCard) => {
    setSources(prev => {
      const existingIndex = prev.findIndex(s => s.id === source.id);
      if (existingIndex >= 0) {
        // Update existing source
        const updated = [...prev];
        updated[existingIndex] = source;
        return updated;
      } else {
        // Add new source
        return [source, ...prev];
      }
    });
  }, []);

  /**
   * Handle source click with navigation to source page
   * @param source - The source to view
   */
  const handleSourceClick = useCallback((source: SourceCard) => {
    setSelectedSource(source);
    navigateTo('source', {
      onTransitionStart: () => {
        // Optional: Add loading state
      },
      onTransitionComplete: () => {
        // Optional: Analytics or other side effects
      }
    });
  }, [navigateTo]);

  /**
   * Handle navigation back to dashboard
   */
  const handleBackToDashboard = useCallback(() => {
    setSelectedSource(null);
    navigateTo('dashboard');
  }, [navigateTo]);

  /**
   * Handle dashboard navigation from sidebar
   */
  const handleDashboardNavigation = useCallback(() => {
    if (!isCurrentPage('dashboard')) {
      setSelectedSource(null);
      navigateTo('dashboard');
    }
    setSidebarOpen(false);
  }, [navigateTo, isCurrentPage]);

  /**
   * Handle note creation
   */
  const handleCreateNote = useCallback(() => {
    // TODO: Implement note creation functionality
    console.log('Creating new note...');
  }, []);

  /**
   * Handle other navigation items
   */
  const handleNavigation = useCallback((page: string) => {
    console.log(`Navigating to ${page}...`);
    setSidebarOpen(false);
    // TODO: Implement other page navigations
  }, []);

  const templates = [
    { id: '1', name: 'Research Paper', icon: <FileText className="w-4 h-4" /> },
    { id: '2', name: 'Study Guide', icon: <BookOpen className="w-4 h-4" /> },
    { id: '3', name: 'Presentation', icon: <Sparkles className="w-4 h-4" /> }
  ];

  /**
   * Render the current page based on navigation state
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'source':
        return selectedSource ? (
          <SourcePage 
            source={selectedSource} 
            onBack={handleBackToDashboard}
          />
        ) : (
          <Dashboard 
            sources={sources}
            notes={notes}
            onSourceUpload={handleSourceUpload}
            onSourceClick={handleSourceClick}
            onCreateNote={handleCreateNote}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard 
            sources={sources}
            notes={notes}
            onSourceUpload={handleSourceUpload}
            onSourceClick={handleSourceClick}
            onCreateNote={handleCreateNote}
          />
        );
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
                    onClick={handleDashboardNavigation}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ink-ripple ${
                      isCurrentPage('dashboard') ? 'bg-jade/10 text-jade' : 'hover:bg-gray-50'
                    }`}
                    <span>Dashboard</span>
                  </button>
                </li>
                    onClick={() => handleNavigation('explore')}
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    <Search className="w-5 h-5" />
                    <span>Explore</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    onClick={() => handleNavigation('inbox')}
                    <Inbox className="w-5 h-5" />
                    <span>Inbox</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    onClick={() => handleNavigation('shared')}
                    <Share2 className="w-5 h-5" />
                    <span>Shared</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left ink-ripple">
                    onClick={() => handleNavigation('liked')}
                    <Heart className="w-5 h-5" />
                    <span>Liked</span>
                  </button>
                </li>
                    onClick={() => handleNavigation('archive')}
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
                      onClick={() => handleNavigation(`course-${course.id}`)}
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
                      onClick={() => handleNavigation(`template-${template.id}`)}
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
      <main className={`min-h-screen transition-all duration-300 ${
        currentPage === 'source' ? '' : ''
      }`}>
        {/* Conditional Header - only show for dashboard */}
        {currentPage === 'dashboard' && (
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
        )}

        {/* Dynamic Page Content */}
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;