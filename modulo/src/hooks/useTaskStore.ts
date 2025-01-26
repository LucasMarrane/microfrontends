import { useTaskStore } from "@template/uteis";
import { useStore } from "zustand";

 export const useTaskHook = () => useStore(useTaskStore);
