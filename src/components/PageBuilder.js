import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Eye, Code } from 'lucide-react';
import ElementList from './ElementList';
import PreviewArea from './PreviewArea';
import { StructureElementTypes, createNewElement } from './elementTypes';
import ExportModal from './ExportModal';

const PageBuilder = ({ templateId, isPremium }) => {
  const [elements, setElements] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    console.log('Elements updated:', elements);
  }, [elements]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const newElements = Array.from(elements);

    // Dragging from element list to preview area or column
    if (source.droppableId === 'elements' || source.droppableId === 'structure-elements' || source.droppableId === 'premium-elements') {
      const newElement = createNewElement(draggableId);
      
      if (destination.droppableId === 'preview') {
        newElements.splice(destination.index, 0, newElement);
      } else if (destination.droppableId.startsWith('column-')) {
        const [columnId, columnIndex] = destination.droppableId.split('-').slice(1);
        const columnElementIndex = newElements.findIndex(el => el.id === columnId);
        if (columnElementIndex !== -1) {
          const columnElement = newElements[columnElementIndex];
          if (!columnElement.columnContent[parseInt(columnIndex)]) {
            columnElement.columnContent[parseInt(columnIndex)] = [];
          }
          columnElement.columnContent[parseInt(columnIndex)].splice(destination.index, 0, newElement);
        }
      }
    } 
    // Reordering within preview area
    else if (source.droppableId === 'preview' && destination.droppableId === 'preview') {
      const [reorderedItem] = newElements.splice(source.index, 1);
      newElements.splice(destination.index, 0, reorderedItem);
    } 
    // Moving between columns or within the same column
    else if (source.droppableId.startsWith('column-') && destination.droppableId.startsWith('column-')) {
      const [sourceColumnId, sourceColumnIndex] = source.droppableId.split('-').slice(1);
      const [destColumnId, destColumnIndex] = destination.droppableId.split('-').slice(1);
      
      const sourceColumnElementIndex = newElements.findIndex(el => el.id === sourceColumnId);
      const destColumnElementIndex = newElements.findIndex(el => el.id === destColumnId);
      
      if (sourceColumnElementIndex !== -1 && destColumnElementIndex !== -1) {
        const sourceColumnElement = newElements[sourceColumnElementIndex];
        const destColumnElement = newElements[destColumnElementIndex];
        const [movedItem] = sourceColumnElement.columnContent[parseInt(sourceColumnIndex)].splice(source.index, 1);
        if (!destColumnElement.columnContent[parseInt(destColumnIndex)]) {
          destColumnElement.columnContent[parseInt(destColumnIndex)] = [];
        }
        destColumnElement.columnContent[parseInt(destColumnIndex)].splice(destination.index, 0, movedItem);
      }
    } 
    // Moving from preview area to column
    else if (source.droppableId === 'preview' && destination.droppableId.startsWith('column-')) {
      const [columnId, columnIndex] = destination.droppableId.split('-').slice(1);
      const columnElementIndex = newElements.findIndex(el => el.id === columnId);
      const [movedItem] = newElements.splice(source.index, 1);
      
      if (columnElementIndex !== -1) {
        const columnElement = newElements[columnElementIndex];
        if (!columnElement.columnContent[parseInt(columnIndex)]) {
          columnElement.columnContent[parseInt(columnIndex)] = [];
        }
        columnElement.columnContent[parseInt(columnIndex)].splice(destination.index, 0, movedItem);
      }
    } 
    // Moving from column to preview area
    else if (source.droppableId.startsWith('column-') && destination.droppableId === 'preview') {
      const [sourceColumnId, sourceColumnIndex] = source.droppableId.split('-').slice(1);
      const sourceColumnElementIndex = newElements.findIndex(el => el.id === sourceColumnId);
      
      if (sourceColumnElementIndex !== -1) {
        const sourceColumnElement = newElements[sourceColumnElementIndex];
        const [movedItem] = sourceColumnElement.columnContent[parseInt(sourceColumnIndex)].splice(source.index, 1);
        newElements.splice(destination.index, 0, movedItem);
      }
    }

    // After updating newElements
    console.log('Elements after update:', newElements);
    setElements(newElements);
  };

  const removeElement = (id) => {
    setElements(prevElements => {
      return prevElements.reduce((acc, element) => {
        if (element.id === id) {
          return acc;
        }
        if (element.type === StructureElementTypes.COLUMN) {
          const updatedColumnContent = element.columnContent.map(column => 
            column.filter(item => item.id !== id)
          );
          return [...acc, { ...element, columnContent: updatedColumnContent }];
        }
        return [...acc, element];
      }, []);
    });
  };

  const updateElement = (id, updates) => {
    setElements(prevElements => {
      return prevElements.map(element => {
        if (element.id === id) {
          return { ...element, ...updates };
        }
        if (element.type === StructureElementTypes.COLUMN) {
          const updatedColumnContent = element.columnContent.map(column =>
            column.map(item => item.id === id ? { ...item, ...updates } : item)
          );
          return { ...element, columnContent: updatedColumnContent };
        }
        return element;
      });
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-800 shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-200">{templateId} Template</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
          >
            <Eye className="mr-2" size={20} />
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors duration-200 flex items-center"
          >
            <Code className="mr-2" size={20} />
            Export
          </button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {!isPreview && (
            <ElementList isPremium={isPremium} />
          )}
          <PreviewArea 
            elements={elements} 
            isPreview={isPreview} 
            removeElement={removeElement}
            updateElement={updateElement}
          />
        </div>
      </DragDropContext>
      {showExportModal && (
        <ExportModal 
          elements={elements} 
          onClose={() => setShowExportModal(false)} 
        />
      )}
    </div>
  );
};

export default PageBuilder;