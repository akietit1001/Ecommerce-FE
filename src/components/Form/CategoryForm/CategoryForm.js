import React from 'react';
import Input from './../../Input/Input';
import Button from '../../Button/Button';

const CategoryForm = ({TextButton, handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter new category"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                </div>

                <Button type="submit" className="btn">
                    {TextButton}
                </Button>
            </form>
        </>
    );
}

export default CategoryForm;
