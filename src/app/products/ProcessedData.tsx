
import ProductsPageContent from "./ProductsPageContent";
import dbConnect from "@/lib/dbConnect";




export default async function ProductsData({settings}: any) {




  const newLaptopsProcessedData = settings.data.newlaptops.map((item :any ) => {
    return {
      product: item,  
    };
  });

  const usedLaptopsProcessedData = settings.data.usedlaptops.map((item :any ) => {
    return {
      product: item,  
    };
  });

  const accessoriesProcessedData = settings.data.accessories.map((item :any ) => {
    return {
      product: item,  
    };
  });

  const isDevelopment = process.env.NODE_ENV === 'development' ;
  const baseUrl = isDevelopment
    ? `http://localhost:${process.env.PORT}`
    : "https://prodigital-company-precious123gifteds-projects.vercel.app/";
  const newLaptopUrl = `${baseUrl}/api/newLaptopsProcessedData`;
  const usedLaptopUrl = `${baseUrl}/api/usedLaptopsProcessedData`;
  const accessoriesUrl = `${baseUrl}/api/accessoriesProcessedData`;
  const allProductsUrl = `${baseUrl}/api/allProductsProcessedData`;




  const sendNewlaptopsData = async () => {
console.log(`this is the processed data ${newLaptopsProcessedData}`)

    try {
      await dbConnect()
      const response = await fetch(newLaptopUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLaptopsProcessedData),
      });
  

      // Handle successful response (optional):
      if (response.ok) {
        // Process successful response data here
        const data = await response.json();
        console.log('Data sent successfully:', data);
        // Perform actions based on successful response
      } else {
        // Handle non-2xx HTTP status codes (e.g., 400, 500)
        console.error('Server responded with error:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors, parsing errors, or other exceptions
      console.error('Error sending data:', error);
      // Optionally, log more detailed error information (e.g., using a logging library)
    } finally {
      // Optional cleanup logic that executes regardless of success or failure
      // (e.g., closing connections, releasing resources)
    }
  };
  
  const sendUsedlaptopsData = async () => {
    console.log(`this is the processed data ${usedLaptopsProcessedData}`)
    
        try {
      await dbConnect()

          const response = await fetch(usedLaptopUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usedLaptopsProcessedData),
          });
      
    
          // Handle successful response (optional):
          if (response.ok) {
            // Process successful response data here
            const data = await response.json();
            console.log('Data sent successfully:', data);
            // Perform actions based on successful response
          } else {
            // Handle non-2xx HTTP status codes (e.g., 400, 500)
            console.error('Server responded with error:', response.status, response.statusText);
          }
        } catch (error) {
          // Handle network errors, parsing errors, or other exceptions
          console.error('Error sending data:', error);
          // Optionally, log more detailed error information (e.g., using a logging library)
        } finally {
          // Optional cleanup logic that executes regardless of success or failure
          // (e.g., closing connections, releasing resources)
        }
      };

      const sendAccessoriesData = async () => {
        console.log(`this is the processed data ${accessoriesProcessedData}`)
        
            try {
      await dbConnect()

              const response = await fetch(accessoriesUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(accessoriesProcessedData),
              });
          
        
              // Handle successful response (optional):
              if (response.ok) {
                // Process successful response data here
                const data = await response.json();
                console.log('Data sent successfully:', data);
                // Perform actions based on successful response
              } else {
                // Handle non-2xx HTTP status codes (e.g., 400, 500)
                console.error('Server responded with error:', response.status, response.statusText);
              }
            } catch (error) {
              // Handle network errors, parsing errors, or other exceptions
              console.error('Error sending data:', error);
              // Optionally, log more detailed error information (e.g., using a logging library)
            } finally {
              // Optional cleanup logic that executes regardless of success or failure
              // (e.g., closing connections, releasing resources)
            }
          };
  sendNewlaptopsData();
  sendUsedlaptopsData();
  sendAccessoriesData();




    
  const getAllProductsData = async () =>{
    await dbConnect()
    const response = await fetch(allProductsUrl);
  
    if (!response.ok) {
        console.error('Error fetching data:', response.statusText);
      
      } else {
        console.log('Data successfully recieved in frontend!');
      }
  
      return response.json()
  
  }
  
  if(!baseUrl)return null
  
  const allProducts = await getAllProductsData()






  return (
      
   <ProductsPageContent allProducts={allProducts}/>
      
  )
}
