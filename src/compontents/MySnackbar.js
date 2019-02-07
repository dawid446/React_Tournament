import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const MySnackbar = () =>
{
    return(
   <Snackbar
        open={this.state.open}
        onClose={this.handleClose}

        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    )
}

export default MySnackbar;