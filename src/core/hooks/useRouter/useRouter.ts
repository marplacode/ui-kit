import { useBackgroundLoaderControls } from "@context/Provider"

export const useRouter = (routerInstance, { backgroundLoaderControls = null }) => {
  const backgroundLoaderControlsContext = useBackgroundLoaderControls()
  const transitionControls =  backgroundLoaderControlsContext ?? backgroundLoaderControls
  const router = routerInstance

  const push = (url, config) => {
    transitionControls.current.show({ url })

  }

  const go = (url) => {
    router.push(url)
  }

  return { push, go }
}