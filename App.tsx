
import React, { useState, useEffect, useCallback } from 'react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { generateMissionPage } from './services/geminiService';
import { Header } from './components/Header';
import { ActionButton } from './components/ActionButton';
import { GeneratedContent } from './components/GeneratedContent';
import { StatusDisplay } from './components/StatusDisplay';
import { MicIcon, BrainCircuitIcon, CheckCircleIcon, AlertTriangleIcon } from './components/Icons';

type AppStatus = 'idle' | 'listening' | 'processing' | 'success' | 'error';

export default function App() {
  const [status, setStatus] = useState<AppStatus>('idle');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleStart = () => {
    setError(null);
    setGeneratedHtml('');
    resetTranscript();
    setStatus('listening');
    startListening();
  };

  const handleStop = () => {
    stopListening();
  };
  
  const handleReset = () => {
    setError(null);
    setGeneratedHtml('');
    resetTranscript();
    setStatus('idle');
  };
  
  const processTranscript = useCallback(async (text: string) => {
      if (!text.trim()) {
        setError("Your mission brief was empty. Please try again.");
        setStatus('error');
        return;
      }
      setStatus('processing');
      setError(null);
      try {
        const html = await generateMissionPage(text);
        setGeneratedHtml(html);
        setStatus('success');
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to generate mission page. ${errorMessage}`);
        setStatus('error');
      }
  }, []);


  useEffect(() => {
    if (!isListening && status === 'listening') {
        processTranscript(transcript);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening, status, transcript]);

  const renderContent = () => {
    if (status === 'success' && generatedHtml) {
      return <GeneratedContent htmlContent={generatedHtml} />;
    }
    if (status === 'error' && error) {
      return (
        <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-4 rounded-lg flex items-center space-x-3">
          <AlertTriangleIcon className="h-6 w-6" />
          <p>{error}</p>
        </div>
      );
    }
    if(status === 'listening' || status === 'processing' || transcript){
         return (
            <div className="w-full bg-black/30 p-6 rounded-lg border border-gray-700/50 min-h-[150px] shadow-inner">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Mission Brief Transcript</h3>
                <p className="text-gray-200 font-mono">{transcript || '...'}</p>
            </div>
        );
    }
    return null;
  };
  
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
          <Header />
          <div className="mt-8 text-center bg-red-900/30 border border-red-500/50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-red-300">Browser Not Supported</h2>
              <p className="mt-2 text-red-400">
                  This experience requires the Web Speech API, which is not available in your browser. 
                  <br />Please try Chrome or another supported browser.
              </p>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2a] text-white flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-center text-center mt-10 md:mt-0">
          <StatusDisplay status={status} />
          <div className="w-full mt-8 space-y-6">
            {renderContent()}
            <ActionButton status={status} onStart={handleStart} onStop={handleStop} onReset={handleReset} />
          </div>
        </main>

        <footer className="text-center py-4 mt-8">
          <p className="text-xs text-gray-500">Powered by Gemini AI. Your mission, broadcasted.</p>
        </footer>
      </div>
    </div>
  );
}
