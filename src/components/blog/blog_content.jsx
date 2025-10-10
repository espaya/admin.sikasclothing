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

export default function BlogContent({formData, setFormData, errors}) {
  return (
    <>
      <fieldset className="content">
        <div className="body-title mb-10">
          Content <span className="tf-color-1">*</span>
        </div>

        <MDXEditor
          markdown={formData.content}
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

                  {/* ✅ Adds link insert tool */}
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
    </>
  );
}
