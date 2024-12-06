'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from 'lucide-react'

interface TipTapEditorProps {
  content?: string
  onChange: (content: string) => void
}

const MenuButton = ({ 
  onClick, 
  active = false,
  disabled = false,
  children,
  title
}: { 
  onClick: () => void
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      p-2 rounded-lg transition-colors
      ${active 
        ? 'bg-emerald-100 text-emerald-800' 
        : 'hover:bg-gray-100 text-gray-700'
      }
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {children}
  </button>
)

export default function TipTapEditor({ content = '', onChange }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-gray-50 p-2">
        <div className="flex flex-wrap gap-1">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
            title="Treknraksts (Ctrl+B)"
          >
            <Bold size={18} />
          </MenuButton>
          
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
            title="Slīpraksts (Ctrl+I)"
          >
            <Italic size={18} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            title="Virsraksts 1"
          >
            <Heading1 size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            title="Virsraksts 2"
          >
            <Heading2 size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            title="Virsraksts 3"
          >
            <Heading3 size={18} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            title="Saraksts"
          >
            <List size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            title="Numurēts saraksts"
          >
            <ListOrdered size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            title="Citāts"
          >
            <Quote size={18} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Atsaukt (Ctrl+Z)"
          >
            <Undo size={18} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Atcelt atsaukšanu (Ctrl+Shift+Z)"
          >
            <Redo size={18} />
          </MenuButton>
        </div>
      </div>

      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  )
}