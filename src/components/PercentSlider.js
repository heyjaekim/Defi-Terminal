import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#073d67',
    height: 8,
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -2,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 24,
    borderRadius: 4,
  },
  rail: {
    height: 24,
    borderRadius: 4,
  },
})(Slider);

export default function PercentSlider(props) {
  const classes = useStyles();
  // console.log(props.maxPercent);
  return (
    <div className={classes.root}>
      
      <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={0} onChange={(e, value)=> props.SetTokenAmount(0, value)} onChangeCommitted={(e, value)=> props.SetTokenAmount(value, 0)} />
      
    </div>
  );
}