import {
  MDXEditor,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  markdownShortcutPlugin,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CodeToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { useEffect, useRef } from "react";

export default function BlogContent({ formData, setFormData, errors }) {
  const editorRef = useRef(null);

  // 🔥 Load content when editing
  useEffect(() => {
    if (editorRef.current && formData.content) {
      editorRef.current.setMarkdown(formData.content);
    }
  }, [formData.content]);

  return (
    <fieldset className="content">
      <div className="body-title mb-10">
        Content <span className="tf-color-1">*</span>
      </div>

      <MDXEditor
        ref={editorRef}
        markdown=""
        onChange={(value) =>
          setFormData((prev) => ({
            ...prev,
            content: value,
          }))
        }
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          linkPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <>
                <BlockTypeSelect />
                <BoldItalicUnderlineToggles />
                <ListsToggle />
                <CodeToggle />
              </>
            ),
          }),
        ]}
        contentEditableClassName="prose max-w-none p-2 border rounded min-h-[300px]"
      />

      {errors.content && (
        <div className="text-tiny text-danger">{errors.content[0]}</div>
      )}
    </fieldset>
  );
}
