export const endPoints = {
    AUTH: {
      LOGIN: "/login",
      REGISTER: "/register",
      REFRESH_TOKEN: "/refresh-token",
      LOGOUT:"/logout"
    },
    PRODUCTS:{
      GET_PRODUCTS:"/users/getProducts",
      ADD_PRODUCTS:"/admin/addproduct",
      DELETE_PRODUCT:(productId)=>`/admin/deleteproduct/${productId}`,
      EDIT_PRODUCT:"/admin/updateproduct"
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
    },
    ORDER:{
      CREATE_ORDER:"/users/addOrder",
      VERIFY_PAYMENT:"/users/verifypayment",
      SHOW_ORDER:"/users/showOrder"
    },
    USER:{
      GET_ALL_USER:"/admin/getusers",
      GET_SINGLE_USER:(id)=>`/admin/getusers/${id}`,
      BLOCK_USER:(id)=>`/admin/blockUser/${id}`,
      GET_SINGLE_USER_ORDER:(id)=>`/admin/getUserOrder/${id}`
    },
    ADMIN:{
      SALE_PRICE:"/admin/totalRevenue"
    }
}