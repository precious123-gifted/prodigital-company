import {Schema,model,models} from "mongoose"



  const productSchema:Schema  = new Schema({
   
    product: {
      type: Object,
      required: true,
      properties: {
      brandname: {
          type: String , 
          required: true,

        },
        title: {
          type: String,
          required: true,
        },
        shortdescription: {
          type: String,
          required: true,
        },
        fulldescription: {
          type: String,
          required: true,
        },
        price: {
          type: Number, 
          required: true,
        },

        mainimage: {
         type: Object,
         required: true
        },
        complimentaryimage1: {
          type: Object,
          required: true
         },
         complimentaryimage2: {
          type: Object,
          required: true
         },
         complimentaryimage3: {
          type: Object,
          required: true
         },
         },
         },
      
    
  });

 


export const usedLaptops = models['usedlaptops'] || model('usedlaptops', productSchema, 'usedlaptops');
export const newLaptops = models['newlaptops'] || model('newlaptops', productSchema, 'newlaptops');
export const accessories = models['accessories'] || model('accessories', productSchema, 'accessories');
export const allProducts = models['allProducts'] || model('allProducts', productSchema, 'allProducts');





