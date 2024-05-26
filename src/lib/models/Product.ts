import {Schema,model,models} from "mongoose"



  const productSchema:Schema  = new Schema({
   
    product: {
      type: Object,
      required: true,
      properties: {
        hairimage: {
          type:Object , 
        },
        hairtitle: {
          type: String,
          required: true,
        },
        hairdescription: {
          type: String,
          required: true,
        },
        hairprize: {
          type: String, 
          required: true,
        },
      },
    },
  });



const Product = models['Product'] || model('Product', productSchema, 'Product');



export default Product