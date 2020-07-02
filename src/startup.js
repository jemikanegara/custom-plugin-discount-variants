import { decodeProductOpaqueId } from "./xforms/id.js";

/** 
* @summary Called on startup
* @param {Object} context Startup context
* @param {Object} context.collections Map of MongoDB collections
* @returns {undefined}
* The goal of this function is to decode variant ID after discount code created or updated
* so we dont need to modify the original discount-codes api plugin
*/
export default function startup(context) {
 const { appEvents, collections: { Discounts } } = context;

 const updateDecodedVariantIds = async ({_id, shopId, ...discountCode}) => {
    const products = discountCode.conditions.products
    if (!products) return

    // Decode variant IDs
    const decodedVariants = discountCode.conditions.products.map(variantId => decodeProductOpaqueId(variantId))
    discountCode.conditions.products = decodedVariants

    // Update variant IDs
    await Discounts.updateOne({
      _id,
      shopId
    }, {
      $set: {
        ...discountCode
      }
    });
 }

 appEvents.on("afterDiscountCodeCreate", async (payload) => await updateDecodedVariantIds(payload))
 appEvents.on("afterDiscountCodeUpdate", async (payload) => await updateDecodedVariantIds(payload))
}
