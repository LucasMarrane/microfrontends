import { registerApplication, start, LifeCycles } from 'single-spa';

const mfe = ['financas'];

registerApplication({
    name: '@lms/layout',
    app: () => System.import<LifeCycles>('@lms/layout'),
    activeWhen: ['/'],
});

mfe.map((front) => {
    return registerApplication({
        name: `@lms/${front}`,
        app: async () => {
            await System.import<LifeCycles>('@lms/layout');
            return System.import<LifeCycles>(`@lms/${front}`);
        },
        activeWhen: (location) => {            
            return location.pathname.includes('/app');
        },
    });
});

start({
    urlRerouteOnly: true,
});
