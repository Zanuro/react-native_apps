import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';


export default class EditableTimer extends React.Component{
   
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
        const { id, title, project, elapsed, isRunning, onRemovePress, onStartPress, onStopPress } = this.props;
        const { editFormOpen } = this.state;

        if(editFormOpen){
            return <TimerForm id={id} title={title} project={project} onFormSubmit={this.handleSubmitForm} onFormClose={this.handleFormClose}/>;
        }

        return (
            <Timer id={id} title={title} project={project} elapsed={elapsed} isRunning={isRunning} onEditPress={this.handleEditForm} onRemovePress={onRemovePress} onStartPress={onStartPress} onStopPress={onStopPress}/>
        );
    }
}