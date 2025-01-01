export const endPoints = {
    AUTH: {
      LOGIN: "/login",
      REGISTER: "/register",
      REFRESH_TOKEN: "/refresh-token",
    },
    PRODUCTS:{
      GET_PRODUCTS:"/users/getProducts"
    },
    CART:{
      ADD_TO_CART:(productId)=>`/users/addToCart/${productId}`,
      GET_CART:"/users/getCart",
      REMOVE_CART:(productId)=>`/users/deleteCart/${productId}`,
      UPDATE_QUANTITY:"/users/updateQuantity"
    },
    FAVORITE:{
      GET_FAVORITE:"/users/getWishlist",
      ADD_FAVORITE:(productId)=>`/users/addWishlist/${productId}`
    }
}