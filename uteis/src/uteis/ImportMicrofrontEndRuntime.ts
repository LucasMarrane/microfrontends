export type TMicrofrontends = 'todo-todo'


export const ImportMicrofrontEndRuntime = async function <T extends any>(microfrontends: TMicrofrontends): Promise<T> {
    try {        
        return await System.import(`@lms/${microfrontends}`);
    } catch (e) {
        console.log('error', e);
    }
};