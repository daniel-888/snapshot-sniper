import React from "react";
import Box from '@mui/material/Box'
import { makeStyles } from "@mui/styles";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import styles from '../styles/Home.module.scss';

const useStyles = makeStyles((theme) => ({
    wallet: {
        //@ts-ignore
        backgroundColor: theme.palette.background.light,
        //@ts-ignore
        border: '1px solid',
        //@ts-ignore
        borderColor: theme.palette.secondary.main,
        //@ts-ignore
        color: theme.palette.primary.main
    }
}))

const Home = () => {

    const wallet = useAnchorWallet()
    const classes = useStyles()

    return (
        <div className={styles.div}>
            {!wallet && <>
                <Box className={styles.subTitle} color="primary.main">
                    Welcome,
                </Box>
                <Box className={styles.subTitle} color="primary.main">
                    Please connect your wallet <br />
                    to use the Snapshot Sniper.
                </Box>
            </>}
            {wallet && <Box className={styles.subTitle} color="primary.main">
                Continue to the Live Listing <br />
                page to the Snapshot Sniper
            </Box>}
            <Box className={styles.text} color="primary.main">
                Customize the sniper specifications to your needs and get sniping. For assistance, reach <br />
                out to the community or the moderators within the Snapshots Discord.
            </Box>
            {!wallet && <WalletMultiButton className={`${styles.wallet} ${classes.wallet}`} />}
            {wallet && <Box className={`${styles.wallet} ${classes.wallet}`} >Connected</Box>}
        </div>
    )
}

export default Home