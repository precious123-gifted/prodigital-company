import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `AccessoriesDisplaySection`.
 */
export type AccessoriesDisplaySectionProps =
  SliceComponentProps<Content.AccessoriesDisplaySectionSlice>;

/**
 * Component for "AccessoriesDisplaySection" Slices.
 */
const AccessoriesDisplaySection = ({
  slice,
}: AccessoriesDisplaySectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for accessories_display_section (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default AccessoriesDisplaySection;
