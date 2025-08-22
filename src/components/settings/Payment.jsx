export default function Payment() {
  return (
    <>
      <form className="tf-section-2 form-add-product form-setting ">
        <div className="w-box">
          {/* <div className="gap22 cols"> */}
            <div class="flex gap10">
              <input class="" type="checkbox" />
              <div class="body-text">
                Enable to send error reporting via email?
              </div>
            </div>
            <fieldset className="category">
              <div className="body-title mb-10 mt-3">
                Payment Gateway <span className="tf-color-1">*</span>
              </div>
              <div className="select">
                <select class="">
                  <option>Choose payment gateway</option>
                  <option>Paypal</option>
                  <option>Stripe</option>
                  <option>Payment on delivery</option>
                  <option>Check</option>
                  <option>Bank Transfer</option>
                  <option>Mobile Money</option>
                </select>
              </div>
            </fieldset>
          {/* </div> */}
        </div>

        <div className="wg-box" style={{ boxShadow: 'none' }}>
          <div className="gap22 cols">
            <fieldset className="name">
              <div className="body-title mb-10">
                API Keys <span className="tf-color-1">*</span>
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
                Transaction Fee(%) <span className="tf-color-1">*</span>
              </div>
              <input
                className="mb-10"
                type="text"
                placeholder="2%"
                name="transaction_fee"
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
                Payment Instructions <span className="tf-color-1">*</span>
              </div>
              <textarea
                className="mb-10"
                type="text"
                placeholder="Enter payment instructions"
                name="payment_instructions"
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
