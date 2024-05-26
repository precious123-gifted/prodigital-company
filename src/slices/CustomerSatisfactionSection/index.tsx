import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `CustomerSatisfactionSection`.
 */
export type CustomerSatisfactionSectionProps =
  SliceComponentProps<Content.CustomerSatisfactionSectionSlice>;

/**
 * Component for "CustomerSatisfactionSection" Slices.
 */
const CustomerSatisfactionSection = ({
  slice,
}: CustomerSatisfactionSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for customer_satisfaction_section (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default CustomerSatisfactionSection;
