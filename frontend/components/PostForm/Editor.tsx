'use client';

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import type QuillType from 'quill';

type Props = {
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
};

const Editor = forwardRef<QuillType | null, Props>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<QuillType | null>(null);

    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (!containerRef.current) return;

      let isMounted = true;

      (async () => {
        const Quill = (await import('quill')).default;

        if (!isMounted) return;

        const editorContainer = document.createElement('div');
        containerRef.current!.appendChild(editorContainer);

        const quill = new Quill(editorContainer, {
          theme: 'snow',
        });

        quillRef.current = quill;
        if (typeof ref === 'function') ref(quill);
        else if (ref) ref.current = quill;

        if (defaultValue) {
          quill.setContents(defaultValue);
        }

        quill.on('text-change', (...args) => {
          onTextChangeRef.current?.(...args);
        });

        quill.on('selection-change', (...args) => {
          onSelectionChangeRef.current?.(...args);
        });
      })();

      return () => {
        isMounted = false;
        if (typeof ref !== 'function' && ref) {
          ref.current = null;
        }
        quillRef.current = null;
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }, []);

    useEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!readOnly);
      }
    }, [readOnly]);

    return <div ref={containerRef} />;
  },
);

Editor.displayName = 'Editor';

export default Editor;
