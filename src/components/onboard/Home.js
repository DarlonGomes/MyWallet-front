import styled from "styled-components";
import axios from "axios";
import exit from '../../assets/exit.png'
import minus from '../../assets/remove-circle-outline.svg'
import plus from '../../assets/add-circle-outline.svg'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Home () {
    const [ receipt, setReceipt ] = useState([]);
    const [ isEmpty, setIsEmpty ] = useState();

    const navigate = useNavigate();
// trocar validação para switch/case;

    const ToggleContent = () => {
        if(isEmpty === false){
            return(
                <Content>

                </Content>
            )
        }else{
            return(
                <EmptyContent>
                    <p>Não há registros de<br/>entrada ou saída</p>
                </EmptyContent>
            )
        }
    }
    

    return(
        <Page>
            <Title>
                <h3>Olá, USER</h3>
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #8C11BE;

`

const Title = styled.div`
    width: 326px;
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
    width: 326px;
    min-height: 446;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 400;
    
    p{
        color: #000000;
    }
`;

const EmptyContent = styled.div`

    width: 326px;
    min-height: 446px;
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
    width: 326px;
    display: flex;
    justify-content: space-between;
    margin-top: 13px;

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