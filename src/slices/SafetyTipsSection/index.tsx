import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SafetyTipsSection`.
 */
export type SafetyTipsSectionProps =
  SliceComponentProps<Content.SafetyTipsSectionSlice>;

/**
 * Component for "SafetyTipsSection" Slices.
 */
const SafetyTipsSection = ({ slice }: SafetyTipsSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for safety_tips_section (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default SafetyTipsSection;
