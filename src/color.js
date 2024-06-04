import React from 'react';
import { useTheme } from './Theme.js'; // Import useTheme hook from ThemeContext

const ColorPicker = ({ onChange }) => {
  const colors = ['blue', 'green', 'red', 'yellow']; // Add more colors as needed
  const { changeThemeColor } = useTheme();

//   const handleColorChange = (color) => {
//     changeThemeColor(color);
//   };

  const handleColorChange = (color) => {
    // onChange(color);
    changeThemeColor(color);
  };

  return (
    <div className="color-picker">
      <select onChange={(e) => handleColorChange(e.target.value)}>
        <option value="">Select Color</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorPicker;
