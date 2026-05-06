// app/page.js
'use client';

import { useState, useEffect, useRef } from 'react';

// لیست کلمات کلیدی برای auto-complete ادیتور
const KEYWORDS = [
  'بنویس', 'متغیر', 'اگر', 'در غیر این صورت', 'وگرنه',
  'باشد', 'است', 'نیست', 'و', 'یا'
];

// ارسال به بک‌اند (Flask)
async function runOnBackend(commands) {
  const response = await fetch('http://localhost:5000/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ commands: commands }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Backend error: ${err}`);
  }
  const data = await response.json();
  return data.results;
}

export default function Home() {
  // ---------- ادیتور ----------
  const [code, setCode] = useState(`بنویس زنده باد زرشک پلو
`);
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  // auto‑complete ادیتور
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const [currentWordStart, setCurrentWordStart] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  // ---------- ترمینال ----------
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalContainerRef = useRef(null);
  const terminalInputRef = useRef(null);

  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [terminalWidth, setTerminalWidth] = useState(480);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const getTimestamp = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
  };

  const addToTerminal = (type, content, details = null) => {
    setTerminalHistory(prev => [...prev, { type, content, timestamp: getTimestamp(), details }]);
    scrollTerminalToBottom();
  };

  const scrollTerminalToBottom = () => {
    setTimeout(() => {
      if (terminalContainerRef.current) {
        terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const processTerminalCommand = async (input) => {
    const trimmed = input.trim();
    if (trimmed === '') return;

    addToTerminal('command', trimmed);

    if (trimmed === 'پاک') {
      setTerminalHistory([]);
      addToTerminal('output', 'ترمینال پاک شد.');
      return;
    }

    if (trimmed === 'کمک') {
      const helpText = 'دستورات موجود:\n  اجرا       : اجرای کد ادیتور\n  پاک        : پاک کردن ترمینال\n  کمک        : نمایش این راهنما\n\nهمچنین می‌توانید دستورات ZP را مستقیماً تایپ کنید (مثال: بنویس "سلام")';
      addToTerminal('output', helpText);
      return;
    }

    if (trimmed === 'اجرا') {
      addToTerminal('output', '🔄 در حال اجرای کد...');
      const startTime = performance.now();
      try {
        const lines = code.split('\n').filter(line => line.trim() !== '');
        const results = await runOnBackend(lines);
        const endTime = performance.now();
        const elapsed = ((endTime - startTime) / 1000).toFixed(2);
        
        let fullOutput = '';
        const allDetails = [];
        results.forEach((res, idx) => {
          allDetails.push({
            command: res.command,
            output: res.output,
            status: res.status,
            index: idx + 1
          });
          if (res.output) fullOutput += res.output + '\n';
        });
        
        addToTerminal('output', fullOutput.trim() || '✓ اجرا شد', allDetails);
        addToTerminal('info', `⏱️ ${elapsed} ثانیه`);
      } catch (err) {
        addToTerminal('output', `❌ خطا: ${err.message}`);
      }
      return;
    }

    // دستور مستقیم ZP
    addToTerminal('output', `🔄 در حال اجرا...`);
    const startTime = performance.now();
    try {
      const results = await runOnBackend([trimmed]);
      const endTime = performance.now();
      const elapsed = ((endTime - startTime) / 1000).toFixed(2);
      let outputText = '';
      const allDetails = [];
      results.forEach((res, idx) => {
        allDetails.push({
          command: res.command,
          output: res.output,
          status: res.status,
          index: idx + 1
        });
        outputText = res.output;
      });
      addToTerminal('output', outputText || '✓ اجرا شد', allDetails);
      addToTerminal('info', `⏱️ ${elapsed} ثانیه`);
    } catch (err) {
      addToTerminal('output', `❌ خطا: ${err.message}`);
    }
  };

  const handleRunFromButton = async () => {
    if (!isTerminalOpen) {
      setIsTerminalOpen(true);
      setTimeout(() => {
        processTerminalCommand('اجرا');
      }, 100);
    } else {
      await processTerminalCommand('اجرا');
    }
  };

  const handleTerminalKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = terminalInput;
      setTerminalInput('');
      processTerminalCommand(input);
    }
  };

  // auto-complete ادیتور
  const getCurrentWord = (textarea) => {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = code.substring(0, cursorPos);
    const lastSpaceIndex = Math.max(
      textBeforeCursor.lastIndexOf(' '),
      textBeforeCursor.lastIndexOf('\n'),
      textBeforeCursor.lastIndexOf('\t'),
      textBeforeCursor.lastIndexOf('('),
      textBeforeCursor.lastIndexOf(')'),
      textBeforeCursor.lastIndexOf('='),
      textBeforeCursor.lastIndexOf('"')
    );
    const wordStart = lastSpaceIndex === -1 ? 0 : lastSpaceIndex + 1;
    const currentWord = code.substring(wordStart, cursorPos);
    return { wordStart, currentWord };
  };

  const getCursorCoordinates = () => {
    const textarea = textareaRef.current;
    if (!textarea) return { top: 0, left: 0 };
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = code.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const currentLineIndex = lines.length - 1;
    const currentLineText = lines[currentLineIndex];
    const measureDiv = document.createElement('div');
    const style = window.getComputedStyle(textarea);
    measureDiv.style.position = 'absolute';
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.whiteSpace = 'pre';
    measureDiv.style.font = style.font;
    measureDiv.style.fontSize = style.fontSize;
    measureDiv.style.fontFamily = style.fontFamily;
    measureDiv.style.letterSpacing = style.letterSpacing;
    const textUpToCursor = currentLineText.substring(0, cursorPos - (textBeforeCursor.length - currentLineText.length));
    measureDiv.textContent = textUpToCursor;
    document.body.appendChild(measureDiv);
    const textWidth = measureDiv.offsetWidth;
    document.body.removeChild(measureDiv);
    const lineHeight = parseInt(style.lineHeight, 10);
    const textareaRect = textarea.getBoundingClientRect();
    const top = textareaRect.top + (currentLineIndex * lineHeight) + lineHeight + 5;
    const left = textareaRect.left + textWidth;
    return { top, left };
  };

  const handleInput = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    const textarea = textareaRef.current;
    const { wordStart, currentWord } = getCurrentWord(textarea);
    if (currentWord.length > 0) {
      const matched = KEYWORDS.filter(kw => kw.startsWith(currentWord));
      if (matched.length > 0) {
        setSuggestions(matched);
        setShowSuggestions(true);
        setCurrentWordStart(wordStart);
        setSelectedSuggestionIndex(0);
        const { top, left } = getCursorCoordinates();
        setSuggestionPosition({ top, left });
        return;
      }
    }
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion) => {
    if (currentWordStart === null) return;
    const before = code.substring(0, currentWordStart);
    const after = code.substring(textareaRef.current.selectionStart);
    const newCode = before + suggestion + after;
    setCode(newCode);
    setShowSuggestions(false);
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = before.length + suggestion.length;
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
        textareaRef.current.focus();
      }
    }, 10);
  };

  const handleEditorKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        if (suggestions[selectedSuggestionIndex]) {
          selectSuggestion(suggestions[selectedSuggestionIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
  };

  useEffect(() => {
    setLineCount(code.split('\n').length);
  }, [code]);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (textareaRef.current && !textareaRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleResizeStart = (e) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = terminalWidth;
  };

  const handleResizeMove = (e) => {
    if (!isResizing) return;
    const delta = startXRef.current - e.clientX;
    let newWidth = startWidthRef.current + delta;
    if (newWidth < 280) newWidth = 280;
    if (newWidth > window.innerWidth - 300) newWidth = window.innerWidth - 300;
    setTerminalWidth(newWidth);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentDetails, setCurrentDetails] = useState(null);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'radial-gradient(circle at 20% 50%, #0a0f1e, #03050a)',
      fontFamily: "'Fira Code', monospace",
    }}>
      {/* نوار ابزار */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px',
        background: 'rgba(10, 20, 30, 0.6)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '28px' }}>🍛</span>
          <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#0ff' }}>ZP IDE</span>
          <span style={{
            fontSize: '14px',
            padding: '4px 12px',
            background: 'rgba(0, 255, 255, 0.2)',
            border: '1px solid #0ff',
            borderRadius: '20px',
            color: '#0ff',
          }}>{lineCount} خط</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            style={{
              padding: '8px 20px',
              background: isTerminalOpen ? 'rgba(255, 80, 80, 0.6)' : 'rgba(0, 255, 255, 0.4)',
              border: 'none',
              borderRadius: '40px',
              color: '#fff',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {isTerminalOpen ? '🗄️ بستن ترمینال' : '🖥️ باز کردن ترمینال'}
          </button>
          <button
            onClick={handleRunFromButton}
            style={{
              padding: '8px 24px',
              background: 'linear-gradient(135deg, #0cf, #0a6)',
              border: 'none',
              borderRadius: '40px',
              color: '#000',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 0 12px #0ff',
            }}
          >
            ▶ اجرا
          </button>
        </div>
      </div>

      {/* بخش اصلی */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* ادیتور */}
        <div style={{ flex: isTerminalOpen ? `1 1 calc(100% - ${terminalWidth}px)` : '1', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleInput}
              onScroll={handleScroll}
              onKeyDown={handleEditorKeyDown}
              style={{
                flex: 1,
                padding: '24px',
                fontFamily: "'Fira Code', monospace",
                fontSize: '18px',
                lineHeight: '1.6',
                background: 'rgba(5, 10, 20, 0.7)',
                backdropFilter: 'blur(8px)',
                color: '#e0e0e0',
                resize: 'none',
                outline: 'none',
                border: 'none',
                direction: 'rtl',
                textAlign: 'right',
                caretColor: '#0ff',
              }}
              spellCheck={false}
            />
            <div
              ref={lineNumbersRef}
              style={{
                width: '70px',
                padding: '24px 8px',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontSize: '18px',
                lineHeight: '1.6',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(8px)',
                color: '#0af',
                borderLeft: '1px solid rgba(0, 255, 255, 0.3)',
              }}
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1} style={{ lineHeight: '1.6' }}>{i + 1}</div>
              ))}
            </div>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'fixed',
                top: suggestionPosition.top,
                left: suggestionPosition.left,
                background: 'rgba(20, 30, 50, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid #0ff',
                borderRadius: '12px',
                zIndex: 1000,
                minWidth: '180px',
              }}
            >
              {suggestions.map((sug, idx) => (
                <div
                  key={idx}
                  onClick={() => selectSuggestion(sug)}
                  style={{
                    padding: '10px 18px',
                    cursor: 'pointer',
                    color: idx === selectedSuggestionIndex ? '#000' : '#0ff',
                    backgroundColor: idx === selectedSuggestionIndex ? 'rgba(0, 255, 255, 0.4)' : 'transparent',
                    fontSize: '16px',
                  }}
                >
                  {sug}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* دستگیره تغییر عرض */}
        {isTerminalOpen && (
          <div
            onMouseDown={handleResizeStart}
            style={{
              width: '6px',
              cursor: 'ew-resize',
              backgroundColor: '#0ff8',
              zIndex: 20,
            }}
          />
        )}

        {/* ترمینال ساده */}
        {isTerminalOpen && (
          <div style={{
            width: terminalWidth,
            display: 'flex',
            flexDirection: 'column',
            background: 'rgba(0, 0, 0, 0.9)',
            borderLeft: '2px solid #0ff',
          }}>
            <div style={{
              padding: '12px 16px',
              background: '#0ff2',
              borderBottom: '1px solid #0ff',
              color: '#0ff',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>🖥️ ترمینال ZP</span>
              <span style={{ cursor: 'pointer' }} onClick={() => setIsTerminalOpen(false)}>✕</span>
            </div>
            <div
              ref={terminalContainerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: '#eef',
              }}
            >
              {terminalHistory.map((item, idx) => (
                <div key={idx} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: '#6a9', marginBottom: '4px' }}>{item.timestamp}</div>
                  {item.type === 'command' && (
                    <div style={{ color: '#0ff', fontWeight: 'bold', fontSize: '13px' }}>
                      $ {item.content}
                    </div>
                  )}
                  {item.type === 'output' && (
                    <div style={{
                      background: '#112',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      marginTop: '6px',
                      fontSize: '18px',
                      fontWeight: '500',
                      textAlign: 'center',
                      color: '#fff',
                      border: '1px solid #2a4',
                    }}>
                      {item.content}
                    </div>
                  )}
                  {item.type === 'info' && (
                    <div style={{ fontSize: '11px', color: '#8af', textAlign: 'right', marginTop: '4px' }}>
                      {item.content}
                    </div>
                  )}
                  {item.details && item.details.length > 0 && (
                    <div style={{ marginTop: '8px', textAlign: 'center' }}>
                      <button
                        onClick={() => {
                          setCurrentDetails(item.details);
                          setShowDetailModal(true);
                        }}
                        style={{
                          background: 'none',
                          border: '1px solid #0ff',
                          color: '#0ff',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          cursor: 'pointer',
                        }}
                      >
                        📋 جزئیات
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                <span style={{ color: '#0ff', fontWeight: 'bold' }}>$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalKeyDown}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* مودال جزئیات */}
      {showDetailModal && currentDetails && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '70%',
            maxWidth: '800px',
            height: '60%',
            background: '#0a0f1e',
            border: '2px solid #0ff',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              padding: '12px 20px',
              background: '#0ff2',
              borderBottom: '1px solid #0ff',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span style={{ fontWeight: 'bold', color: '#0ff' }}>📋 جزئیات اجرا</span>
              <button onClick={() => setShowDetailModal(false)} style={{ background: 'none', border: 'none', color: '#0ff', fontSize: '24px', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {currentDetails.map((cmd, i) => (
                <div key={i} style={{
                  background: '#112',
                  marginBottom: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #0ff',
                }}>
                  <div style={{ color: '#0ff', fontWeight: 'bold', marginBottom: '6px' }}>📌 {cmd.command}</div>
                  <div style={{ color: '#ddd', whiteSpace: 'pre-wrap', fontSize: '13px' }}>{cmd.output}</div>
                  <div style={{ color: '#6a9', fontSize: '10px', marginTop: '6px' }}>وضعیت: {cmd.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
