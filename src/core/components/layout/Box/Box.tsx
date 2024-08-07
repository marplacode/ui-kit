import { Box as CBox } from "@chakra-ui/react";
import { Filter } from "@components/foundations";
import { MarplaCommonComponent } from "@types/MarplaCommonComponent";
import { FC } from "react";


export const Box = CBox
// export const Box: FC<MarplaCommonComponent> = ({
//   children,
//   show,
//   thickness,
//   delay = 0,
//   ...props
// }) => {
//   return (
//     <Filter
//       effect="border"
//       show={show}
//       thickness={1}
//       delay={delay}
//       // sides={{ top: { show: false }, right: { show: false } }}
//     >
//       <CBox p="2" {...props}>
//         {children}
//       </CBox>
//     </Filter>
//   );
// };
