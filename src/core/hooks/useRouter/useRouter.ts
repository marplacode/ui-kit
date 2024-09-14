import { useCallback, useEffect } from "react";
import { useUiKit } from "../useUiKit";

export const useRouter = (config = null) => {
  const context:any = useUiKit();
  const router = context.config.router
  const instance = router.instance ?? {}

  const push = useCallback(
    (url) => {
      if(url === router.instance.asPath) return
      console.log("push", context);
      router.transition.controls.show({ url });
    },
    [context]
  );

  const back = useCallback(
  (url) => {
      console.log("back", context);
      router.transition.controls.hide({ back: true });
    },
    [context]
  );

  useEffect(() => {
    if(config) {
      context.updateRouterConfig(config);
    }
  }, [JSON.stringify(config)]);

  return { instance, push, back  };
};
