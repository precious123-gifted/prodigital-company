"use client"

import { createContext, useContext, useState,ReactNode, ReactHTMLElement, useRef } from 'react';



interface GroupProps {
    onClick?: React.MouseEventHandler<HTMLDivElement>; 
    
    scale?: number; 
    position?: number[]; 
    
  }

interface Refs {
  hairProductRef: React.RefObject<HTMLDivElement> | null; 
  menuSlideBackgroundRef:  React.RefObject<HTMLDivElement> | null;

}


interface Item {
  id: string;
  product: any; 
}


interface Product {
  _id: string;
  product: {
    hairimage: PrismicNextImage; // Assuming PrismicNextImage matches your image data structure
    hairtitle: string;
    hairdescription: string;
    hairprize: number; // Assuming price is a number
  };
}

interface PrismicNextImage {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string;
  copyright: null | string; // nullable copyright property
  url: string;
  id: string;
  edit: {
    x: number;
    y: number;
    zoom: number;
    background: string;
  };
}



type CartedProducts = Product[];

export type StateContextType = {
  items: Item[];
  setItems: (items: Item[]) => void;
  menu: boolean;
  setMenu: (state: boolean) => void;
  cartedProducts: Product[];
  setCartedProducts: (products: Product[], prevCartedProducts: Product[]) => void;
  cartedProductsFromState: CartedProducts;
  setCartedProductsFromState: (products: CartedProducts) => void;
  cartLength: number | null ;
  setCartLength: (newLength: number) => void;
};



const RefsContext = createContext<Refs>({
    hairProductRef: null,
    menuSlideBackgroundRef: null
   
   
  });
const StateContext = createContext<StateContextType | undefined>(undefined);







export const RefsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        
    const hairProductRef = useRef(null);
    const menuSlideBackgroundRef = useRef(null)
  
  
  
    const value = {
     
        hairProductRef,
        menuSlideBackgroundRef
      
    };
  
    return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
  };

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [cartLength, setCartLength] = useState<number | null>(null);
  const [cartedProductsFromState, setCartedProductsFromState] = useState<Product[]>([]);
  const [cartedProducts, setCartedProducts] = useState<Product[]>([]);


const[menu,setMenu] = useState(true)
  
  return <StateContext.Provider value={{ menu, setMenu ,items,setItems,cartedProducts, setCartedProducts,cartedProductsFromState, setCartedProductsFromState,cartLength, setCartLength}}>{children}</StateContext.Provider>;
};




export const useRefsContext = (): Refs  => {
  const refsContext = useContext(RefsContext) as Refs;
 

  if (!refsContext) {
    throw new Error('Color context is not provided');
  }
  return refsContext;


};

export const useStateContext = (): StateContextType  => {
  const stateContext = useContext(StateContext) as StateContextType;
 

  if (!stateContext) {
    throw new Error('State context is not provided');
  }
  return stateContext;


};

export const useDataCarrier = (initialData = []) => {
  const [data, setData] = useState(initialData);

  const updateData = (newData:any) => {
    setData(newData);
  };

  return { data, updateData };
};



