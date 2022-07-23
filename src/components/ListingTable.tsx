import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'

import { MAGICEDEN_API } from "../config/prod";
import styles from '../styles/ListingTable.module.scss';
import Image from "./Image";

const ListingTable = (props) => {

  const { table, quickBuy } = props
  return (
    <Box className={styles.div} sx={{ border: '2px solid', borderColor: 'secondary.main' }}>
      <Box className={styles.header} color="primary.main">
        <div className={styles.no}>No</div>
        <div className={styles.img}></div>
        <div className={styles.collection}>Collection</div>
        <div className={styles.name}>Name</div>
        {/* <div className={styles.rank}>Rank</div> */}
        {/* <div className={styles.date}>Requested Date</div> */}
        <div className={styles.price}>Pirce</div>
        <div className={styles.buy}>Buy</div>
      </Box>
      <div className={styles.body}>
        {table.map((row, index) => (
          <Box className={styles.row} key={index} color="primary.main" sx={{ borderTop: '2px solid', borderTopColor: 'secondary.main' }}>
            <div className={styles.no}>{index + 1}</div>
            <div className={styles.img}>
              <Image converted={`${MAGICEDEN_API.CONVERT_IMAGE_70x70}${row.img}`} origin={row.img} alt={row.title} />
            </div>
            <div className={styles.collection}>{row.collectionTitle}</div>
            <div className={styles.name}>{row.title}</div>
            {/* <div className={styles.rank}>{row.rank}</div> */}
            {/* <div className={styles.date}>{row.date}</div> */}
            <div className={styles.price}>{row.price} SOL</div>
            <div className={styles.buy}><Button variant="contained" color="secondary" onClick={() => quickBuy(index)}>Buy</Button></div>
          </Box>
        ))}
      </div>
    </Box>
  )
}

export default ListingTable