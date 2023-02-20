import { createStore, StateCreator, create, StoreApi } from 'zustand';
import { createJSONStorage, persist, PersistStorage } from 'zustand/middleware';

const persistStorage = persist as unknown as Function;

export const storageB64 = (storage: any = localStorage) => {
    return {
        getItem: (key) => {
            const retorno = atob(storage.getItem(key));
            return retorno;
        },
        setItem: (key, value) => {
            storage.setItem(key, btoa(value));
        },
        removeItem: storage.removeItem,
    } as Storage;
};

type TStoreFactoryConfig = {
    name: string;
    storage?: PersistStorage<Storage>;
    base64?: boolean;
};

export function storeFactory<T extends {}>(callback: StateCreator<T>, config?: TStoreFactoryConfig) {
    let callbackCreator = callback;
    if (config?.name) {
        callbackCreator = persistStorage(callback, {
            name: config?.name,
            storage: createJSONStorage(() => {
                let storage = localStorage as unknown as PersistStorage<Storage>;
                if (config?.base64) {
                    storage = storageB64(config?.storage) as unknown as PersistStorage<Storage>;
                } else if (config?.storage && !config?.base64) {
                    storage = config?.storage;
                }

                return storage as any;
            }),
        });
    }
    return createStore<T>(callbackCreator);    
}

export function useStoreReact<T extends {}>(store) {
  return create<T>(store);
}

export interface IUsuario {
    nome: string;
    modulos: any[];
}

export type TUsuarioStore = {
    usuario: IUsuario;
    setUsuario: (usuario?: IUsuario) => any;
};

export const usuarioStore: StoreApi<TUsuarioStore> = storeFactory<TUsuarioStore>(
    (set, get) => ({
        usuario: {} as IUsuario,
        setUsuario: (usuario) => set(() => ({ usuario: usuario })),
    }),
    { name: 'usuarioStore', base64: true }
);
