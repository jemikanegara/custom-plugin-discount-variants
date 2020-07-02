import decodeOpaqueIdForNamespace from "@reactioncommerce/api-utils/decodeOpaqueIdForNamespace.js";

const namespaces = {
  Product: "reaction/product"
};

export const decodeProductOpaqueId = decodeOpaqueIdForNamespace(namespaces.Product);
