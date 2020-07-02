import pkg from "../package.json";
import getVariantSpecificDiscount from './util/getVariantSpecificDiscount.js'
import startup from './startup.js'

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {ReactionAPI} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: "Custom Plugin Discount Variants",
    name: "discount-variants",
    version: pkg.version,
    functionsByType: {
      "discounts/rates/sale": [getVariantSpecificDiscount],
      "startup": [startup]
    },
  });
}
