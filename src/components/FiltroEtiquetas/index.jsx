import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';
import PropTypes from 'prop-types';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({etiquetas}) {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (event, tags) => {
    setSelectedTags(tags);
    // Puedes realizar otras operaciones con las etiquetas seleccionadas si es necesario
  };

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={etiquetas}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}

CheckboxesTags.propTypes = {
    etiquetas: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        // Agrega cualquier otra propiedad que pueda tener tu objeto etiqueta
      })
    ).isRequired,
  };
  


