export default function General() {
  return (
    <>
      <form className="tf-section-2 form-add-product form-setting ">
        <div className="wg-box" style={{ boxShadow: "none" }}>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                Store name <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter store name"
                name="store_name"
                tabindex="0"
                value=""
                aria-required="true"
                autoComplete="off"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
            <fieldset className="name">
              <div className="body-title mb-10">
                Store email <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="Enter store name"
                name="store_email"
                tabindex="0"
                value=""
                aria-required="true"
                autoComplete="off"
              />
              <div className="text-tiny">
                Do not exceed 20 characters when entering the product name.
              </div>
            </fieldset>
          </div>
          <div className="gap22 cols">
            <fieldset className="category">
              <div className="body-title mb-10">
                Timezone <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select class="">
                  <option>Choose timezone</option>
                  <option>UTC</option>
                  <option>UTC +0</option>
                  <option>UTC +1</option>
                  <option>UTC +2</option>
                  <option>UTC +3</option>
                  <option>UTC +4</option>
                  <option>UTC +5</option>
                  <option>UTC +6</option>
                  <option>UTC +7</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="male">
              <div className="body-title mb-10">
                Language <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select className="">
                  <option>Choose language</option>
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                  <option>Arabic</option>
                </select>
              </div>
            </fieldset>
            <fieldset className="brand">
              <div className="body-title mb-10">
                Currency <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select className="">
                  <option>Choose currency</option>
                  <option>Shop</option>
                  <option>Product</option>
                </select>
              </div>
            </fieldset>
          </div>
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
          <fieldset>
            <div class="flex gap24 mobile-wrap">
              <div class="flex gap24 w-half">
                <fieldset class="title mb-24">
                  <div class="body-title mb-10">Avatar</div>
                  <div class="upload-image style-2">
                    <div class="item up-load">
                      <label class="uploadfile" for="myFile">
                        <span class="icon">
                          <i class="icon-upload-cloud"></i>
                        </span>
                        <span class="text-tiny">
                          Drop your images here or select{" "}
                          <span class="tf-color">click to browse</span>
                        </span>
                        <input type="file" id="myFile" name="filename" />
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="title mb-24">
                  <div class="body-title mb-10">Favicon</div>
                  <div class="upload-image style-2">
                    <div class="item up-load">
                      <label class="uploadfile" for="myFile1">
                        <span class="icon">
                          <i class="icon-upload-cloud"></i>
                        </span>
                        <span class="text-tiny">
                          Drop your images here or select{" "}
                          <span class="tf-color">click to browse</span>
                        </span>
                        <input type="file" id="myFile1" name="filename" />
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
              <fieldset class="title mb-24 w-half">
                <div class="body-title mb-10">Cover (1920x1080)</div>
                <div class="upload-image style-2">
                  <div class="item up-load">
                    <label class="uploadfile" for="myFile2">
                      <span class="icon">
                        <i class="icon-upload-cloud"></i>
                      </span>
                      <span class="text-tiny">
                        Drop your images here or select{" "}
                        <span class="tf-color">click to browse</span>
                      </span>
                      <input type="file" id="myFile2" name="filename" />
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </fieldset>
          <div className="cols gap10">
            <button className="tf-button w-full" type="submit">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
