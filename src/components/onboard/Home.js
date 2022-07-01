import styled from "styled-components";
import axios from "axios";
import exit from '../../assets/exit.png'
import minus from '../../assets/remove-circle-outline.svg'
import plus from '../../assets/add-circle-outline.svg'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

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
            const response = await axios.get('http://localhost:5000/wallet/receipt',token );
            setBalance(response.data.balance);
            setReceipt(response.data.receipt);
            console.log(response.data.receipt.length)
            console.log(response.data.balance)
            switch (response.data.receipt.length) {
                case 0 :
                    setRender("empty");
                    break;
                default:
                    setRender("notEmpty");
                    break;
            }
        } catch (error) {
            navigate("/")
        }
    };

    const deleteData = async (element) =>{
        const id = element;
        try {
            console.log(id)
             await axios.delete(`http://localhost:5000/wallet/currency/${id}`, token);
            getData();
        } catch (error) {
            console.log(error)
        }
    }

    const editIncome = (element) => {
        navigate(`/home/income/${element}`)
    }

    const editSpending = (element) => {
        navigate(`/home/spent/${element}`)
    }


    const checkValue = (element) =>{
        if(element.value < 0){
            console.log(element._id)
            return (
                    <Receipt key={element._id} onClick= {() => {editSpending(element._id)}}>
                        <p className="date">{element.date}</p>
                        <p className="text">{element.text}</p>
                        <p className="negative">{element.value}</p>
                        <p className="info" onClick={() => {deleteData(element._id)}}>X</p>
                    </Receipt>
            )
        }else{
            return (
                <Receipt key={element._id} onClick= {()=>{editIncome(element._id)}}>
                    <p className="date">{element.date}</p>
                    <p className="text">{element.text}</p>
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
                        {receipt.map((element)=> checkValue(element))}
                        <Balance>
                            <p className="text">SALDO</p><p className={color}>{balance.total}</p>
                        </Balance>
                    </Content>
                );
        
            default:
                return(
                    <EmptyContent>
                        <p>Carregando papai</p>
                    </EmptyContent>
                );
        }   
    }
    
    const ToggleUser = () => {
        switch (render) {
            case "loading":
                return(
                    <h3>Olá, USER </h3>
                )
            default:
                return(
                    <h3>Olá, {data.name} </h3>
                )
        }
    }

    return(
        <Page>
            <Title>
                <ToggleUser/>
                <img onClick={()=>{
                    localStorage.clear();
                    navigate("/")
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
    padding: 20px 10px 0px;
    box-sizing: border-box;
    position: relative;
    p{
        color: #000000;
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
    margin-bottom: 25px;

    p{
        font-family: 'Raleway';
        font-size: 16px;
        font-weight: 400;
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
    position: absolute;
    bottom: 0px;
    right: 0px;
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
