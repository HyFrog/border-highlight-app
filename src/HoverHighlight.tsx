import React, { useState } from 'react';

interface HoverHighlightProps {
  data: Record<string, boolean>;
}

const HoverHighlight: React.FC<HoverHighlightProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (id: string) => {
    console.log(`Element ID: ${id}`);
  };

  const style = {
    border: isHovered ? '2px solid red' : 'none',
    padding: '20px',
    display: 'inline-block',
  };

  return (
    <div style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Render your content here */}
      {Object.entries(data).map(([id, status]) => (
        <div key={id} onClick={() => handleClick(id)}>
          Element ID: {id}, Status: {status.toString()}
        </div>
      ))}
    </div>
  );
};

export default HoverHighlight;