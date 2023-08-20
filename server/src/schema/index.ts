import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_PRODUCTS, GET_PRODUCT_BY_ID } from './queries/Products'
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from './mutations/Products'
import { ADD_USER, LOGIN_USER } from "./mutations/User";
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from "./mutations/CartItems";
import { VIEW_CART } from "./queries/Cart";
import { CANCEL_ORDER, CREATE_ORDER } from "./mutations/OrderItems";
import { VIEW_ALL_ORDERS, VIEW_ORDER_DETAILS } from "./queries/Orders";
import { GET_USER_BY_ID } from "./queries/User";


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAllProducts: GET_ALL_PRODUCTS,
        getProductById : GET_PRODUCT_BY_ID,
        getUserById : GET_USER_BY_ID,
        viewCart : VIEW_CART,
        viewOrders : VIEW_ALL_ORDERS,
        viewOrderDetails : VIEW_ORDER_DETAILS,
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct : ADD_PRODUCT,
        deleteProduct : DELETE_PRODUCT,
        updateProduct : UPDATE_PRODUCT,
        addUser : ADD_USER,
        loginUser : LOGIN_USER,
        addItemToCart : ADD_ITEM_TO_CART,
        removeItemFromCart : REMOVE_ITEM_FROM_CART,
        createOrder : CREATE_ORDER,
        cancelOrder : CANCEL_ORDER,
    }
})


export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})