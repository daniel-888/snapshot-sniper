import React, { useEffect, useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setPage } from "../redux/slice/pageSlice";
import styles from '../styles/PrivateRoute.module.scss';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PrivateRoute = ({ component: Component, ...restOfProps }) => {

    const wallet = useAnchorWallet();
    const dispatch = useAppDispatch()
    const page = useAppSelector((state) => (state.page.page))
    const container = useRef(null)

    useEffect(() => {
        // container?.current?.addEventListener("scroll", () => {
        //     const { scrollHeight, scrollTop, clientHeight } = container.current
        //     const scroll = scrollHeight - scrollTop - clientHeight
        //     if (scroll < 50) {
        //         dispatch(setPage(page + 1))
        //     }
        // }); // attaching scroll event listener
    }, [])

    if (!wallet) return <Redirect to="/" />

    return (
        <Box className={styles.div} sx={{ backgroundColor: 'background.main' }}>
            <Sidebar />
            <div className={styles.container}>
                <Header title={restOfProps.title} />
                <div className={styles.content} ref={container}>
                    <div className="container">
                        <Route render={(props) => <Component {...props} />} />
                    </div>
                </div>
            </div>
        </Box>

    )
}

export default PrivateRoute;