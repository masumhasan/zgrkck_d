import React from 'react';

// Renders **bold** and *italic* inline tokens.
export const FormattedText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => (
  <div className={className}>
    {text.split('\n').map((line, lineIdx) => {
      const tokens = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return (
        <p key={lineIdx} className={line.trim() === '' ? 'h-3' : 'mb-1 leading-relaxed'}>
          {tokens.map((tok, i) => {
            if (tok.startsWith('**') && tok.endsWith('**') && tok.length > 4) {
              return <strong key={i}>{tok.slice(2, -2)}</strong>;
            }
            if (tok.startsWith('*') && tok.endsWith('*') && tok.length > 2) {
              return <em key={i}>{tok.slice(1, -1)}</em>;
            }
            return <React.Fragment key={i}>{tok}</React.Fragment>;
          })}
        </p>
      );
    })}
  </div>
);
