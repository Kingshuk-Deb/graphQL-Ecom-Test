const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Product {
        productId: String,
        name: String,
        price: Int,
    }

    type Seller {
        sellerId: String,
        sellerName: String,
        products: [Product]
    }

    type Query {
        hello: String
        getSellerInfo(sellerId: String): Seller
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