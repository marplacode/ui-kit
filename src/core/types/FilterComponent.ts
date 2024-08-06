import { PropsWithChildren  } from "react"
import { MarplaCommonComponent } from "./MarplaCommonComponent"

export interface FilterComponentProps extends MarplaCommonComponent, PropsWithChildren {
    disabled?: boolean,
    shape?: string
    effect?: string
} 