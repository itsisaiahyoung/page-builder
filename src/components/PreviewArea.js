import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { StructureElementTypes } from './elementTypes';
import DraggableElement from './DraggableElement';

const PreviewArea = ({ elements, isPreview, removeElement, updateElement }) => {
  const renderElement = (element, index, columnId = null, columnIndex = null) => {
    if (element.type === StructureElementTypes.COLUMN) {
      return (
        <DraggableElement
          key={element.id}
          element={element}
          index={index}
          isPreview={isPreview}
          removeElement={removeElement}
          updateElement={updateElement}
        >
          {element.columnContent.map((column, colIndex) => (
            <Droppable key={`${element.id}-column-${colIndex}`} droppableId={`column-${element.id}-${colIndex}`}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 p-2 ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'}`}
                >
                  {column.map((item, itemIndex) => renderElement(item, itemIndex, element.id, colIndex))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DraggableElement>
      );
    }

    return (
      <DraggableElement
        key={element.id}
        element={element}
        index={index}
        isPreview={isPreview}
        removeElement={removeElement}
        updateElement={updateElement}
        columnId={columnId}
        columnIndex={columnIndex}
      />
    );
  };

  return (
    <div className={`flex-1 p-4 overflow-y-auto ${isPreview ? 'bg-gray-100' : ''}`}>
      <Droppable droppableId="preview">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`min-h-full rounded-lg p-4 ${
              isPreview ? 'bg-white' : snapshot.isDraggingOver ? 'bg-indigo-50' : 'bg-white'
            }`}
            style={{ minHeight: 'calc(100vh - 8rem)' }}
          >
            {elements.map((element, index) => renderElement(element, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default PreviewArea;