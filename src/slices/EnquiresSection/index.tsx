import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `EnquiresSection`.
 */
export type EnquiresSectionProps =
  SliceComponentProps<Content.EnquiresSectionSlice>;

/**
 * Component for "EnquiresSection" Slices.
 */
const EnquiresSection = ({ slice }: EnquiresSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for enquires_section (variation: {slice.variation})
      Slices
    </section>
  );
};

export default EnquiresSection;
