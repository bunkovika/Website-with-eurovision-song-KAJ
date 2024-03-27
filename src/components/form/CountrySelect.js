import React from "react";

/**
 * Renders a dropdown list for selecting a country.
 * Triggers the handleCountryChange function when a country is selected.
 * @param {Object} props - The properties of the country select component.
 * @param {Object} props.formData - The form data including the country value.
 * @param {Function} props.handleCountryChange - The function triggered when a country is selected.
 * @returns {JSX.Element} The country select component.
 */
const CountrySelect = ({ formData, handleCountryChange}) => (
    <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleCountryChange}
        required
        autoFocus
    >
        <option value="" disabled data-placeholder>Select a country
        </option>
        <option value ="" hidden> Please Select a country of the participant</option>
        <option value="Albania">Albania</option>
        <option value="Armenia">Armenia</option>
        <option value="Austria">Austria</option>
        <option value="Austria">Australia</option>
        <option value="Azerbaijan">Azerbaijan</option>
        <option value="Belgium">Belgium</option>
        <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
        <option value="Bulgaria">Bulgaria</option>
        <option value="Croatia">Croatia</option>
        <option value="Cyprus">Cyprus</option>
        <option value="Czech Republic">Czech Republic</option>
        <option value="Denmark">Denmark</option>
        <option value="Estonia">Estonia</option>
        <option value="Finland">Finland</option>
        <option value="France">France</option>
        <option value="Georgia">Georgia</option>
        <option value="Germany">Germany</option>
        <option value="Greece">Greece</option>
        <option value="Hungary">Hungary</option>
        <option value="Iceland">Iceland</option>
        <option value="Ireland">Ireland</option>
        <option value="Israel">Israel</option>
        <option value="Italy">Italy</option>
        <option value="Latvia">Latvia</option>
        <option value="Lithuania">Lithuania</option>
        <option value="Luxembourg">Luxembourg</option>
        <option value="Malta">Malta</option>
        <option value="Moldova">Moldova</option>
        <option value="Monaco">Monaco</option>
        <option value="Montenegro">Montenegro</option>
        <option value="Netherlands">Netherlands</option>
        <option value="North Macedonia">North Macedonia</option>
        <option value="Norway">Norway</option>
        <option value="Poland">Poland</option>
        <option value="Portugal">Portugal</option>
        <option value="Romania">Romania</option>
        <option value="Russia">Russia</option>
        <option value="San Marino">San Marino</option>
        <option value="Serbia">Serbia</option>
        <option value="Slovakia">Slovakia</option>
        <option value="Slovenia">Slovenia</option>
        <option value="Spain">Spain</option>
        <option value="Sweden">Sweden</option>
        <option value="Switzerland">Switzerland</option>
        <option value="Turkey">Turkey</option>
        <option value="Ukraine">Ukraine</option>
        <option value="United Kingdom">United Kingdom</option>
    </select>
);

export default CountrySelect;