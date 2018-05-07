import React from "react";
import Snackbar from "material-ui/Snackbar";

class FloatingMessage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        setTimeout(() => {
            this.handleClose();
        }, 3000);

        return (
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={this.state.open}
                onClose={this.handleClose}
                ContentProps={{
                    "aria-describedby": "message-id"
                }}
                message={<span id="message-id">{this.props.message}</span>}
            />
        );
    }
}

export default FloatingMessage;
