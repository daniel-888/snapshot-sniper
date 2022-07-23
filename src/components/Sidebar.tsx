import { NavLink } from 'react-router-dom'
import { makeStyles } from "@mui/styles";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import CellTowerIcon from '@mui/icons-material/CellTower';
import HistoryIcon from '@mui/icons-material/History';

import { useAppDispatch } from '../redux/hooks';
import { toggleTheme } from '../redux/slice/themeSlice';
import { getImg } from "../utils/Helper";
import styles from '../styles/Sidebar.module.scss';
import '../styles/Wallet.scss'

const useStyles = makeStyles((theme) => ({
  activeMenu: {
    '& div': {
      //@ts-ignore
      backgroundColor: theme.palette.secondary.main,
      //@ts-ignore
      color: theme.palette.primary.light
    }
  },
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

const Sidebar = () => {

  const wallet = useAnchorWallet()
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const MenuBox = ({ children }) => {
    return (
      <Box color="primary.main" sx={{ '&:hover': { bgcolor: 'background.lighter' } }}>
        {children}
      </Box>
    )
  }

  return (
    <Box className={styles.div} sx={{ backgroundColor: 'background.light', borderRight: '2px solid', borderRightColor: 'secondary.main' }}>
      <div>
        <NavLink to="/" className={styles.logo}>
          <img src={getImg('logo.png')} alt="log" />
          <Box color="primary.main">Sniper</Box>
        </NavLink>
        <NavLink to="/home" className={styles.menu} activeClassName={classes.activeMenu}>
          <MenuBox><img src={getImg('home.png')} alt="log" />Home</MenuBox>
        </NavLink>
        <NavLink to="/live" className={`${styles.menu} ${!wallet && styles.disable}`} activeClassName={classes.activeMenu}>
          <MenuBox><CellTowerIcon />Live Listing</MenuBox>
        </NavLink>
        <NavLink to="/activity" className={`${styles.menu} ${!wallet && styles.disable}`} activeClassName={classes.activeMenu}>
          <MenuBox><HistoryIcon />Activities</MenuBox>
        </NavLink>
      </div>
      <div>
        <WalletMultiButton className={`${styles.wallet} ${classes.wallet}`} />
        <div className={styles.social}>
          <a href='https://discord.gg/snapshots' target='_blank'><img src={getImg('discord.png')} alt="discord" /></a>
          <a href='https://twitter.com/SnapShotsNFT' target='_blank'><img src={getImg('twitter.png')} alt="twitter" /></a>
          <Box color="primary.main" sx={{ cursor: 'pointer' }} onClick={() => dispatch(toggleTheme())}><Brightness4Icon /></Box>
        </div>
      </div >
    </Box >
  )
}

export default Sidebar