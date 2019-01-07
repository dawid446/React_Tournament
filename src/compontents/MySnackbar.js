import React from 'react';
import { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class MySnackbar extends Component {

    render()
    {
    const open= React.useState(false);
    {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={6000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Note archived</span>}
                />
            </div>
        );
    }
}
}

export default MySnackbar;