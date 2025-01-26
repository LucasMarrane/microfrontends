import { registerApplication, start, LifeCycles } from "single-spa";

const applications = ["modulo"];

/**
 * Caso exista algum app que sirva como um container para os outros microfrontends (exemplo um front contendo o menu lateral, ou afins)
 * é necessario carregar ele antes e ter certeza que esta montado via activeWhen, pode ser feito transformando o parametro app em uma
 * função assincrona que aguarda o app de layout principal e retorna o System.import do front que será montado;
 *
 */
applications.forEach((item) => {
  registerApplication({
    name: `@template/${item}`,
    app: () => System.import<LifeCycles>(`@template/${item}`),
    activeWhen: ["/"],
  });
});

start({
  urlRerouteOnly: true,
});
