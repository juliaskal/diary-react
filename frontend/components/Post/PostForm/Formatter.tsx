'use client';

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Editor from '@/components/Post/PostForm/Editor';
import type { DeltaStatic } from 'quill';
import type Quill from 'quill';

interface FormatterProps {
  onChange?: (value: DeltaStatic) => void;
}

export default forwardRef(function Formatter(
  { onChange }: FormatterProps,
  ref: React.Ref<{ getContent: () => DeltaStatic | null }>
) {
  const [readOnly] = useState(false);
  const [defaultValue, setDefaultValue] = useState<DeltaStatic | null>(null);
  const [content, setContent] = useState<DeltaStatic | null>(null);

  const quillRef = useRef<Quill | null>(null);

  useImperativeHandle(ref, () => ({
    getContent: () => content,
  }));

  useEffect(() => {
    (async () => {
      const Quill = (await import('quill')).default;
      const Delta = Quill.import('delta');
      setDefaultValue(new Delta().insert(''));
    })();
  }, []);

  if (!defaultValue) return null;

  const handleTextChange = (_delta: any, _oldDelta: any, source: string) => {
    if (source !== 'user') return;

    const delta = quillRef.current?.getContents();
    if (!delta) return;

    setContent(delta);
    onChange?.(delta);
  };

  return (
    <div className="w-3xl">
      <Editor
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={defaultValue}
        onTextChange={handleTextChange}
      />
    </div>
  );
});
