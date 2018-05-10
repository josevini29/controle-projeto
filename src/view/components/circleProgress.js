import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function CircleProgress(props) {
    const { classes } = props;
    return (
        <div>
            <CircularProgress className={classes.progress} color="secondary" size={50} />
        </div>
    );
}

CircleProgress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircleProgress);
