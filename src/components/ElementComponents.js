import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { X, Plus, Minus, Edit2, Image as ImageIcon, Columns, AlignLeft, AlignCenter, AlignRight, Maximize, Layout, FileText, Video } from 'lucide-react';
import DraggableElement from './DraggableElement';
import { ModernTitle, ModernParagraph, ModernButton, ModernImage } from './PreStyledComponents';

const commonWrapperClasses = "w-full p-2 bg-white border rounded shadow mb-4";
const buttonClasses = "p-1 rounded transition-colors duration-200";

export const TitleElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || 'Sample Title');

  const titleContent = <ModernTitle content={text} align={align} />;

  if (isPreview) {
    return titleContent;
  }

  return (
    <div className={`${commonWrapperClasses} relative`}>
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
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${buttonClasses} text-blue-500 hover:text-blue-700 hover:bg-blue-100`}
        >
          <Edit2 size={24} />
        </button>
        <button
          onClick={onRemove}
          className={`${buttonClasses} text-red-500 hover:text-red-700 hover:bg-red-100`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export const ImageElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [src, setSrc] = useState(content || 'https://via.placeholder.com/400x300');

  const imageContent = <ModernImage content={src} align={align} />;

  if (isPreview) {
    return imageContent;
  }

  return (
    <div className={`${commonWrapperClasses} relative`}>
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
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${buttonClasses} text-blue-500 hover:text-blue-700 hover:bg-blue-100`}
        >
          <ImageIcon size={24} />
        </button>
        <button
          onClick={onRemove}
          className={`${buttonClasses} text-red-500 hover:text-red-700 hover:bg-red-100`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export const ParagraphElement = ({ id, content, align, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || 'Sample paragraph text goes here.');

  const paragraphContent = <ModernParagraph content={text} align={align} />;

  if (isPreview) {
    return paragraphContent;
  }

  return (
    <div className={`${commonWrapperClasses} relative`}>
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit({ content: text });
          }}
          className="w-full border rounded px-2 py-1 mb-2"
          rows={4}
          autoFocus
        />
      ) : (
        paragraphContent
      )}
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`${buttonClasses} text-blue-500 hover:text-blue-700 hover:bg-blue-100`}
        >
          <Edit2 size={24} />
        </button>
        <button
          onClick={onRemove}
          className={`${buttonClasses} text-red-500 hover:text-red-700 hover:bg-red-100`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export const ButtonElement = ({ id, content, color, align, onRemove, onEdit, isPreview }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(content || 'Sample Button');
  const [buttonColor, setButtonColor] = useState(color || 'bg-indigo-600');

  const colorOptions = [
    'bg-indigo-600', 'bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-600', 'bg-purple-600'
  ];

  const buttonContent = <ModernButton content={text} color={buttonColor} align={align} />;

  if (isPreview) {
    return buttonContent;
  }

  return (
    <div className={`${commonWrapperClasses} relative`}>
      {isEditing ? (
        <div className="flex flex-col space-y-2 w-full mb-2">
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
        buttonContent
      )}
      <div className="absolute top-2 right-2 flex space-x-1">
        <button
          onClick={() => {
            if (isEditing) {
              onEdit({ content: text, color: buttonColor });
            }
            setIsEditing(!isEditing);
          }}
          className={`${buttonClasses} text-blue-500 hover:text-blue-700 hover:bg-blue-100`}
        >
          <Edit2 size={24} />
        </button>
        <button
          onClick={onRemove}
          className={`${buttonClasses} text-red-500 hover:text-red-700 hover:bg-red-100`}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};

export const ColumnElement = ({ id, columns, columnContent, onRemove, onEdit, isPreview }) => {
  console.log(`Rendering ColumnElement: id=${id}, columns=${columns}, isPreview=${isPreview}`);
  console.log('Column content:', columnContent);

  const handleAddColumn = () => {
    onEdit(id, { columns: Math.min(4, columns + 1) });
  };

  const handleRemoveColumn = () => {
    if (columns > 1) {
      onEdit(id, { columns: columns - 1 });
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4'
  };

  return (
    <div className={`w-full p-2 ${isPreview ? '' : 'bg-white border rounded shadow'}`}>
      {!isPreview && (
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <Columns size={20} className="mr-2" />
            <span>Columns: {columns}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRemoveColumn}
              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors duration-200"
              disabled={columns === 1}
            >
              <Minus size={24} />
            </button>
            <button
              onClick={handleAddColumn}
              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded transition-colors duration-200"
              disabled={columns === 4}
            >
              <Plus size={24} />
            </button>
            <button
              onClick={() => onRemove(id)}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
      <div className={`grid ${gridCols[columns]} gap-2 ${isPreview ? '' : 'border-2 border-dashed border-gray-300 p-2'}`}>
        {Array.from({ length: columns }).map((_, index) => (
          <Droppable key={`${id}-column-${index}`} droppableId={`column-${id}-${index}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`
                  min-h-[100px] transition-all duration-200 ease-in-out
                  ${isPreview ? '' : 'border border-gray-200 rounded p-2'}
                  ${!isPreview && snapshot.isDraggingOver ? 'bg-blue-50 shadow-md' : 'bg-white hover:bg-gray-50'}
                `}
              >
                {!isPreview && (
                  <p className="text-center text-gray-500 mb-2 text-sm">Column {index + 1}</p>
                )}
                <div className="space-y-2">
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
                </div>
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
  const [url, setUrl] = useState(videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ');

  const videoContent = (
    <div className="w-full" style={{ maxHeight: '400px' }}> {/* Limit max height */}
      <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' }}> {/* 16:9 Aspect Ratio */}
        <iframe
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onEdit({ videoUrl: url });
          }}
          className="w-full border rounded px-2 py-1 mb-2"
          placeholder="Enter YouTube embed URL"
          autoFocus
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