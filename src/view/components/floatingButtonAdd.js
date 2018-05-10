import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 5,
        right: theme.spacing.unit * 5,
    },
});

const FloatingButtonAdd = (props) => {
    const { classes } = props;
    return (
        <div>
            <Tooltip title={props.tooltip}>
                <Button
                    variant="fab"
                    color="secondary"
                    aria-label="add"
                    className={classes.button}
                    onClick={props.onClick}>
                    <AddIcon />
                </Button>
            </Tooltip>
        </div>
    );
}

FloatingButtonAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingButtonAdd);
