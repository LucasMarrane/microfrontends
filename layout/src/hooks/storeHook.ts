import { usuarioStore, useStoreReact, TUsuarioStore} from '@lms/uteis';

export const useUsuarioStore = useStoreReact<TUsuarioStore>(usuarioStore);
