const Sellers = require('./models/seller');
const shortId = require('shortid');

const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World'
        },
        getSellerInfo: async (parent, args, context, info) => {
            const seller = await Sellers.findOne({ sellerId: args.sellerId }, { _id: 0, __v: 0 });
            return seller;
        }
    },
    Mutation: {
        createSeller: async (parent, args, context, info) => {
            const newSeller = new Sellers({ sellerName: args.seller.sellerName }); const result = await Sellers.create(newSeller);
            const returnObj = { sellerName: result.sellerName, sellerId: result.sellerId }
            return returnObj;
        },
        updateSeller: async (parent, args, context, info) => {
            const seller = await Sellers.findOne({ sellerId: args.seller.sellerId });
            const products = seller.products;
            const _id = seller._id.toString(); 
            const sellerUpdated = await Sellers.findByIdAndUpdate({ _id }, {
                $set: {
                    sellerId: args.seller.sellerId,
                    sellerName: args.seller.sellerName || seller.sellerName,
                    products: products
                }
            }, {
                new: true
            });
            const returnObj = {
                sellerId: sellerUpdated.sellerId,
                sellerName: sellerUpdated.sellerName,
                products: sellerUpdated.products
            };
            return returnObj;
        },
        deleteSeller: async(parent, args, context, info) => {
            await Sellers.deleteOne({ short: args.sellerId });
            return "Seller Deleted"
        },
        addProductToSeller: async (parent, args, context, info) => {
            const seller = await Sellers.findOne({ sellerId: args.product.sellerId }); const id = shortId.generate();
            let products = seller.products; products.push({
                productId: id,
                name: args.product.name,
                price: args.product.price,
            })
            const _id = seller._id.toString(); 
            await Sellers.findByIdAndUpdate({ _id }, {
                $set: {
                    sellerId: args.product.sellerId,
                    sellerName: seller.sellerName,
                    products: products
                }
            });
            const returnObj = {
                productId: id,
                name: args.product.name,
                price: args.product.price
            };
            return returnObj;
        },
        updateProductToSeller: async (parent, args, context, info) => {
            const seller = await Sellers.findOne({ sellerId: args.product.sellerId });
            let products = []; let productName; let productPrice;
            await Promise.all(
                seller.products.map(async (element, index) => {
                    if(element.productId === args.product.productId) {
                        productName = args.product.name || element.name;
                        productPrice = args.product.price || element.price
                        products.push({
                            productId : args.product.productId,
                            name : productName,
                            price: productPrice
                        })
                    } else {
                        products.push({
                            productId : element.productId,
                            name : element.name,
                            price: element.price
                        })
                    }
                })
            );
            const _id = seller._id.toString(); 
            await Sellers.findByIdAndUpdate({ _id }, {
                $set: {
                    sellerId: args.product.sellerId,
                    sellerName: seller.sellerName,
                    products: products
                }
            });
            const returnObj = {
                productId: args.product.productId,
                name: productName,
                price: productPrice
            };
            return returnObj;
        },
        deleteProductToSeller: async (parent, args, context, info) => {
            const seller = await Sellers.findOne({ sellerId: args.product.sellerId });
            let products = [];
            await Promise.all(
                seller.products.map(async (element, index) => {
                    if(element.productId !== args.product.productId) {
                        products.push({
                            productId : element.productId,
                            name : element.name,
                            price: element.price
                        })
                    }
                })
            );
            const _id = seller._id.toString(); 
            await Sellers.findByIdAndUpdate({ _id }, {
                $set: {
                    sellerId: args.product.sellerId,
                    sellerName: seller.sellerName,
                    products: products
                }
            });
            return "Product Deleted"
        },
    }
};

module.exports = resolvers;