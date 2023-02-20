export function criarChildMFE(elemento, elementoPai = 'modulos') {
    return () => {
        let el = document.getElementById(elementoPai);
        if (!el) {
            el = document.createElement('div');
            el.id = elementoPai;
            document.body.appendChild(el);
        }

        let modulo = document.getElementById(elemento);
        if (!modulo) {
            modulo = document.createElement('div');
            modulo.id = elemento;
            el.appendChild(modulo);
        }

        return modulo;
    };
}
