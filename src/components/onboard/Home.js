import styled from "styled-components";
import axios from "axios";
import exit from '../../assets/exit.png'
import minus from '../../assets/remove-circle-outline.svg'
import plus from '../../assets/add-circle-outline.svg'
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Home () {
    const [ receipt, setReceipt ] = useState(null);
    const [ balance, setBalance ] = useState(null)
    const [ isEmpty, setIsEmpty ] = useState();
    const { data, token } = useContext(UserContext)
    const navigate = useNavigate();
// trocar validação para switch/case;

useEffect(()=>{
    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/wallet/receipt',token );
            setBalance(response.data.balance);
            setReceipt(response.data.receipt);
            if(receipt=== null){
                setIsEmpty(true);
            }else{
                setIsEmpty(false);
                // make a function where you call the skeleton with a setTimeout;
            }
        } catch (error) {
            navigate("/")
        }
    };

    getData()
},[]);

    const ToggleContent = () => {
        if(isEmpty === false){
            return(
                <Content>

                </Content>
            )
        }else if(isEmpty === true){
            return(
                <EmptyContent>
                    <p>Não há registros de<br/>entrada ou saída</p>
                </EmptyContent>
            )
        }else{
            return(
               <Content>
                <p>CARREGANDO</p>
                </Content> 
            )
        }
    }
    

    return(
        <Page>
            <Title>
                <h3>Olá, {data} </h3>
                <img onClick={()=>{navigate("/")}} src={exit} alt="Sair" />
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
    padding: 0 25px;
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
            
        }
    
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