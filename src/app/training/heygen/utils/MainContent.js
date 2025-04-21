import React, { useState, useRef, useEffect } from 'react';

const DraggableCharacter = ({ character, position, onPositionChange, size, onSizeChange }) => {
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState('');

  useEffect(() => {
    const element = dragRef.current;
    if (!element) return;

    const handleMouseDown = (e) => {
      if (e.target.classList.contains('resize-handle')) {
        setIsResizing(true);
        setResizeStart({
          x: e.clientX,
          y: e.clientY,
          width: size.width,
          height: size.height
        });
        setResizeDirection(e.target.dataset.direction);
        return;
      }

      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    };

    const handleMouseMove = (e) => {
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        let newWidth = size.width;
        let newHeight = size.height;

        switch (resizeDirection) {
          case 'n':
            newHeight = Math.max(50, resizeStart.height - deltaY);
            break;
          case 's':
            newHeight = Math.max(50, resizeStart.height + deltaY);
            break;
          case 'e':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            break;
          case 'w':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            break;
          case 'ne':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            newHeight = Math.max(50, resizeStart.height - deltaY);
            break;
          case 'nw':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            newHeight = Math.max(50, resizeStart.height - deltaY);
            break;
          case 'se':
            newWidth = Math.max(50, resizeStart.width + deltaX);
            newHeight = Math.max(50, resizeStart.height + deltaY);
            break;
          case 'sw':
            newWidth = Math.max(50, resizeStart.width - deltaX);
            newHeight = Math.max(50, resizeStart.height + deltaY);
            break;
        }

        onSizeChange({
          width: newWidth,
          height: newHeight
        });
        return;
      }

      if (!isDragging) return;
      
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const mainContentBox = document.getElementById('main-content-box');
      if (!mainContentBox) return;
      
      const boxRect = mainContentBox.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      const maxX = boxRect.width - elementRect.width;
      const maxY = boxRect.height - elementRect.height;
      
      const boundedX = Math.max(0, Math.min(newX, maxX));
      const boundedY = Math.max(0, Math.min(newY, maxY));
      
      onPositionChange({
        x: boundedX,
        y: boundedY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, resizeDirection, position, size, onPositionChange, onSizeChange]);

  const ResizeHandle = ({ direction }) => (
    <div
      className={`resize-handle absolute bg-light-blue-500 w-3 h-3 rounded-full cursor-${direction}-resize`}
      data-direction={direction}
      style={{
        [direction.includes('n') ? 'top' : 'bottom']: '-4px',
        [direction.includes('e') ? 'right' : 'left']: '-4px',
        transform: direction.includes('n') || direction.includes('s') ? 'translateY(50%)' : 'translateX(50%)'
      }}
    />
  );

  return (
    <div
      ref={dragRef}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        width: size.width,
        height: size.height,
        border: '2px solid #ADD8E6',
        boxSizing: 'border-box'
      }}
    >
      <img
        src={character.preview_image_url}
        alt="Character"
        className="w-full h-full object-contain"
        draggable="false"
      />
      <ResizeHandle direction="n" />
      <ResizeHandle direction="s" />
      <ResizeHandle direction="e" />
      <ResizeHandle direction="w" />
      <ResizeHandle direction="ne" />
      <ResizeHandle direction="nw" />
      <ResizeHandle direction="se" />
      <ResizeHandle direction="sw" />
    </div>
  );
};

const MainContent = ({ selectedItem }) => {
  const [characterPosition, setCharacterPosition] = useState({ x: 0, y: 0 });
  const [characterSize, setCharacterSize] = useState({ width: 200, height: 200 });

  const getBackgroundStyle = () => {
    if (!selectedItem?.background) return 'bg-purple-500';
    
    switch (selectedItem.background.type) {
      case 'color':
        return `bg-[${selectedItem.background.value}]`;
      case 'image':
        return `bg-cover bg-center bg-no-repeat`;
      case 'video':
        return 'bg-black';
      default:
        return 'bg-purple-500';
    }
  };

  return (
    <div className="flex-1 bg-purple-500 relative">
      {!selectedItem ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xl font-medium mb-2">No Item Selected</p>
            <p className="text-sm opacity-80">Please select an item from the list below to start editing</p>
          </div>
        </div>
      ) : (
        <div id='main-content-box' className="absolute w-[calc(100%-0rem)] h-[calc(100%-0rem)]">
          <div className={`w-full h-full relative ${getBackgroundStyle()}`}
            style={selectedItem?.background?.type === 'image' ? {
              backgroundImage: `url(${selectedItem.background.value})`
            } : {}}>
            {selectedItem.background?.type === 'video' && (
              <video 
                src={selectedItem.background.value}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
              />
            )}
            
            {selectedItem.character && (
              <DraggableCharacter
                character={selectedItem.character}
                position={characterPosition}
                onPositionChange={setCharacterPosition}
                size={characterSize}
                onSizeChange={setCharacterSize}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent; 