import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Lock, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { ElementIcons, ElementComponents, StructureElementTypes } from './elementTypes';

const DraggableElement = ({ type, element, index, isPreview, removeElement, updateElement, isPremiumElement = false, isStructureElement = false, isPremium = false, children, columnId, columnIndex }) => {
  const changeAlignment = (align) => {
    updateElement(element.id, { align });
  };

  if (!element) {
    // This is an element in the sidebar
    return (
      <Draggable key={type} draggableId={type} index={index} isDragDisabled={isPremiumElement && !isPremium}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`flex items-center p-2 bg-white rounded border ${
              snapshot.isDragging ? 'shadow-lg border-indigo-500' : 'shadow border-gray-200'
            } hover:shadow-md transition-all duration-200 select-none ${isPremiumElement && !isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {React.createElement(ElementIcons[type], { 
              size: 20, 
              className: `mr-2 ${isPremiumElement ? 'text-orange-500' : isStructureElement ? 'text-green-600' : 'text-indigo-600'}` 
            })}
            {type.charAt(0).toUpperCase() + type.slice(1)}
            {isPremiumElement && !isPremium && <Lock size={16} className="ml-2 text-orange-500" />}
          </div>
        )}
      </Draggable>
    );
  }

  // This is an element in the preview area
  const draggableId = columnId ? `${columnId}-${columnIndex}-${element.id}` : element.id;

  return (
    <Draggable key={draggableId} draggableId={draggableId} index={index} isDragDisabled={isPreview}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 ${snapshot.isDragging ? 'opacity-50' : ''}`}
        >
          {ElementComponents[element.type] && React.createElement(ElementComponents[element.type], {
            ...element,
            onRemove: isPreview ? null : () => removeElement(element.id),
            onEdit: isPreview ? null : (updates) => updateElement(element.id, updates),
            isPreview: isPreview,
            content: element.content,
            children: children
          })}
          {!isPreview && element.type !== StructureElementTypes.COLUMN && element.type !== StructureElementTypes.SPACER && (
            <div className="flex justify-center mt-2">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => changeAlignment(align)}
                  className={`p-1 transition-all duration-200 hover:scale-110 ${element.align === align ? 'text-purple-600' : 'text-gray-400'}`}
                >
                  {align === 'left' && <AlignLeft size={16} />}
                  {align === 'center' && <AlignCenter size={16} />}
                  {align === 'right' && <AlignRight size={16} />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableElement;