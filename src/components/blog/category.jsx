import { useEffect, useState } from "react";
import fetchCategory from "../../controllers/PostCategoryController";

export default function Category({handleOnChange}) {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategory(setCategories, setPagination, setLoading, setErrors, apiBase);
  }, []);

  return (
    <>
      <div className="select">
        <select onChange={handleOnChange} name="category">
          <option>Choose category</option>
          {categories.length === 0 ? (
            <option>No category found</option>
          ) : (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
}
