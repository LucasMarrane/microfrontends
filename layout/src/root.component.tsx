import { useEffect } from 'react';
import { Container } from './componentes/container';
import { useUsuarioStore } from './hooks/storeHook';

export default function Root(props) {
    const { usuario, setUsuario } = useUsuarioStore();

    useEffect(() => {
        setUsuario({ nome: 'sala lese', modulos: ['sassalele', 'lelesassa'] });
    }, []);

    console.log(usuario);
    return (
        <Container>
            <div style={{ background: '#ffccdd', padding: 0, margin: 0 }} id='modulos'></div>
        </Container>
    );
}
