export default function Tags({ formData, setFormData, errors }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = formData.tagInput.trim();

      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
          // don’t reset tagInput, keep it for continuous typing
        }));
      }
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <fieldset className="tags">
      <div className="body-title mb-10">Tags</div>

      <div className="flex flex-wrap gap-2 mb-2">
        {formData.tags.map((tag, index) => (
          <p
            key={index}
            className="px-2 py-1 bg-gray-200 rounded flex items-center text-sm"
          >
            {tag}
            <a
              style={{ marginLeft: "5px" }}
              href="#"
              className="ml-2 text-xs text-danger text-gray-500 hover:text-red-500"
              onClick={() => removeTag(tag)}
            >
              ×
            </a>
          </p>
        ))}
      </div>

      <input
        type="text"
        placeholder="Type a tag and press Enter"
        className="mb-10"
        value={formData.tagInput}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            tagInput: e.target.value,
          }))
        }
        onKeyDown={onKeyDown}
      />
      <div className="text-xs text-gray-500 mt-1">
        Press Enter or comma to add tags.
      </div>
      {errors.tags && (
        <div className="text-danger text-xs text-gray-500 mt-1">
          {errors.tags[0]}
        </div>
      )}
    </fieldset>
  );
}
