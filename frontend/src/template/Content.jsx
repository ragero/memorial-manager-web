import './Content.css'
import {Fragment} from 'react'
import Header from './Header'

export default function Content(props){

    return(
        <Fragment>
            <Header titulo={props.titulo} subtitulo={props.subtitulo} icone={props.icone}/>
            <hr/>
            <main className="principal container-fluid shadow-lg p-3 mb-5 bg-white rounded">
                {props.children}
            </main>
        </Fragment>
    )
}

