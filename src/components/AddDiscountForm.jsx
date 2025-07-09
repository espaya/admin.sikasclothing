export default function AddDiscountForm() {
  return (
    <>
      <form className="tf-section-2 form-add-product">
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Title <span className="tf-color-1">*</span>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter discount title"
              name="title"
              tabIndex={0}
              aria-required="true"
            />
            <div className="text-tiny">
              Do not exceed 20 characters when entering the product name.
            </div>
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Type <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select name="type" className="">
                  <option value="">Choose type</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Fixed">Fixed</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Amount <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter discount amount"
                name="amount"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
          </div>

          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Minimum order value <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter discount title"
                name="minimum_order_value"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Maximum discount <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter discount title"
                name="maximum_discount"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
          </div>
        </div>
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Discount Code <span className="tf-color-1">*</span>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter discount title"
              name="discount_code"
              tabIndex={0}
              aria-required="true"
            />
            <div className="text-tiny">
              Do not exceed 20 characters when entering the product name.
            </div>
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Starts at <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="date"
                name="starts_at"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Ends at <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="date"
                name="ends_at"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
          </div>
          <div className="gap22 cols">
            <fieldset className="male">
              <div className="body-title mb-10">
                Status <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select name="status" className="">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Other</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="name">
              <div className="body-title mb-10">
                Usage Limit <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="date"
                name="usage_limit"
                tabIndex={0}
                aria-required="true"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
          </div>
          <div className="cols gap10">
            <button className="tf-button w-full" type="submit">
              Add Discount
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
