import React, { useState } from 'react';
import { X, Edit2, Image as ImageIcon } from 'lucide-react';

export const TitleElement = ({ onRemove, onEdit, content, isPreview, align }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(content || 'Sample Title');
  
    const titleContent = (
      <div className={`w-full flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`}>
        <h2 className="text-xl font-bold">{text}</h2>
      </div>
    );
  
    if (isPreview) {
      return titleContent;
    }
  
    return (
      <div className="flex flex-col items-stretch p-2 bg-white border rounded shadow w-full">
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              onEdit({ content: text });
            }}
            className="text-xl font-bold w-full mb-2"
            autoFocus
          />
        ) : (
          titleContent
        )}
        <div className="flex justify-end space-x-2 mt-2">
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
            <Edit2 size={20} />
          </button>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };

export const ParagraphElement = ({ onRemove, onEdit, content, isPreview, align }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || 'Sample paragraph text goes here.');

  const paragraphContent = <p className={`${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>{text}</p>;

  if (isPreview) {
    return paragraphContent;
  }

  return (
    <div className="flex items-center justify-between p-2 bg-white border rounded shadow w-full">
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit({ content: text });
          }}
          className={`w-full ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}
          autoFocus
        />
      ) : (
        <div className="flex-grow">{paragraphContent}</div>
      )}
      <div className="flex space-x-2 ml-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-500 hover:text-blue-700">
          <Edit2 size={20} />
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const ButtonElement = ({ onRemove, onEdit, content, color, isPreview, align }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || 'Sample Button');
  const [buttonColor, setButtonColor] = useState(color || 'bg-blue-500');

  const colorOptions = [
    'bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'
  ];

  const buttonContent = (
    <div className={`w-full ${align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'}`}>
      <button className={`px-4 py-2 ${buttonColor} text-white rounded hover:opacity-80`}>
        {text}
      </button>
    </div>
  );

  if (isPreview) {
    return buttonContent;
  }

  return (
    <div className="flex items-center justify-between p-2 bg-white border rounded shadow w-full">
      {isEditing ? (
        <div className="flex flex-col space-y-2 w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded px-2 py-1"
            autoFocus
          />
          <div className="flex space-x-2">
            {colorOptions.map((c) => (
              <button
                key={c}
                className={`w-6 h-6 rounded-full ${c}`}
                onClick={() => setButtonColor(c)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow">{buttonContent}</div>
      )}
      <div className="flex space-x-2 ml-2">
        <button onClick={() => {
          if (isEditing) {
            onEdit({ content: text, color: buttonColor });
          }
          setIsEditing(!isEditing);
        }} className="text-blue-500 hover:text-blue-700">
          <Edit2 size={20} />
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const ImageElement = ({ onRemove, onEdit, content, isPreview, align }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [src, setSrc] = useState(content || 'https://via.placeholder.com/150');
  
    const imageContent = (
      <div className={`w-full flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`}>
        <img src={src} alt="User uploaded content" className="max-w-full h-auto" />
      </div>
    );
  
    if (isPreview) {
      return imageContent;
    }
  
    return (
      <div className="flex flex-col items-stretch p-2 bg-white border rounded shadow w-full">
        {isEditing ? (
          <input
            type="text"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              onEdit({ content: src });
            }}
            className="w-full border rounded px-2 py-1 mb-2"
            placeholder="Enter image URL"
            autoFocus
          />
        ) : (
          imageContent
        )}
        <div className="flex justify-end space-x-2 mt-2">
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
            <ImageIcon size={20} />
          </button>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
      </div>
    );
  };