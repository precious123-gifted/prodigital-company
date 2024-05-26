import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Products`.
 */
export type ProductsProps = SliceComponentProps<Content.ProductsSlice>;

/**
 * Component for "Products" Slices.
 */
const Products = ({ slice }: ProductsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for products (variation: {slice.variation}) Slices
    </section>
  );
};

export default Products;
