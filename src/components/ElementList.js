import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Grid, Layout, Crown } from 'lucide-react';
import DraggableElement from './DraggableElement';
import { ElementTypes, StructureElementTypes, PremiumElementTypes } from './elementTypes';

const ElementList = ({ isPremium }) => {
  return (
    <div className="w-64 bg-white shadow-md p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Grid size={20} className="mr-2 text-indigo-600" />
        Elements
      </h3>
      <Droppable droppableId="elements" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {Object.entries(ElementTypes).map(([key, type], index) => 
              <DraggableElement 
                key={type} 
                type={type} 
                index={index}
                isStructureElement={false}
                isPremiumElement={false}
                isPremium={isPremium}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <h3 className="text-lg font-semibold my-4 flex items-center">
        <Layout size={20} className="mr-2 text-green-600" />
        Structure
      </h3>
      <Droppable droppableId="structure-elements" isDropDisabled={true}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
            {Object.entries(StructureElementTypes).map(([key, type], index) => 
              <DraggableElement 
                key={type} 
                type={type} 
                index={index}
                isStructureElement={true}
                isPremiumElement={false}
                isPremium={isPremium}
              />
            )}
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
            {Object.entries(PremiumElementTypes).map(([key, type], index) => 
              <DraggableElement 
                key={type} 
                type={type} 
                index={index}
                isStructureElement={false}
                isPremiumElement={true}
                isPremium={isPremium}
              />
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ElementList;