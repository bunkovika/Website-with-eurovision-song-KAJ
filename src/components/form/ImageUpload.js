import React from "react";
import uploadImage from '../../assets/image_upload.svg';

/**
 * This component renders an input field for uploading images.
 * It displays either a preview of the selected image or a prompt to upload an image.
 * It triggers the handleImageChange function when an image is selected and handleImageClick function when the image area is clicked.
 *
 * @param {object} props - The props object containing selectedImage, handleImageChange, and handleImageClick functions.
 * @param {File} props.selectedImage - The selected image file.
 * @param {Function} props.handleImageChange - The function to handle the change event of the image input.
 * @param {Function} props.handleImageClick - The function to handle click events on the image area.
 */const ImageUpload = ({ selectedImage, handleImageChange, handleImageClick }) => (
    <label htmlFor="image" onClick={handleImageClick}>
        <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : uploadImage}
            alt={selectedImage ? 'Selected' : 'Upload'}
            className="image-preview"
        />
        <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            required
        />
    </label>
);

export default ImageUpload;