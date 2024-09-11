export const useRouter = (routerInstance, { backgroundLoaderControls = null }) => {
  const router = routerInstance

  const push = (path) => {
      backgroundLoaderControls.current.show(nextProject)


      router.push()
  }

  return { push }
}