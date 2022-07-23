import React, { useEffect, useState } from "react";
import NumberFormat, { InputAttributes } from 'react-number-format';

import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { useAppDispatch } from "../redux/hooks";
import { setSelectedSymbol } from "../redux/slice/collectionSlice";
import { MAGICEDEN_API } from "../config/prod";
import { Accordion, AccordionDetails, AccordionSummary }
  from "../components/Accordion"
import styles from '../styles/ListingFilter.module.scss';
import Image from './Image'

const useStyles = makeStyles((theme) => ({
  item: {
    width: '100%', marginBottom: '15px !important',
    "& fieldset": {
      //@ts-ignore
      borderColor: theme.palette.secondary.main
    }
  },
  paper: {
    background: "black",
    border: '2px solid',
    //@ts-ignore
    borderColor: theme.palette.secondary.main
  },
}))

const CustomPaper = (props) => {
  return <Paper elevation={8} {...props}
    sx={{ background: 'black', border: '2px solid', borderColor: 'secondary.main', borderRight: 'none' }} />;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

const ListingFilter = (props) => {

  const {
    allCollection,
    attributes,
    customRpc,
    setCustomRpc,
    sniperMaxPrice,
    setSniperMaxPrice,
    sniperLimitCount,
    setSniperLimitCount,
    privateKey,
    setPrivateKey,
    handleAttrSearch,
    isSniping,
    setIsSniping,
    setAlertState
  } = props

  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [searchedCollectionName, setSearchedCollectionName] = useState('')

  const changeCollection = (value) => {
    dispatch(setSelectedSymbol(value.symbol))
  }

  const handleStartBot = () => {
    if (sniperMaxPrice > 0 && sniperLimitCount > 0) {
      setIsSniping(!isSniping)
    }
    else setAlertState({
      message: "Please input valid Max Price and Count.",
      severity: 'error',
      open: true,
    })
  }

  return (
    <div className={styles.div}>
      {allCollection && <Autocomplete id="free-solo-2-demo"
        freeSolo={true}
        disableClearable
        options={allCollection}
        //@ts-ignore
        getOptionLabel={(option) => (option.name)}
        renderOption={(props, option) => {
          // @ts-ignore
          return <li {...props} key={`${option.symbol}`} style={{ display: 'flex', alignItems: 'center' }}>
            {/* @ts-ignore */}
            <Image converted={`${MAGICEDEN_API.CONVERT_IMAGE_40x40}${option.image}`} origin={option.image} alt={option.name} style={{ width: '35px', minWidth: '35px', borderRadius: '2px', marginRight: '10px' }} />
            {/* @ts-ignore */}
            {option.name}
          </li>
        }}
        PaperComponent={CustomPaper}
        renderInput={(params) => (
          <TextField className={classes.item}
            {...params}
            label="Search Collection"
            InputProps={{
              ...params.InputProps,
              type: 'search',
              autoComplete: 'off'
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
        )}
        onChange={(event, value) => changeCollection(value)}
        onInputChange={(event, value) => setSearchedCollectionName(value)}
        open={searchedCollectionName.length > 2 && isOpen}
      />}
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          aria-expanded
        >
          <Typography sx={{ fontSize: '18px' }}>Sniper Setting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField className={classes.item} color="primary" label="Custom RPC" variant="outlined" size="small" autoComplete="false"
            value={customRpc} name="rpc" InputProps={{ readOnly: isSniping }}
            onChange={(e) => setCustomRpc(e.target.value)}
          />
          <TextField className={classes.item} color="primary" label="Max price" variant="outlined" size="small" autoComplete="false"
            value={sniperMaxPrice} name="maxPrice"
            onChange={(e) => setSniperMaxPrice(e.target.value)}
            InputProps={{
              readOnly: isSniping,
              inputComponent: NumberFormatCustom as any,
              endAdornment: <InputAdornment position="start">SOL</InputAdornment>,
            }}
          />
          <TextField className={classes.item} color="primary" label="Count" variant="outlined" size="small" autoComplete="false"
            value={sniperLimitCount} name="count"
            onChange={(e) => setSniperLimitCount(e.target.value)}
            InputProps={{
              readOnly: isSniping,
              inputComponent: NumberFormatCustom as any,
            }}
          />
          {!isSniping && <Button variant="outlined" sx={{ width: '100%' }} onClick={() => handleStartBot()}>
            Start Bot
          </Button>}
          {isSniping && <Button variant="outlined" sx={{ width: '100%', backgroundColor: 'secondary.main' }} onClick={() => handleStartBot()}>
            Stop Bot
          </Button>}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: '18px' }}>Auto Buy</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField className={classes.item} color="primary" label="Private Key" variant="outlined" size="small" autoComplete="false"
            value={privateKey} name="privateKey"
            onChange={(e) => setPrivateKey(e.target.value)}
          />
          <Button variant="outlined" sx={{ width: '100%' }}>Start AutoBuy</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontSize: '18px' }}>Attribute Filter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {attributes.map((item: any, index: number) => {
            return <div key={index}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-controlled-open-select-label">{item.key}</InputLabel>
                <Select className={`${classes.item} attributes-select`}
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  label={item.key}
                  name={item.key}
                  MenuProps={{
                    classes: {
                      paper: classes.paper
                    }
                  }}
                  onChange={(event) => {
                    const val = event.target.value as string;
                    handleAttrSearch({
                      key: item.key,
                      val
                    })
                  }}
                >
                  <MenuItem value="">NONE</MenuItem>
                  {item.val.map((v: any, i: number) => {
                    return <MenuItem value={v} key={i}>{v}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>
          })}
          {/* <Button variant="outlined" sx={{ width: '100%' }}>Reset</Button> */}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ListingFilter