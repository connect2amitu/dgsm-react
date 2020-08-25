import React, { useState } from 'react'
import classes from '../assets/css/jivani.module.scss';
import { Slider } from '@material-ui/core';
import { AddRounded, RemoveRounded } from '@material-ui/icons';

export default function Jivani(props) {
  const [fontSize, setFontSize] = useState(18);
  return (
    <div className={classes.jivani}>
      <h3 style={{ textAlign: "center", margin: 5 }}> {props.data.title}</h3>
      <h1 style={{ textAlign: "center", margin: 0 }}>{props.data.heading}</h1>
      <div className={classes.sliderWrapper}>
        <span className={`${classes.fontSlider} ${classes.plus}`} ><AddRounded /></span>
        <Slider
          style={{ padding: 0 }}
          className={classes.fontSlider}
          onChange={(e, val) => setFontSize(val)}
          orientation="vertical"
          step={3}
          defaultValue={18}
          min={15}
          max={36}
          aria-labelledby="vertical-slider"
        />
        <span className={`${classes.fontSlider} ${classes.minus}`} ><RemoveRounded /></span>
      </div>
      {props.data.lines.map(line => <p style={{ fontSize: `${fontSize}px`, }} className={classes.paragraph} dangerouslySetInnerHTML={{ __html: line }}></p>)}
    </div>
  )
}
