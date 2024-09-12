import { useCallback, useEffect } from "react";
import { useUiKit } from "../useUiKit";

export const useRouter = (config = null) => {
  const context:any = useUiKit();

  const push = useCallback(
    (url) => {
      console.log("push", context);
      context.config.router.transition.controls.show({ url });
    },
    [context]
  );

  const back = useCallback(
    (url) => {
      console.log("back", context);
      context.config.router.transition.controls.hide({ back: true });
    },
    [context]
  );

  useEffect(() => {
    console.log("context changee", context);
    console.log("config", config);
    if(config) {
      // context.disableRouterTransition()
      context.updateRouterConfig(config);
    }
    
    // context.config.router.routeTransition.controls.hide({ back: true });
  }, [JSON.stringify(config)]);

  return { push, back };
};
