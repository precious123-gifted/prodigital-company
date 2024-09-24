import { ReactNode } from "react";
import clsx from "clsx";
import {Pontano_Sans} from "next/font/google";



type BoundedProps = {
as? : React.ElementType;
className? : string;
children : ReactNode;


}

const pontanoSans = Pontano_Sans({subsets: ["latin"],weight: "400"})
export default function Bounded({
as: Comp = "section",
className,
children,
...restProps


}:BoundedProps) {
  return (
    <Comp className={clsx("w-full py-[2vw]  h-fit flex bg-[#EBFEFF] backdrop-filter backdrop-blur-md flex-col  items-center overflow-x-hidden  ",className)  } {...restProps} style={pontanoSans.style}>
      <div className={clsx("wall   w-[95%] h-full ",className)} {...restProps}  >{children}</div>
    </Comp>
  )
}
