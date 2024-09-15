// import { useUiKitStore } from "@store";
import { useUiKitStore } from "../../store";

export const useUiKit = () => {
  const store = useUiKitStore((state) => state)

  return store;
};