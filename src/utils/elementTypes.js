import { Type, Square, AlignLeft, Image, Layout, FileText, Video, Columns, Maximize } from 'lucide-react';
import { TitleElement, ParagraphElement, ButtonElement, ImageElement, ColumnElement, SpacerElement, GalleryElement, FormElement, VideoElement } from '../components/ElementComponents';

export const ElementTypes = {
  TITLE: 'title',
  BUTTON: 'button',
  PARAGRAPH: 'paragraph',
  IMAGE: 'image',
};

export const StructureElementTypes = {
  COLUMN: 'column',
  SPACER: 'spacer',
};

export const PremiumElementTypes = {
  GALLERY: 'gallery',
  FORM: 'form',
  VIDEO: 'video',
};

export const ElementIcons = {
  [ElementTypes.TITLE]: Type,
  [ElementTypes.BUTTON]: Square,
  [ElementTypes.PARAGRAPH]: AlignLeft,
  [ElementTypes.IMAGE]: Image,
  [StructureElementTypes.COLUMN]: Columns,
  [StructureElementTypes.SPACER]: Maximize,
  [PremiumElementTypes.GALLERY]: Layout,
  [PremiumElementTypes.FORM]: FileText,
  [PremiumElementTypes.VIDEO]: Video,
};

export const ElementComponents = {
  [ElementTypes.TITLE]: TitleElement,
  [ElementTypes.BUTTON]: ButtonElement,
  [ElementTypes.PARAGRAPH]: ParagraphElement,
  [ElementTypes.IMAGE]: ImageElement,
  [StructureElementTypes.COLUMN]: ColumnElement,
  [StructureElementTypes.SPACER]: SpacerElement,
  [PremiumElementTypes.GALLERY]: GalleryElement,
  [PremiumElementTypes.FORM]: FormElement,
  [PremiumElementTypes.VIDEO]: VideoElement,
};

export const createNewElement = (type) => {
  const baseElement = {
    id: `${type}-${Date.now()}`,
    type,
  };

  switch (type) {
    case ElementTypes.TITLE:
      return { ...baseElement, content: 'New Title', align: 'center' };
    case ElementTypes.BUTTON:
      return { ...baseElement, content: 'New Button', color: 'bg-blue-500', align: 'center' };
    case ElementTypes.PARAGRAPH:
      return { ...baseElement, content: 'New paragraph text goes here.', align: 'center' };
    case ElementTypes.IMAGE:
      return { ...baseElement, content: 'https://via.placeholder.com/150', alt: 'Placeholder image', align: 'center' };
    case StructureElementTypes.COLUMN:
      return { ...baseElement, columns: 2, columnContent: [[], []] };
    case StructureElementTypes.SPACER:
      return { ...baseElement, height: 50 };
      case PremiumElementTypes.GALLERY:
        return { ...baseElement, images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'] };
      case PremiumElementTypes.FORM:
        return { ...baseElement, fields: [{ type: 'text', label: 'Name' }, { type: 'email', label: 'Email' }] };
      case PremiumElementTypes.VIDEO:
        return { ...baseElement, videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' };
      default:
        return baseElement;
    }
  };