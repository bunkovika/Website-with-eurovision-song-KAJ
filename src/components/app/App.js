import React, { useState } from 'react';
import Header from '../header/Header';
import Carousel from '../carousel/Carousel';
import Button from '../button/Button';
import Form from '../form/Form';
import './App.css';

// This component represents the main application layout, including a header, carousel, and an option to add a new participant.
// It utilizes state to manage the visibility of a form for adding participants. When the "Add new participant" button is clicked,
// the form becomes visible, and when closed, it hides again.
// The structure is composed of a header, a carousel section, and a button triggering the form's visibility state.
// Additionally, a form overlay is displayed conditionally based on the 'isFormVisible' state, allowing users to interact with it.
// The 'showForm' and 'hideForm' functions manage the visibility state of the form.

const App = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const showForm = () => {
        setFormVisible(true);
    };

    const hideForm = () => {
        setFormVisible(false);
    };

    return (
        <div className="mainApp">
            <Header />
            <Carousel />
            <section className="add_button">
                <Button
                    label="Add new participant"
                    onClick={showForm}
                    buttonStyle="button-style-add-participant"
                />
            </section>
            {isFormVisible && (
                <div className="form-overlay">
                    <Form onClose={hideForm} />
                </div>
            )}
        </div>
    );
};
export default App;
