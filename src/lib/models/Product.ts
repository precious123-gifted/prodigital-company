import {Schema,model,models} from "mongoose"





const imageSchema = new Schema({
  image: {
    type: Buffer,
    required: true,
  },
 
})

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
  imageID: {
    type: String,
    required: true,
  },
image1ID: {
  type: String,
  required: true,
},
image2ID: {
  type: String,
  required: true,
},
image3ID: {
  type: String,
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
  },  
  productComplementaryImage3: {
    type: String,
  }, 
  altText: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: new Date(), 
  },
});

 




export const allProducts = models['allProducts'] || model('allProducts', productSchema, 'allProducts');
export const user = models['user'] || model('user', userSchema, 'user');
export const image = models['image'] || model('image', imageSchema, 'image');






