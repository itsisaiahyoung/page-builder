import React from 'react';
import { X } from 'lucide-react';

const ExportModal = ({ elements, onClose }) => {
  const generateCode = () => {
    const generateElementCode = (element) => {
      switch(element.type) {
        case 'title':
          return `<h1 class="text-2xl font-bold mb-4 text-${element.align}">${element.content}</h1>`;
        case 'paragraph':
          return `<p class="mb-4 text-${element.align}">${element.content}</p>`;
        case 'button':
          return `<button class="px-4 py-2 ${element.color} text-white rounded mb-4">${element.content}</button>`;
        case 'image':
          return `<img src="${element.content}" alt="${element.alt || 'Image'}" class="mb-4 max-w-full h-auto">`;
        case 'column':
          return `
            <div class="flex mb-4">
              ${element.columnContent.map(column => `
                <div class="flex-1 px-2">
                  ${column.map(generateElementCode).join('\n')}
                </div>
              `).join('\n')}
            </div>
          `;
        case 'spacer':
          return `<div style="height: ${element.height}px;" class="mb-4"></div>`;
        case 'gallery':
          return `
            <div class="grid grid-cols-3 gap-2 mb-4">
              ${element.images.map(img => `<img src="${img}" alt="Gallery image" class="w-full h-auto">`).join('\n')}
            </div>
          `;
        case 'form':
          return `
            <form class="mb-4">
              ${element.fields.map(field => `
                <div class="mb-2">
                  <label class="block">${field.label}</label>
                  <input type="${field.type}" placeholder="${field.label}" class="w-full px-2 py-1 border rounded">
                </div>
              `).join('\n')}
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
          `;
        case 'video':
          return `
            <div class="aspect-w-16 aspect-h-9 mb-4">
              <iframe src="${element.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full"></iframe>
            </div>
          `;
        default:
          return '';
      }
    };

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="container mx-auto p-4">
        ${elements.map(generateElementCode).join('\n        ')}
    </div>
</body>
</html>
    `;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-3/4 h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Exported Code</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <pre className="bg-gray-100 p-4 rounded flex-grow overflow-auto">
          <code>{generateCode()}</code>
        </pre>
      </div>
    </div>
  );
};

export default ExportModal;