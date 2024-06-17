import {Schema,model,models} from "mongoose"



const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

})


const productSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  fullDescription: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productMainImage: {
    type: String,
    required: true,
  },
  productComplementaryImage1: {
    type: String,
    required: true,
  },
  productComplementaryImage2: {
    type: String,
  }, // Optional (adjusted from required)
  productComplementaryImage3: {
    type: String,
  }, // Optional (adjusted from required)
  altText: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: new Date(), // Set default value to current timestamp
  },
});

 




export const allProducts = models['allProducts'] || model('allProducts', productSchema, 'allProducts');
export const user = models['user'] || model('user', userSchema, 'user');





