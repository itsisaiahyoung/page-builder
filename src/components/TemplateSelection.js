import React from 'react';
import { Music, User, Pen } from 'lucide-react';

const TemplateSelection = ({ onSelect }) => {
  const templates = [
    { id: 'producer', name: 'Producer Template', icon: Music },
    { id: 'artist', name: 'Artist Template', icon: User },
    { id: 'custom', name: 'Custom Template', icon: Pen },
  ];

  return (
    <div className="template-selection">
      {templates.map((template) => (
        <div
          key={template.id}
          className="template-option"
          onClick={() => onSelect(template.id)}
        >
          <template.icon size={48} />
          <p>{template.name}</p>
        </div>
      ))}
    </div>
  );
};

export default TemplateSelection;