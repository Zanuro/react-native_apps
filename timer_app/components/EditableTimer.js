import React from 'react';
import PropTypes from 'prop-types';
import TimerForm from './TimerForm';
import Timer from './Timer';


export default class EditableTimer extends React.Component{

    static propTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        project: PropTypes.string.isRequired,
        timeLimit: PropTypes.number.isRequired,
        elapsed: PropTypes.number.isRequired,
        isRunning: PropTypes.bool.isRequired,
        onRemovePress: PropTypes.func.isRequired,
        onStartPress: PropTypes.func.isRequired,
        onStopPress: PropTypes.func.isRequired,
        onFormSubmit: PropTypes.func.isRequired,
    }
   
    state = {
        editFormOpen: false,
    };


    handleSubmitForm = (timer) => {
        const { onFormSubmit } = this.props;

        onFormSubmit(timer);
        this.closeForm();
    }

    handleEditForm = () => {
        this.openForm();
    }

    handleFormClose = () => {
        this.closeForm();
    }

    closeForm = () => {
        this.setState({ editFormOpen: false })
    };

    openForm = () => {
        this.setState({ editFormOpen: true })
    };

    render () {
        const { id, title, project, timeLimit, elapsed, isRunning, onRemovePress, onStartPress, onStopPress } = this.props;
        const { editFormOpen } = this.state;

        if(editFormOpen){
            return <TimerForm id={id} title={title} project={project} timeLimit={timeLimit} onFormSubmit={this.handleSubmitForm} onFormClose={this.handleFormClose}/>;
        }

        return (
            <Timer id={id} title={title} project={project} timeLimit={timeLimit} elapsed={elapsed} isRunning={isRunning} onEditPress={this.handleEditForm} onRemovePress={onRemovePress} onStartPress={onStartPress} onStopPress={onStopPress}/>
        );
    }
}