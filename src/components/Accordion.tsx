import React from "react";

import { styled } from '@mui/material/styles';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid`,
  //@ts-ignore
  borderColor: theme.palette.secondary.main,
  //@ts-ignore
  backgroundColor: theme.palette.background.light,
  marginBottom: '5px',
  borderRadius: '5px'
}));

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '18px' }} />}
    {...props}
  />
))(({ }) => ({}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid black',
}));