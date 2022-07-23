import React from "react";
import Box from '@mui/material/Box'

import { getImg } from "../utils/Helper";
import styles from '../styles/Activity.module.scss';

const Activity = () => {

  const table = [
    {
      img: 'okay-bear.png',
      name: 'Okay Bear #1123',
      price: 15,
      date: '2020.06.08 12:15:0'
    },
    {
      img: 'okay-bear.png',
      name: 'Okay Bear #4123',
      price: 12,
      date: '2020.06.07 15:15:0'
    },
    {
      img: 'okay-bear.png',
      name: 'Okay Bear #6345',
      price: 5,
      date: '2020.06.06 10:15:0'
    },
  ]

  return (
    <Box className={styles.div} sx={{ border: '2px solid', borderColor: 'secondary.main', color: 'primary.main' }}>
      <div className={styles.header}>
        <div className={styles.no}>No</div>
        <div className={styles.img}></div>
        <div className={styles.name}>Name</div>
        <div className={styles.date}>Date</div>
        <div className={styles.price}>Pirce</div>
      </div>
      <div className={styles.body}>
        <Box className={styles.noActivity} sx={{ borderTop: '2px solid', borderTopColor: 'secondary.main' }}>
          There is no activity yet.
        </Box>
        {/* {table.map((row, index) => (
          <Box className={styles.row} key={index} sx={{ borderTop: '2px solid', borderTopColor: 'secondary.main' }}>
            <div className={styles.no}>{index + 1}</div>
            <div className={styles.img}>
              <img src={getImg(row.img)} alt={row.name} />
            </div>
            <div className={styles.name}>{row.name}</div>
            <div className={styles.date}>{row.date}</div>
            <div className={styles.price}>{row.price}</div>
          </Box>
        ))} */}
      </div>
    </Box>
  )
}

export default Activity