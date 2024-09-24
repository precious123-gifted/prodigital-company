import Bounded from "@/app/components/Bounded";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About = ({ slice }: AboutProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}

      className="pt-[2vw] portrait:pt-[6vw] portrait:sm:pt-[3vw] pb-5 rounded  text-[#384d4d] space-y-10  portrait:space-y-80 portrait:sm:space-y-40"
    >
     

<div className="content w-full py-4 px-5 flex flex-col items-center space-y-[2.5vw] portrait:space-y-[4vw]">

<div className="header text-[2vw] portrait:sm:text-[4vw] portrait:text-[7vw] text-center">{slice.primary.header}</div>

<div className="writeup text-[1.4vw] portrait:sm:text-[3vw] portrait:text-[5vw]  text-center leading-[2.5vw] portrait:leading-[8vw] portrait:sm:leading-[5vw]">{slice.primary.writeup}</div>

</div>



    </Bounded>
  );
};

export default About;
