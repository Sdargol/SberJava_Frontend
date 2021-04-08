export const deleteDish = (name, dishes, setDishes) => {
    fetch(`http://192.168.1.5:8080/api/recipes/${name}`,
        {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDishes(dishes.filter((d) => d.name != data.name));
        })
        .catch(e => console.log(e));
}

export const getAll = (setDishes) => {
    fetch('http://192.168.1.5:8080/api/recipes',
        {
            method: "GET",
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setDishes(data);
        })
        .catch(e => console.log(e));
}

export const create = (dish, setOpen) => {
    fetch('http://192.168.1.5:8080/api/recipes',
    {
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(dish)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //setOpen(true);
      if(data.hasOwnProperty('error')){
        setOpen({isOpen: true, message:data.error});
      }else{
        setOpen({isOpen: true, message:`Блюдо с id ${data.id} и названием ${data.name} создано`});
      }
     
    })
    .catch(e => console.log(e));
}

export const fullNameSearch = async (name, setDishes) => {
    let response = await fetch(`http://192.168.1.5:8080/api/recipes/${name}`,{ method: "GET",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
     
    });

    let dish = await response.json();

    if(Array.isArray(dish)){
        setDishes(dish);
    }else{
        setDishes([dish]);
    }
  
}

export const likeNameSearch = async (name, setDishes) => {
    let response = await fetch('http://192.168.1.5:8080/api/recipes/search',{ method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({name})
    });

    let dish = await response.json();

    setDishes(dish);
}