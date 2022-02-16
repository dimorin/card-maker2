import React, { useEffect, useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({authService}) => {
    const navigate = useNavigate();
    const [loginState,setLoginState] = useState(false);
    const goToMaker = (userId) => {
        navigate('/maker',{state:{id:userId}});
    };
    const onLogin = (event) => {
        authService.login(event.currentTarget.textContent)
        .then(data => goToMaker(data.user.uid));
    };
    const onLogout = () => {
        authService.logout();
    }
    useEffect(() => {
        authService.onAuthChange(user => {
            setLoginState(user);
            user && goToMaker(user.uid);
        });
    });
    return (
        <section>
            <Header onLogout={onLogout} loginState={loginState}></Header>
            <section className={styles.login}>
                <h1>Login</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Google</button>
                    </li>
                    <li className={styles.item}>
                        <button className={styles.button} onClick={onLogin}>Github</button>
                    </li>
                </ul>
            </section>
            <Footer></Footer>
        </section>
    )
};

export default Login;