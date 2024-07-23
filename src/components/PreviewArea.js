import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { StructureElementTypes } from '../utils/elementTypes';
import DraggableElement from './DraggableElement';
import { ColumnElement } from './ElementComponents';

const PreviewArea = ({ elements, isPreview, removeElement, updateElement }) => {
  const renderElement = (element, index) => {
    if (element.type === StructureElementTypes.COLUMN) {
      return (
        <ColumnElement
          key={element.id}
          id={element.id}
          columns={element.columns}
          columnContent={element.columnContent}
          onRemove={removeElement}
          onEdit={updateElement}
          isPreview={isPreview}
        />
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