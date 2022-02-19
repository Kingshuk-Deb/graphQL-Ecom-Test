const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        productId: String,
        name: String,
        price: Int,
        success: Boolean
    }

    type Seller {
        sellerId: String,
        sellerName: String,
        products: [Product],
        success: Boolean
    }

    input sellerInput {
        sellerId: String,
        sellerName: String
    }

    input productInput {
        sellerId: String,
        productId: String,
        name: String,
        price: Int,
    }

    type Query {
        getSellerInfo(sellerId: String): Seller
        getProductToSeller(product: productInput): Product
    }

    type Mutation {
        createSeller(seller: sellerInput): Seller
        updateSeller(seller: sellerInput): Seller
        deleteSeller(sellerId: String): String
        addProductToSeller(product: productInput): Product
        updateProductToSeller(product: productInput): Product
        deleteProductToSeller(product: productInput): String
    }
`;

module.exports = typeDefs;