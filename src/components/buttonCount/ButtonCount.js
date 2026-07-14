import React from "react";
import { Button, Count } from './styles.tsx';

export default function ButtonCount(props) {
    return (
      <Button 
        type="button"
        className='p-2 border-transparent border-b-2 hover:border-b-2 hover:border-primary transition-all duration-250 ease-in-out'
        onClick={props.onClick}
      > 
        <img src={props.src} alt={props.name} width="20" height="20" /> 
        {props.count > 0 && <Count> {props.count} </Count>}
      </Button>
    )
}