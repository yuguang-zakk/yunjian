import React, { useState, useRef, useCallback } from 'react';
import { 
  Plus, 
  FileText, 
  Upload,
  Link,
  Video,
  File,
  Globe,
  ChevronRight,
  Loader,
  PenTool,
  Eye,
  X,
  Folder
} from 'lucide-react';
import { SourceCard, NoteCard } from '../types';

interface DashboardProps {
  sources: SourceCard[];
  notes: NoteCard[];
  onSourceUpload: (source: SourceCard) => void;
  onSourceClick: (source: SourceCard) => void;
  onCreateNote: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  sources, 
  notes, 
  onSourceUpload, 
  onSourceClick,
  onCreateNote 
}) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUploadPrompt, setShowUploadPrompt] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    files.forEach(processFile);
    setUploadModalOpen(false);
  }, []);

  /**
   * Process uploaded file and create source card
   * Handles upload progress simulation and success navigation
   */
  const processFile = (file: File) => {
    const newSource: SourceCard = {
      id: Date.now().toString(),
      type: file.type.includes('pdf') ? 'pdf' : 'doc',
      title: file.name,
      uploadProgress: 0,
      isProcessing: true,
      timestamp: 'Just now',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      description: `Content from ${file.name} has been processed and is ready for analysis.`
    };

    onSourceUpload(newSource);

    // Simulate upload progress
    const interval = setInterval(() => {
      onSourceUpload({
        ...newSource,
        uploadProgress: Math.min((newSource.uploadProgress || 0) + 20, 100)
      });
    }, 300);

    // Complete upload and trigger navigation
    setTimeout(() => {
      clearInterval(interval);
      const completedSource = {
        ...newSource,
        isProcessing: false,
        uploadProgress: 100
      };
      onSourceUpload(completedSource);
      setShowUploadPrompt(true);
      
      // Auto-navigate to source page after successful upload
      setTimeout(() => {
        onSourceClick(completedSource);
      }, 1500);
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
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

      onSourceUpload(newSource);
      setUrlInput('');
      setUploadModalOpen(false);

      setTimeout(() => {
        const completedSource = { ...newSource, isProcessing: false };
        onSourceUpload(completedSource);
        setShowUploadPrompt(true);
        
        // Auto-navigate to source page
        setTimeout(() => {
          onSourceClick(completedSource);
        }, 1000);
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

  return (
    <div 
      className="p-8 relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      {isDragOver && (
        <div className="absolute inset-4 border-2 border-dashed border-jade bg-jade/5 rounded-lg flex items-center justify-center z-20">
          <div className="text-center">
            <Upload className="w-8 h-8 text-jade mx-auto mb-2" />
            <p className="text-jade font-medium">Drop files here to upload</p>
          </div>
        </div>
      )}

      {/* Upload Modal */}
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

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Folder className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Google Drive</span>
                </button>
                <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <Link className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Link</span>
                </button>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                  <Link className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Paste URL here..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 outline-none text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addUrlSource()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Sources Section */}
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
              <div 
                className="bg-white rounded-lg p-4 shadow-soft hover:shadow-medium transition-all cursor-pointer ink-ripple h-40"
                onClick={() => onSourceClick(source)}
              >
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

      {/* Recent Notes Section */}
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
            <button 
              onClick={onCreateNote}
              className="w-64 h-48 border-2 border-dashed border-brass/30 rounded-lg flex flex-col items-center justify-center gap-3 hover:border-brass/50 hover:bg-brass/5 transition-all ink-ripple"
            >
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

      {/* Upload Success Prompt */}
      {showUploadPrompt && (
        <div className="bg-jade/10 border border-jade/20 rounded-lg p-6 mb-8">
          <h4 className="font-medium text-jade mb-2">Sources uploaded successfully!</h4>
          <p className="text-gray-secondary mb-4">Navigating to source page for detailed analysis...</p>
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

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Dashboard;