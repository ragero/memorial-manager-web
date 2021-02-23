import Content from '../template/Content'
import HomeIcon from '@material-ui/icons/Home'

export default function Home(){
    return(
        <Content titulo='Início' subtitulo='Sobre o Memorial Manager' icone={HomeIcon}>
            <p>
                O Memorial Manager é um sistema desenvolvido para associar cada atividade desenvolvida pelo professor, pesquisador e (ou) extensionista com seus respectivos proofs.
            </p>
            <p>
                Além disso, o sistema possui funcionalidades para geração de códigos em Latex para a geração de memoriais e cadernos de proofs, além de <em>backup</em> dos proofs submetidos. 
            </p>
            <p>
                O sistema foi desenvolvido utilizando o Framework ReactJS no front-end, NodeJS no back-end, banco de dados NoSQL MongoDB, além de BCrypt para criptografar a senha do usuário. 
            </p>
        </Content>
    )
}