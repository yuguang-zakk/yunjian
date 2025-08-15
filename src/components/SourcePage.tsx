import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Video, 
  Globe, 
  File, 
  BookOpen,
  Play,
  Download,
  Share2,
  MoreVertical,
  Plus,
  Waveform,
  Map,
  Clock,
  FileIcon,
  Eye,
  Bookmark
} from 'lucide-react';
import { SourceCard, StudyGuide } from '../types';

interface SourcePageProps {
  source: SourceCard;
  onBack: () => void;
}

const SourcePage: React.FC<SourcePageProps> = ({ source, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'content'>('overview');

  // Mock study guides and notes generated from the source
  const studyGuides: StudyGuide[] = [
    {
      id: '1',
      title: `${source.title} Overview`,
      type: 'overview',
      timestamp: '1d ago',
      sourceCount: 1,
      description: 'Comprehensive overview of key concepts and themes'
    },
    {
      id: '2',
      title: 'Study Guide',
      type: 'study-guide',
      timestamp: '51d ago',
      sourceCount: 1,
      description: 'Structured study materials and key points'
    },
    {
      id: '3',
      title: 'New note',
      type: 'note',
      timestamp: '1d ago',
      sourceCount: 1
    }
  ];

  const getSourceIcon = (type: string, size: string = 'w-6 h-6') => {
    switch (type) {
      case 'pdf': return <File className={`${size} text-red-500`} />;
      case 'doc': return <FileText className={`${size} text-blue-500`} />;
      case 'video': return <Video className={`${size} text-purple-500`} />;
      case 'link': return <Globe className={`${size} text-jade`} />;
      default: return <FileText className={`${size} text-gray-500`} />;
    }
  };

  const getStudyGuideIcon = (type: string) => {
    switch (type) {
      case 'overview': return <Eye className="w-4 h-4" />;
      case 'study-guide': return <BookOpen className="w-4 h-4" />;
      case 'note': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-rice-paper">
      {/* Header */}
      <header className="bg-white shadow-soft px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              {getSourceIcon(source.type)}
              <div>
                <h1 className="text-xl font-semibold text-charcoal">{source.title}</h1>
                <p className="text-sm text-gray-secondary">1 source</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors ink-ripple">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Source Description */}
          <div className="bg-white border-b border-gray-100 p-8">
            <div className="max-w-4xl">
              <p className="text-gray-secondary leading-relaxed mb-6">
                {source.content || source.description || 
                 "This comprehensive source explores fundamental concepts and provides detailed insights into the subject matter. The content has been processed and is ready for analysis, note-taking, and study guide generation."}
              </p>
              
              {/* Source Metadata */}
              <div className="flex items-center gap-6 text-sm text-gray-secondary">
                {source.size && (
                  <div className="flex items-center gap-1">
                    <FileIcon className="w-4 h-4" />
                    <span>{source.size}</span>
                  </div>
                )}
                {source.pageCount && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{source.pageCount} pages</span>
                  </div>
                )}
                {source.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{source.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Added {source.timestamp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border-b border-gray-100 px-8 py-4">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-jade text-white rounded-lg hover:bg-jade-600 transition-colors ink-ripple">
                <Bookmark className="w-4 h-4" />
                <span>Save to note</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ink-ripple">
                <Plus className="w-4 h-4" />
                <span>Add note</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ink-ripple">
                <Waveform className="w-4 h-4" />
                <span>Audio Overview</span>
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ink-ripple">
                <Map className="w-4 h-4" />
                <span>Mind map</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl">
              {/* Tab Navigation */}
              <div className="flex items-center gap-6 mb-8 border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 px-1 border-b-2 transition-colors ${
                    activeTab === 'overview' 
                      ? 'border-jade text-jade' 
                      : 'border-transparent text-gray-secondary hover:text-charcoal'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('content')}
                  className={`pb-3 px-1 border-b-2 transition-colors ${
                    activeTab === 'content' 
                      ? 'border-jade text-jade' 
                      : 'border-transparent text-gray-secondary hover:text-charcoal'
                  }`}
                >
                  Content
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Key Insights</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-secondary">
                        This source provides comprehensive coverage of the subject matter with detailed explanations 
                        and practical examples. Key themes include fundamental principles, methodological approaches, 
                        and real-world applications.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal mb-4">Main Topics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">Core Concepts</h4>
                        <p className="text-sm text-gray-secondary">Fundamental principles and theoretical foundations</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">Practical Applications</h4>
                        <p className="text-sm text-gray-secondary">Real-world implementations and case studies</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">Methodologies</h4>
                        <p className="text-sm text-gray-secondary">Approaches and techniques for implementation</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">Future Directions</h4>
                        <p className="text-sm text-gray-secondary">Emerging trends and potential developments</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    {getSourceIcon(source.type, 'w-12 h-12 mx-auto mb-4')}
                    <h3 className="text-lg font-semibold text-charcoal mb-2">Source Content</h3>
                    <p className="text-gray-secondary mb-4">
                      The full content of this source is available for analysis and reference.
                    </p>
                    <button className="flex items-center gap-2 px-4 py-2 bg-jade text-white rounded-lg hover:bg-jade-600 transition-colors ink-ripple mx-auto">
                      <Eye className="w-4 h-4" />
                      <span>View Full Content</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Studio Panel */}
        <div className="w-80 bg-gray-900 text-white p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Studio</h2>
            <button className="p-1 hover:bg-gray-800 rounded">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Study Guides Section */}
          <div className="space-y-4">
            {studyGuides.map((guide) => (
              <div key={guide.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStudyGuideIcon(guide.type)}
                    <span className="text-sm font-medium">{guide.title}</span>
                  </div>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <MoreVertical className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-400 mb-2">
                  {guide.sourceCount} source • {guide.timestamp}
                </div>
                
                {guide.description && (
                  <p className="text-xs text-gray-300">{guide.description}</p>
                )}
              </div>
            ))}
          </div>

          {/* Add New Button */}
          <button className="w-full mt-6 p-3 border border-gray-700 border-dashed rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-gray-400 hover:text-white">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourcePage;