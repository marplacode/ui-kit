import { UseInViewOptions } from "framer-motion"
import { PropsWithChildren  } from "react"
import { MarplaCommonComponent } from "./MarplaCommonComponent"

export interface HiddenBoxProps extends MarplaCommonComponent, PropsWithChildren {
    direction?: "top" | "bottom" | "left" | "right",
    delay?: number,
    duration?:number,
    height?: null | number,
    easingValues?: number[],
    isInViewConfig?: UseInViewOptions
} 