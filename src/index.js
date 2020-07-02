import pkg from "../package.json";
import getVariantSpecificDiscount from './util/getVariantSpecificDiscount.js'
import schemas from './schemas/index.js'
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
    graphQL: {
      schemas
    },
    functionsByType: {
      "discounts/codes/variant": [getVariantSpecificDiscount]
    },
    "startup": [startup]
  });
}
