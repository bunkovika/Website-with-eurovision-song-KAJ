import React from "react";
import uploadAudio from "../../assets/audio_upload.svg";
/**
 * Renders an input field for uploading audio files.
 * Displays either a message indicating that audio has been selected or a prompt to upload audio.
 * Triggers the handleAudioChange function when a file is selected.
 * @param {Object} props - The properties of the audio upload component.
 * @param {boolean} props.selectedAudio - Indicates whether audio has been selected.
 * @param {Function} props.handleAudioChange - The function triggered when a file is selected.
 * @returns {JSX.Element} The audio upload component.
 */
const AudioUpload = ({selectedAudio, handleAudioChange}) => (
    <label htmlFor="audio" className="custom-file-input-label">
        <div className="song-input">
            <span>{selectedAudio ? 'Audio was selected' : 'Upload Audio'}</span>
            <img src={uploadAudio} alt="Upload" className="image_upload_audio"/>
        </div>
        <input
            type="file"
            id="audio"
            name="audio"
            accept="audio/mp3"
            onChange={handleAudioChange}
            style={{display: 'none'}}
        />
    </label>
);

export default AudioUpload;