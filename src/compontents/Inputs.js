import React, { Component } from 'react';
import { Formik } from 'formik';

class Input extends Component {
    state = {  }
    render() {
        return (
            <Formik
            onSubmit={(values) => { console.log('submitted', values.score) }}
            onClick={(values) => { console.log('submitted', values) }}
            render={({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSumbit,
                isSumbitting
            }) => (

                    <form onSubmit={handleSumbit}>
                        <input
                            name='score'
                            onChange={handleChange}
                            value={values.score}
                        ></input>

                        <input
                            name='score1'
                            onChange={handleChange}
                            value={values.score1}
                        ></input>
                        <button type='submit'>Zapisz</button>
                    </form>

                )}
        />
        );
    }
}

export default Input;