import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';

export default function Ingredient({index,addIngredientInRequest}) {
    const [name, setName] = useState("");
    const [count, setCount] = useState(0);

    const handleInputName = (event) => {
        setName(event.target.value);
        addIngredientInRequest(event.target.value, count, index);
    }

    const handleInputCount = (event) => {
        setCount(event.target.value);
        addIngredientInRequest(name, event.target.value, index);
    }

    return (
        <Box mt={3}>
            <TextField
                required
                id={`filled-required-0-${index}`}
                label="Ингредиент"
                variant="filled"
                value={name}
                onChange={handleInputName}
            />

            <TextField
                required
                id={`filled-required-1-${index}`}
                label="Количество"
                type="number"
                variant="filled"
                value={count}
                onChange={handleInputCount}
            />
        </Box>

    );
}