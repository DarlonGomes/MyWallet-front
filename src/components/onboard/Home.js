import styled from "styled-components";
import axios from "axios";
import exit from '../../assets/exit.png'
import minus from '../../assets/remove-circle-outline.svg'
import plus from '../../assets/add-circle-outline.svg'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home () {
    const [ receipt, setReceipt ] = useState();
    const [ balance, setBalance ] = useState(null);
    const [ render, setRender ] = useState("loading");
    const { data, token } = useContext(UserContext)
    const navigate = useNavigate();
// trocar validação para switch/case;

    useEffect(()=>{
        getUser();
        getData();
    },[]);

    const getUser = () => {
        if(data === null){
            navigate("/")
        }
    }

    const getData = async () => {
        try {
            const response = await axios.get('https://project-my-wallet-back.herokuapp.com/wallet/receipt',token );

            setTimeout(() => {
                setBalance(response.data.balance);
                setReceipt(response.data.receipt.reverse());
                switch (response.data.receipt.length) {
                    case 0 :
                        setRender("empty");
                        break;
                    default:
                        setRender("notEmpty");
                        break;
                }
            }, "1000")
        } catch (error) {
            navigate("/")
        }
    };

    const deleteData = async (element) =>{
        const id = element;
        const answer = window.confirm("Deseja deletar esse registro?")
        if(answer){
            try {
                 await axios.delete(`https://project-my-wallet-back.herokuapp.com/wallet/currency/${id}`, token);
                getData();
                toast.success('Sucesso', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            } catch (error) {
                toast.error('Não foi possível deletar', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            }
        }
    }

    const editIncome = (element) => {
        const resp = window.confirm("Deseja editar esse registro?")
        if(resp){
            navigate(`/home/income/${element}`)
        }
        
    }

    const editSpending = (element) => {
        const resp = window.confirm("Deseja editar esse registro?")
        if(resp){
            navigate(`/home/spent/${element}`)
        }
    }


    const checkValue = (element) =>{
        if(element.value < 0){
            
            return (
                    <Receipt key={element._id}>
                        <p className="date">{element.date}</p>
                        <p className="text" onClick= {() => {editSpending(element._id)}}>{element.text}</p>
                        <p className="negative">{element.value}</p>
                        <p className="info" onClick={() => {deleteData(element._id)}}>X</p>
                    </Receipt>
            )
        }else{
            return (
                <Receipt key={element._id}>
                    <p className="date">{element.date}</p>
                    <p className="text" onClick={()=>{editIncome(element._id)}}>{element.text}</p>
                    <p className="positive">{element.value}</p>
                    <p className="info" onClick={() => {deleteData(element._id)}}>X</p>
                </Receipt>
        )
        }   
    }
    const ToggleContent = () => {
        let color = "positive"
        if(balance !== null){
            if(balance.total < 0){
                color = "negative"
            }
        }

        switch (render) {
            case "empty":
                return(
                    <EmptyContent>
                        <p>Não há registros de<br/>entrada ou saída</p>
                    </EmptyContent>
                 );
            
            case "notEmpty":
                return(
                    <Content>
                        <div className="container">
                        {receipt.map((element)=> checkValue(element))}
                        </div>
                        <Balance>
                            <p className="text">SALDO</p><p className={color}>{balance.total}</p>
                        </Balance>
                    </Content>
                );
        
            default:
                return(
                    <Content>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                        <div className="spacer">
                            <Skeleton />
                        </div>
                    </Content>
                );
        }   
    }
    
    const ToggleUser = () => {
        switch (render) {
            case "loading":
                return(
                    <h3> <Skeleton width={300} baseColor="#A328D6" highlightColor="#C345F7"/> </h3>
                )
            default:
                return(
                    <h3>Olá, {data.name} </h3>
                )
        }
    }



    return(
        <>
        <ToastContainer/>
        <Page>
            <Title>
                <ToggleUser/>
                <img onClick={()=>{
                    const res = window.confirm("Deseja encerrar sua sessão?");
                    if(res){
                        setTimeout(()=>{
                            localStorage.removeItem('MyWalletUser');
                            navigate("/")
                        },"500")
                    }
                }} src={exit} alt="Sair" />
            </Title>
            <ToggleContent/>
            <ButtonWrapper>
                <Click onClick={()=>{navigate("/home/income")}} >
                    <img src={plus} alt="Add symbol"/>
                    <p>Nova<br/>entrada</p>
                </Click>
                <Click onClick={()=>{navigate("/home/spent")}} >
                    <img src={minus} alt="Remove symbol"/>
                    <p>Nova<br/>saída</p>
                </Click>
            </ButtonWrapper>
        </Page>
        </>
    )
}

export default Home;

const Page = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8C11BE;
    box-sizing: border-box;
    padding: 0 20px;
`

const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 25px 0 22px;

    h3{
            font-family: 'Raleway';
            font-weight: 700;
            font-size: 26px;
            color: #FFFFFF;
            
        }home
    
    img{
        width: 23px;
        height: 24px;
    }
`;

const Content = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    border-radius: 5px;
    padding: 10px 10px 0px;
    box-sizing: border-box;
    position: relative;

    p{
        color: #000000;
    }
    .spacer{
        margin-bottom: 20px;
    }

    .container{
        width: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow-y: scroll;
    }
`;

const EmptyContent = styled.div`

    width: 100%;
    flex: 1;
    display: flex;
    background-color: #FFFFFF;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    border-radius: 5px;
    padding: 20px 10px;
    box-sizing: border-box;
    
    p{
        color: #868686;
        text-align: center;
    }

`;

const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 13px 0 13px;

`;

const Click = styled.div`

    width: 155px;
    height: 114px;
    background-color: #A328D6;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    
    p{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 17px;
        color: #FFFFFF;
    }

    img{
        width: 22px;
        height: 22px;
        color: #FFFFFF;
    }
`;

const Receipt = styled.div`

    width: 100%;
    display: flex;
    flex-direction: row;

    p{
        font-family: 'Raleway';
        font-size: 16px;
        font-weight: 400;
        line-height: 35px;
    }

    .date{
        color: #C6C6C6;
        margin-right: 10px;
    }

    .positive{
        color: #03AC00;
    }

    .negative{
        color: #C70000;
    }

    .text{
        color: #000000;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .info{
        color: #C6C6C6;
        margin-left: 10px;
    }
`;

const Balance = styled.div`
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;

    p{
        font-family: 'Raleway';
        font-size: 16px;
        font-weight: 700;
        margin: 10px;
    }

    .text{
        color: #000000;
        flex: 1;
       
    }

    .positive{
        font-weight: 400;
        color: #03AC00;
        
    }

    .negative{
        font-weight: 400;
        color: #C70000;
    }
`;
