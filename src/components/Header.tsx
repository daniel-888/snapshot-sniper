import Box from '@mui/material/Box';

import styles from '../styles/Header.module.scss';

const Header = (props) => {

    return (
        <Box className={styles.div} sx={{ borderBottom: '2px solid', borderBottomColor: 'secondary.main' }}>
            <Box className={styles.title} color="primary.main">
                {props.title}
            </Box>
        </Box>
    )
}

export default Header