import { ColorBox } from "./ColorBox";
import { useState } from 'react';
import Button from '@mui/material/Button';

export function AddColor() {
  const [color, setColor] = useState("red");
  const styles = { backgroundColor: color };
  const [colors, setColors] = useState(["teal", "orange", "lavender"]);
  return (<div className="AddColor">
    <div>
    <input value={color} className="color-input"
      onChange={(event) => setColor(event.target.value)}
      style={styles}
      placeholder="Enter Color" />  
    </div>
    <Button onClick={() => setColors([...colors, color])} variant="contained">Add Color</Button>
    {colors.map((clr,id) => <ColorBox color={clr} key={id}/>)}
  </div>);
}
