'use client';

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Editor from './Editor';
import type Quill from 'quill';

interface FormatterProps {
  onChange?: (value: string) => void; // внешний callback
}

export default forwardRef(function Formatter(
  { onChange }: FormatterProps,
  ref: React.Ref<{ getContent: () => string }>
) {
  const [readOnly, setReadOnly] = useState(false);
  const [defaultValue, setDefaultValue] = useState<any>(null);

  const quillRef = useRef<Quill | null>(null);

  const [content, setContent] = useState<string>(""); // хранит текст

  useImperativeHandle(ref, () => ({
    getContent: () => content, // внешний метод для получения текста
  }));

  // Delta загружаем ТОЛЬКО на клиенте
  useEffect(() => {
    (async () => {
      const Quill = (await import('quill')).default;
      const Delta = Quill.import('delta');

      setDefaultValue(new Delta().insert('Enter text...'));
    })();
  }, []);

  if (!defaultValue) return null;

  const handleTextChange = (_delta: any, _oldDelta: any, source: string) => {
    const text = quillRef.current?.getText() ?? "";
    setContent(text);
    onChange?.(text); // отдаём наружу через проп
  };

  return (
    <div className='w-3xl'>
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onTextChange={handleTextChange}
      />
    </div>
  );
});
