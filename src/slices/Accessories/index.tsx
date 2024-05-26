import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Accessories`.
 */
export type AccessoriesProps = SliceComponentProps<Content.AccessoriesSlice>;

/**
 * Component for "Accessories" Slices.
 */
const Accessories = ({ slice }: AccessoriesProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for accessories (variation: {slice.variation})
      Slices
    </section>
  );
};

export default Accessories;
