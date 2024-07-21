import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Type, Square, AlignLeft, Image, Layout, FileText, Video, Eye, AlignCenter, AlignRight, Crown, Lock } from 'lucide-react';
import { TitleElement, ParagraphElement, ButtonElement, ImageElement } from './ElementComponents';

const ElementTypes = {
  TITLE: 'title',
  BUTTON: 'button',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
};

const PremiumElementTypes = {
  GALLERY: 'gallery',
  FORM: 'form',
  VIDEO: 'video',
};

const ElementIcons = {
  [ElementTypes.TITLE]: Type,
  [ElementTypes.BUTTON]: Square,
  [ElementTypes.PARAGRAPH]: AlignLeft,
  [ElementTypes.IMAGE]: Image,
  [PremiumElementTypes.GALLERY]: Layout,
  [PremiumElementTypes.FORM]: FileText,
  [PremiumElementTypes.VIDEO]: Video,
};

const ElementComponents = {
  [ElementTypes.TITLE]: TitleElement,
  [ElementTypes.BUTTON]: ButtonElement,
  [ElementTypes.PARAGRAPH]: ParagraphElement,
  [ElementTypes.IMAGE]: ImageElement,
};

const PageBuilder = ({ templateId, isPremium }) => {
  const [elements, setElements] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    if (result.draggableId === 'image') {
      const newElement = { 
        id: `${result.draggableId}-${elements.length}`, 
        type: result.draggableId, 
        align: 'center',
        content: 'https://via.placeholder.com/150'
      };
      setElements([...elements, newElement]);
    }

    if (result.source.droppableId === 'elements' && result.destination.droppableId === 'preview') {
      const newElement = { id: `${result.draggableId}-${elements.length}`, type: result.draggableId, align: 'center' };
      setElements([...elements, newElement]);
    } else if (result.source.droppableId === 'preview' && result.destination.droppableId === 'preview') {
      const items = Array.from(elements);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setElements(items);
    }
  };

  const removeElement = (id) => {
    setElements(elements.filter(element => element.id !== id));
  };

  const updateElement = (id, updates) => {
    setElements(elements.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ));
  };

  const changeAlignment = (id, align) => {
    updateElement(id, { align });
  };

  const renderElementItem = (type, key, isPremiumElement = false) => (
    <Draggable key={type} draggableId={type} index={Object.keys(ElementTypes).indexOf(key)} isDragDisabled={isPremiumElement && !isPremium}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex items-center p-2 bg-white rounded border ${
            snapshot.isDragging ? 'shadow-lg border-indigo-500' : 'shadow border-gray-200'
          } hover:shadow-md transition-all duration-200 select-none ${isPremiumElement && !isPremium ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {React.createElement(ElementIcons[type], { size: 20, className: `mr-2 ${isPremiumElement ? 'text-orange-500' : 'text-indigo-600'}` })}
          {key.charAt(0).toUpperCase() + key.slice(1)}
          {isPremiumElement && !isPremium && <Lock size={16} className="ml-2 text-orange-500" />}
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Page Builder ({templateId} template)</h2>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center"
        >
          <Eye className="mr-2" size={20} />
          {isPreview ? 'Edit' : 'Preview'}
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {!isPreview && (
            <div className="w-64 bg-white shadow-md p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Elements</h3>
              <Droppable droppableId="elements" isDropDisabled={true}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {Object.entries(ElementTypes).map(([key, type]) => renderElementItem(type, key))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <h3 className="text-lg font-semibold my-4 flex items-center">
                <Crown size={20} className="mr-2 text-orange-500" />
                Premium Elements
              </h3>
              <Droppable droppableId="premium-elements" isDropDisabled={!isPremium}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                    {Object.entries(PremiumElementTypes).map(([key, type]) => renderElementItem(type, key, true))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          )}
          <div className={`flex-1 p-4 overflow-y-auto ${isPreview ? 'bg-gray-100' : ''}`}>
            <Droppable droppableId="preview">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`min-h-full border-2 rounded-lg p-4 ${
                    isPreview ? 'bg-white' : snapshot.isDraggingOver ? 'bg-indigo-50' : 'bg-white'
                  }`}
                  style={{ minHeight: 'calc(100vh - 8rem)' }}
                >
                  {elements.map((element, index) => (
                    <Draggable key={element.id} draggableId={element.id} index={index} isDragDisabled={isPreview}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`mb-4 ${snapshot.isDragging ? 'opacity-50' : ''}`}
                        >
                          <div className={`flex ${element.align === 'left' ? 'justify-start' : element.align === 'right' ? 'justify-end' : 'justify-center'}`}>
                          {ElementComponents[element.type] && React.createElement(ElementComponents[element.type], {
                            ...element,
                            onRemove: isPreview ? null : () => removeElement(element.id),
                            onEdit: isPreview ? null : (updates) => updateElement(element.id, updates),
                            isPreview: isPreview,
                            content: element.content
                          })}
                          </div>
                          {!isPreview && (
                            <div className="flex justify-center mt-2">
                              {['left', 'center', 'right'].map((align) => (
                                <button
                                  key={align}
                                  onClick={() => changeAlignment(element.id, align)}
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
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default PageBuilder;