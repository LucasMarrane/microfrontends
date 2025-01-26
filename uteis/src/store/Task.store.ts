import { createStore } from "zustand";

export interface ITask {
  key: string;
  description: string;
  status: "new" | "in progress" | "done";
}

export interface ITaskStore {
  tasks: Map<string, ITask>;
  addTask: (task: ITask) => void;
  getTask: (key: string) => ITask;
  removeTask: (key: string) => void;
  clear: VoidFunction;
}


export const useTaskStore = createStore<ITaskStore>((set, get) => ({
  tasks: new Map<string, ITask>(),
  addTask: (task) =>
    set((state) => ({
      tasks: new Map<string, ITask>(state.tasks).set(task.key, task),
    })),
  getTask: (key) => get().tasks.get(key),
  removeTask: (key) => {
    set((state) => {
      const _map = new Map<string, ITask>(state.tasks);
      _map.delete(key);
      return { tasks: _map };
    });
  },
  clear: () => set(() => ({ tasks: new Map<string, ITask>() })),
}));
