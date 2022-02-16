import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from '../editor/editor';
import Footer from '../footer/footer';
import Header from '../header/header';
import Preview from '../preview/preview';
import styles from './maker.module.css';

// useNavigate 로 데이터를 전달하고,
// useLocation 으로 데이터를 받는다.

const Maker = ({FileInput, authService, cardRepository}) => {
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState && historyState.id);
    const [cards, setCards] = useState({});
    const navigate = useNavigate();
    const [loginState,setLoginState] = useState(false);
    const onLogout = useCallback(() => { // 함수 컴포넌트에서 함수가 계속 호출이 되어도 동일한 데이터를 쓰려면 useCallback을 사용하자
        authService.logout();
    }, [authService]);
    useEffect(() => {
        if(!userId){
            return;
        }
        const stopRead = cardRepository.readCards(userId, cards => {
            setCards(cards);
        });
        return () => stopRead(); // useEffect 안에서 함수를 리턴해주면, 이 함수는 컴포넌트가 언마운트될 때 실행한다.
    }, [userId, cardRepository]);
    useEffect(() => {
        authService.onAuthChange((user) => {
            setLoginState(user);
            if(user){
                setUserId(user.uid);
            }else{
                navigate('/');
            }
        });
    }, [userId, authService, navigate]);
    
    const deleteCard = (card) => {
        setCards(cards =>{ // 현재 시점의 cards를 가지고 처리
            const updated = {...cards};
            delete updated[card.id];
            return updated;
        });
        cardRepository.removeCard(userId,card);
    };
    const addOrUpdateCard = (card) => {        
        setCards(cards =>{ // 현재 시점의 cards를 가지고 처리
            const updated = {...cards};
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    };
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} loginState={loginState} />
            <div className={styles.container}>
                <Editor cards={cards} FileInput={FileInput} addCard={addOrUpdateCard} updateCard={addOrUpdateCard} deleteCard={deleteCard}></Editor>
                <Preview cards={cards}></Preview>
            </div>
            <Footer />
        </section>
    )
};

export default Maker;