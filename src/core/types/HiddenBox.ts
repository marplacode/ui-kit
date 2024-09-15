import { UseInViewOptions } from "framer-motion"
import { PropsWithChildren  } from "react"
import { MarplaCommonComponent } from "./MarplaCommonComponent"

/**
 * @deprecated
 */
export interface HiddenBoxProps extends MarplaCommonComponent, PropsWithChildren {
    direction?: "top" | "bottom" | "left" | "right",
    delay?: number,
    duration?:number,
    height?: null | number,
    easingValues?: number[],
} 

export interface MotionBoxProps extends MarplaCommonComponent, PropsWithChildren {
    direction?: "top" | "bottom" | "left" | "right",
    delay?: number,
    duration?:number,
    height?: null | number,
    easingValues?: number[],
    initialValues?: {}
    visibleBg?: 'transparent'
} 