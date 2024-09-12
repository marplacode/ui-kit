import { UseInViewOptions } from "framer-motion"

export interface MarplaCommonComponent {
    show?: boolean
    showInView?: boolean
    animationDisabled?: boolean
    isInViewConfig?: UseInViewOptions
    controls?: { show: (metadata: any)=> {}, hide: (metadata: any)=> {}, subscribe: (event: string, cb: ()=> void)=> {}}
}