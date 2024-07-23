import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Eye, Code } from 'lucide-react';
import ElementList from './ElementList';
import PreviewArea from './PreviewArea';
import { ElementTypes, StructureElementTypes, PremiumElementTypes, createNewElement } from '../utils/elementTypes';
import ExportModal from './ExportModal';

const PageBuilder = ({ templateId, isPremium }) => {
  const [elements, setElements] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    console.log('Elements updated:', JSON.stringify(elements, null, 2));
  }, [elements]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    console.log('onDragEnd called with result:', result);
  
    if (!destination) {
      console.log('No destination, drag cancelled');
      return;
    }
  
    console.log('Source:', source);
    console.log('Destination:', destination);
  
    const newElements = Array.from(elements);
  
    // Helper function to find a column element and its content
    const findColumnAndContent = (columnId, columnIndex) => {
      const columnElementIndex = newElements.findIndex(el => el.id === columnId);
      if (columnElementIndex !== -1) {
        const columnElement = newElements[columnElementIndex];
        const columnContent = columnElement.columnContent[parseInt(columnIndex)] || [];
        return { columnElement, columnContent, columnElementIndex };
      }
      return null;
    };
  
    // Helper function to parse column ID and index from droppable ID
    const parseColumnInfo = (droppableId) => {
      if (!droppableId || typeof droppableId !== 'string') {
        console.error('Invalid droppableId:', droppableId);
        return null;
      }
      const parts = droppableId.split('-');
      return {
        columnId: parts.slice(1, -1).join('-'),
        columnIndex: parseInt(parts[parts.length - 1])
      };
    };
  
    // Dragging from element list to preview area or column
    if (source.droppableId === 'elements' || source.droppableId === 'structure-elements' || source.droppableId === 'premium-elements') {
      const newElement = createNewElement(draggableId);
      
      if (destination.droppableId === 'preview') {
        newElements.splice(destination.index, 0, newElement);
      } else if (destination.droppableId.startsWith('column-')) {
        const columnInfo = parseColumnInfo(destination.droppableId);
        if (columnInfo) {
          const { columnId, columnIndex } = columnInfo;
          const columnData = findColumnAndContent(columnId, columnIndex);
          if (columnData) {
            columnData.columnContent.splice(destination.index, 0, newElement);
            columnData.columnElement.columnContent[columnIndex] = columnData.columnContent;
          }
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
      const sourceInfo = parseColumnInfo(source.droppableId);
      const destInfo = parseColumnInfo(destination.droppableId);
      
      if (sourceInfo && destInfo) {
        const sourceColumnData = findColumnAndContent(sourceInfo.columnId, sourceInfo.columnIndex);
        const destColumnData = findColumnAndContent(destInfo.columnId, destInfo.columnIndex);
        
        if (sourceColumnData && destColumnData) {
          const [movedItem] = sourceColumnData.columnContent.splice(source.index, 1);
          destColumnData.columnContent.splice(destination.index, 0, movedItem);
          
          sourceColumnData.columnElement.columnContent[sourceInfo.columnIndex] = sourceColumnData.columnContent;
          destColumnData.columnElement.columnContent[destInfo.columnIndex] = destColumnData.columnContent;
        }
      }
    } 
    // Moving from preview area to column
    else if (source.droppableId === 'preview' && destination.droppableId.startsWith('column-')) {
      const columnInfo = parseColumnInfo(destination.droppableId);
      if (columnInfo) {
        const { columnId, columnIndex } = columnInfo;
        const [movedItem] = newElements.splice(source.index, 1);
        
        const columnData = findColumnAndContent(columnId, columnIndex);
        if (columnData) {
          columnData.columnContent.splice(destination.index, 0, movedItem);
          columnData.columnElement.columnContent[columnIndex] = columnData.columnContent;
        }
      }
    } 
    // Moving from column to preview area
    else if (source.droppableId.startsWith('column-') && destination.droppableId === 'preview') {
      const columnInfo = parseColumnInfo(source.droppableId);
      if (columnInfo) {
        const { columnId, columnIndex } = columnInfo;
        
        const sourceColumnData = findColumnAndContent(columnId, columnIndex);
        
        if (sourceColumnData) {
          const [movedItem] = sourceColumnData.columnContent.splice(source.index, 1);
          newElements.splice(destination.index, 0, movedItem);
          sourceColumnData.columnElement.columnContent[columnIndex] = sourceColumnData.columnContent;
        }
      }
    }
  
    console.log('Updated elements:', newElements);
    setElements(newElements);
  };

  const removeElement = (id) => {
    console.log(`Removing element with id ${id}`);
    setElements(prevElements => {
      const newElements = prevElements.reduce((acc, element) => {
        if (element.id === id) {
          console.log(`Found element to remove: ${element.type}`);
          return acc;
        }
        if (element.type === StructureElementTypes.COLUMN) {
          const updatedColumnContent = element.columnContent.map(column => 
            column.filter(item => item.id !== id)
          );
          console.log(`Updated column content after removal:`, updatedColumnContent);
          return [...acc, { ...element, columnContent: updatedColumnContent }];
        }
        return [...acc, element];
      }, []);
      console.log('Elements after removal:', JSON.stringify(newElements, null, 2));
      return newElements;
    });
  };

  const updateElement = (id, updates) => {
    console.log(`Updating element with id ${id}:`, updates);
    setElements(prevElements => {
      const newElements = prevElements.map(element => {
        if (element.id === id) {
          console.log(`Updating element: ${element.type}`);
          return { ...element, ...updates };
        }
        if (element.type === StructureElementTypes.COLUMN) {
          const updatedColumnContent = element.columnContent.map(column =>
            column.map(item => item.id === id ? { ...item, ...updates } : item)
          );
          console.log(`Updated column content after update:`, updatedColumnContent);
          return { ...element, columnContent: updatedColumnContent };
        }
        return element;
      });
      console.log('Elements after update:', JSON.stringify(newElements, null, 2));
      return newElements;
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