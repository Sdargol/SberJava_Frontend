import React, { useEffect, useState } from 'react';
import { deleteDish, getAll } from '../../api/request';
import { IngredientCard } from './IngredientCard';

export default function ListAll() {
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        console.log("вызов эффекта");
        getAll(setDishes);  
    }, []);

    const handleDeleteDish = (name) => {
        deleteDish(name, dishes, setDishes);
    }

    return (
        <div>
            {dishes.map((v, i) => <IngredientCard key={i} name={v.name} ingredients={v.ingredients} handleDeleteDish={handleDeleteDish}></IngredientCard>)}
        </div>
    );
}

