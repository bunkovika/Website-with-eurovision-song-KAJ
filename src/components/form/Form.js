import React, { useState } from 'react';
import Button from '../button/Button';
import './Form.css';

import cross from '../../assets/close_button.svg';
import { saveState } from '../../indexedDB/IndexedDB';
import ImageUpload from "./ImageUpload";
import CountrySelect from "./CountrySelect";
import AudioUpload from "./AudioUpload";

/**
 * Represents a form component for adding  data items.
 * @returns {JSX.Element} The form component.
 */
const Form = ({onClose}) => {
    const [formData, setFormData] = useState({
        country: '',
        selectedImage: null,
        songName: '',
        selectedAudio: null,
    });
    /**
     * Handles the change event of an image input element.
     * Updates the selected image in the form data state and displays a preview of the uploaded image.
     *
     * @param {Event} e - The event object representing the change event.
     */
    const handleImageChange = e => {
        const image = e.target.files[0];

        if (image) {
            setFormData(prevData => ({
                ...prevData,
                selectedImage: image,
            }));

            const reader = new FileReader();

            reader.onloadend = () => {
                const imgElement = document.getElementById('uploaded-image-preview');
                if (imgElement) {
                    imgElement.src = reader.result;
                }
            };

            reader.readAsDataURL(image);
        }
    };

    /**
     * Handles the change event of a country selection input element.
     * Updates the country value in the form data state.
     *
     * @param {Event} e - The event object representing the change event.
     */
    const handleCountryChange = e => {
        const selectedCountry = e.target.value;

        setFormData(prevData => ({
            ...prevData,
            country: selectedCountry,
        }));
    };

    /**
     * Handles the change event of a song name input element.
     * Updates the song name value in the form data state.
     *
     * @param {Event} e - The event object representing the change event.
     */
    const handleSongChange = e => {
        const songName = e.target.value;
        setFormData(prevData => ({
            ...prevData,
            songName: songName,
        }));
    };
    /**
     * Handles the change event of an audio input element.
     * Updates the selected audio in the form data state.
     *
     * @param {Event} e - The event object representing the change event.
     */
    const handleAudioChange = e => {
        const audio = e.target.files[0];

        if (audio) {
            const audioReader = new FileReader();
            audioReader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    selectedAudio: audio,
                }));
            };
            audioReader.readAsDataURL(audio);
        }
    };

    /**
     * Handles the form submission event, performing validation on form data and then processing and saving the data.
     *
     * @param {Event} event - The event object representing the form submission event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        // validation
        if (!formData.country || !formData.selectedImage || !formData.songName || !formData.selectedAudio) {
            alert("Please fill in all fields");
            return;
        }

        const selectedCountry =  formData.country;

        const imageDataURL = await readFileAsDataURL(formData.selectedImage);
        const audioDataURL = await readFileAsDataURL(formData.selectedAudio);

        const newItem = {
            country: selectedCountry.toUpperCase(),
            image: imageDataURL,
            audio: audioDataURL,
            song: formData.songName.toUpperCase(),
        };

        try {
            await saveState(newItem);
            onClose();
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    /**
     * Reads a file as a data URL using FileReader and returns a promise that resolves with the result.
     *
     * @param {File} file - The file to be read.
     * @returns {Promise<string>} A promise that resolves with the data URL of the file.
     */
    const readFileAsDataURL = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form_for_inputs">
            <img src={cross} className="close_image" onClick={onClose} />
            <ImageUpload
                selectedImage={formData.selectedImage}
                handleImageChange={handleImageChange}
            />
            <CountrySelect
                formData={formData}
                handleCountryChange={handleCountryChange}
            />
            <input
                type="text"
                id="songName"
                name="songName"
                value={formData.songName}
                onChange={handleSongChange}
                placeholder="Enter song name"
                required
            />
            <AudioUpload selectedAudio={formData.selectedAudio} handleAudioChange={handleAudioChange} />
            <Button label="add" onClick={handleSubmit} buttonStyle="button-style-add-form" />
        </form>
    );
};

export default Form;

