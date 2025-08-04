export default function MenuForms() {
  return (
    <>
      <form className="tf-section-2 form-add-product">
        <div className="wg-box">
          <fieldset className="name">
            <div className="body-title mb-10">
              Product name <span className="tf-color-1">*</span>
            </div>
            <input
              className="mb-10"
              type="text"
              placeholder="Enter product name"
              name="text"
              tabindex="0"
              value=""
              aria-required="true"
              required=""
            />
            <div className="text-tiny">
              Do not exceed 20 characters when entering the product name.
            </div>
          </fieldset>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Category <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select className="">
                  <option>Choose category</option>
                  <option>Shop</option>
                  <option>Product</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="male">
              <div className="body-title mb-10">
                Gender <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select className="">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </fieldset>
          </div>
          <fieldset className="brand">
            <div className="body-title mb-10">
              Brand <span className="tf-color-1">*</span>
            </div>
            <div className="select">
              <select className="">
                <option>Choose category</option>
                <option>Shop</option>
                <option>Product</option>
              </select>
            </div>
          </fieldset>
          <fieldset className="description">
            <div className="body-title mb-10">
              Description <span className="tf-color-1">*</span>
            </div>
            <textarea
              className="mb-10"
              name="description"
              placeholder="Description"
              tabindex="0"
              aria-required="true"
              required=""
            ></textarea>
            <div className="text-tiny">
              Do not exceed 100 characters when entering the product name.
            </div>
          </fieldset>
        </div>
        <div className="wg-box">
          <div className="cols gap22">
            <fieldset className="name">
              <div className="body-title mb-10">Add size</div>
              <div className="select mb-10">
                <select className="">
                  <option>EU - 44</option>
                  <option>EU - 40</option>
                  <option>EU - 50</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">Product date</div>
              <div className="select">
                <input type="date" name="date" value="2023-11-20" />
              </div>
            </fieldset>
          </div>
          <div className="cols gap10">
            <button className="tf-button w-full" type="submit">
              Add menu
            </button>
            <button
              className="tf-button style-1 w-full"
              type="submit"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
