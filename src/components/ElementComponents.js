import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { X, Edit2, Image as ImageIcon, Columns, ChevronUp, ChevronDown, Maximize, Layout, FileText, Video } from 'lucide-react';
import DraggableElement from './DraggableElement';

export const TitleElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
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

export const ParagraphElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
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

export const ButtonElement = ({ id, content, color, align, onRemove, onEdit, isPreview }) => {
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

export const ImageElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
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

export const ColumnElement = ({ id, columns, columnContent, onRemove, onEdit, isPreview, children }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [columnCount, setColumnCount] = useState(columns);

  const handleColumnCountChange = (newCount) => {
    setColumnCount(newCount);
    onEdit({ columns: newCount, columnContent: Array(newCount).fill([]).map((_, i) => columnContent[i] || []) });
  };

  return (
    <div className="w-full p-2 bg-white border rounded shadow">
      {!isPreview && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Columns size={20} className="mr-2" />
            <span>Columns: {columnCount}</span>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
              <Edit2 size={20} />
            </button>
            <button onClick={onRemove} className="text-red-500 hover:text-red-700">
              <X size={20} />
            </button>
          </div>
        </div>
      )}
      {isEditing && !isPreview && (
        <div className="flex items-center space-x-2 mb-2">
          <button
            onClick={() => handleColumnCountChange(Math.max(1, columnCount - 1))}
            className="p-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span>{columnCount}</span>
          <button
            onClick={() => handleColumnCountChange(Math.min(4, columnCount + 1))}
            className="p-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      )}
      <div className={`flex ${isPreview ? '' : 'border border-dashed border-gray-300'} rounded`}>
        {Array.from({ length: columnCount }).map((_, index) => (
          <Droppable key={`${id}-column-${index}`} droppableId={`column-${id}-${index}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex-1 p-2 ${snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                {columnContent[index]?.map((item, itemIndex) => (
                  <DraggableElement
                    key={item.id}
                    element={item}
                    index={itemIndex}
                    isPreview={isPreview}
                    removeElement={onRemove}
                    updateElement={onEdit}
                    columnId={id}
                    columnIndex={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </div>
  );
};

export const SpacerElement = ({ id, height, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(height || 50);

  const handleHeightChange = (newHeight) => {
    setSpacerHeight(newHeight);
    onEdit({ height: newHeight });
  };

  if (isPreview) {
    return <div style={{ height: `${spacerHeight}px` }} />;
  }

  return (
    <div className="w-full p-2 bg-white border rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <Maximize size={20} className="mr-2" />
          <span>Spacer: {spacerHeight}px</span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
            <Edit2 size={20} />
          </button>
          <button onClick={onRemove} className="text-red-500 hover:text-red-700">
            <X size={20} />
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="range"
            min="10"
            max="200"
            value={spacerHeight}
            onChange={(e) => handleHeightChange(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      )}
      <div style={{ height: `${spacerHeight}px` }} className="bg-gray-200 w-full" />
    </div>
  );
};

export const GalleryElement = ({ id, images, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);

  const galleryContent = (
    <div className="grid grid-cols-3 gap-2">
      {images.map((img, index) => (
        <img key={index} src={img} alt={`Gallery image ${index + 1}`} className="w-full h-auto" />
      ))}
    </div>
  );

  if (isPreview) {
    return galleryContent;
  }

  return (
    <div className="flex flex-col items-stretch p-2 bg-white border rounded shadow w-full">
      {isEditing ? (
        <div>
          {images.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => {
                const newImages = [...images];
                newImages[index] = e.target.value;
                onEdit({ images: newImages });
              }}
              className="w-full mb-2"
            />
          ))}
          <button
            onClick={() => onEdit({ images: [...images, 'https://via.placeholder.com/150'] })}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add Image
          </button>
        </div>
      ) : (
        galleryContent
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
          <Layout size={20} />
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const FormElement = ({ id, fields, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formContent = (
    <form className="space-y-4">
      {fields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <label className="mb-1">{field.label}</label>
          <input type={field.type} className="border rounded px-2 py-1" placeholder={field.label} />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );

  if (isPreview) {
    return formContent;
  }

  return (
    <div className="flex flex-col items-stretch p-2 bg-white border rounded shadow w-full">
      {isEditing ? (
        <div>
          {fields.map((field, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={field.label}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].label = e.target.value;
                  onEdit({ fields: newFields });
                }}
                className="flex-grow"
                placeholder="Field Label"
              />
              <select
                value={field.type}
                onChange={(e) => {
                  const newFields = [...fields];
                  newFields[index].type = e.target.value;
                  onEdit({ fields: newFields });
                }}
                className="border rounded"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
              </select>
            </div>
          ))}
          <button
            onClick={() => onEdit({ fields: [...fields, { type: 'text', label: 'New Field' }] })}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Add Field
          </button>
        </div>
      ) : (
        formContent
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
          <FileText size={20} />
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export const VideoElement = ({ id, videoUrl, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);

  const videoContent = (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );

  if (isPreview) {
    return videoContent;
  }

  return (
    <div className="flex flex-col items-stretch p-2 bg-white border rounded shadow w-full">
      {isEditing ? (
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => onEdit({ videoUrl: e.target.value })}
          className="w-full mb-2"
          placeholder="Enter YouTube embed URL"
        />
      ) : (
        videoContent
      )}
      <div className="flex justify-end space-x-2 mt-2">
        <button onClick={() => setIsEditing(!isEditing)} className="text-blue-500 hover:text-blue-700">
          <Video size={20} />
        </button>
        <button onClick={onRemove} className="text-red-500 hover:text-red-700">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};