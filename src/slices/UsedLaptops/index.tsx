import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `UsedLaptops`.
 */
export type UsedLaptopsProps = SliceComponentProps<Content.UsedLaptopsSlice>;

/**
 * Component for "UsedLaptops" Slices.
 */
const UsedLaptops = ({ slice }: UsedLaptopsProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for used_laptops (variation: {slice.variation})
      Slices
    </section>
  );
};

export default UsedLaptops;
