import React from "react";
import { Button, Count } from './styles.tsx';

export default function ButtonCount(props) {
    return (
      <Button 
        type="button"
        className={`p-2 dark:text-white`}
        onClick={props.onClick}
      > 
        {props.name} 
        {props.count > 0 && <Count> {props.count} </Count>}
      </Button>
    )
}