import React from "react";
import { Route } from "react-router-dom";
import Box from '@mui/material/Box'

import styles from '../styles/PrivateRoute.module.scss';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const PublicRoute = ({ component: Component, ...restOfProps }) => {

  return (
    <Box className={styles.div} sx={{ backgroundColor: 'background.main' }}>
      <Sidebar />
      <div className={styles.container}>
        <Header title={restOfProps.title} />
        <div className={styles.content}>
          <div className="container">
            <Route render={(props) => <Component {...props} />} />
          </div>
        </div>
      </div>
    </Box>

  )
}

export default PublicRoute;