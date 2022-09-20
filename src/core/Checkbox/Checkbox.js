import React, { useState } from 'react';

const Checkbox = ({ categories, handelFilters}) => {
    const [checked, setChecked] = useState([]);

    const handelToggle = c => () =>{
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];

        if(currentCategoryId == -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        setChecked(newCheckedCategoryId);
        handelFilters(newCheckedCategoryId);
    }
    return categories.map((c,i)=>(
        <li key={i} className="list-unstyled">
            <input type="checkbox" onChange={handelToggle(c._id)} valu={checked.indexOf(c._id  == -1)} className="form-check-input" />
            <label  className="form-check-label">{c.name}</label>
        </li>
    ))
};

export default Checkbox;