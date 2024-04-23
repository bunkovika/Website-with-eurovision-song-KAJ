/**
 * Rewrites the previous SVG with a new design and updates its path and fill.
 *
 * @param {function} setSvgPrevPath - The state updater function for the previous SVG path.
 * @param {function} setSvgPrevFill - The state updater function for the previous SVG fill color.
 */
export const rewriteSvgPrev= (setSvgPrevPath, setSvgPrevFill) => {
    const svg = document.querySelector('#prev_button');
    const thePath = svg.querySelector('path');
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "52");
    rect.setAttribute("height", "52");
    rect.setAttribute("rx", "26");
    rect.setAttribute("fill", "white");
    rect.setAttribute("fill-opacity", "0.95");

    svg.insertBefore(rect, svg.firstChild);

    thePath.setAttribute('d', "M29.449 16.9796C29.7143 16.9796 29.9796 17.0857 30.1918 17.298C30.6163 17.7225 30.6163 18.3857 30.1918 18.8102L22.2326 26.7694C21.8082 27.1939 21.1449 27.1939 20.7204 26.7694C20.2959 26.3449 20.2959 25.6816 20.7204 25.2572L28.6796 17.298C28.9184 17.0857 29.1837 16.9796 29.449 16.9796ZM21.4898 24.9388C21.7551 24.9388 22.0204 25.0449 22.2326 25.2571L30.1918 33.2163C30.6163 33.6408 30.6163 34.3041 30.1918 34.7286C29.7673 35.1531 29.1041 35.1531 28.6796 34.7286L20.7204 26.7694C20.2959 26.3449 20.2959 25.6816 20.7204 25.2571C20.9592 25.0449 21.2245 24.9388 21.4898 24.9388ZM26 4.77551C37.7 4.77551 47.2245 14.3 47.2245 26C47.2245 37.7 37.7 47.2245 26 47.2245C14.3 47.2245 4.77551 37.7 4.77551 26C4.77551 14.3 14.3 4.77551 26 4.77551ZM26 45.102C36.5327 45.102 45.102 36.5327 45.102 26C45.102 15.4673 36.5327 6.89796 26 6.89796C15.4673 6.89796 6.89796 15.4673 6.89796 26C6.89796 36.5327 15.4673 45.102 26 45.102Z");

    setSvgPrevPath(thePath.getAttribute("d"));
    thePath.setAttribute("fill", "#613A6B");
    setSvgPrevFill(thePath.getAttribute("fill"));
}
/**
 * Resets the previous SVG to its original design and updates its path and fill.
 *
 * @param {function} setSvgPrevPath - The state updater function for the previous SVG path.
 * @param {function} setSvgPrevFill - The state updater function for the previous SVG fill color.
 */
export const resetSvgPrev = (setSvgPrevPath, setSvgPrevFill) => {
    const svg = document.querySelector('#prev_button');
    const thePath = svg.querySelector('path');
    const rect = svg.querySelector('rect');
    if (rect) {
        svg.removeChild(rect);
    }
    thePath.setAttribute('d', "M33.9796 19.5919C34.2857 19.5919 34.5918 19.7143 34.8367 19.9592C35.3265 20.449 35.3265 21.2143 34.8367 21.7041L25.6531 30.8878C25.1633 31.3776 24.3979 31.3776 23.9082 30.8878C23.4184 30.398 23.4184 29.6327 23.9082 29.1429L33.0918 19.9592C33.3673 19.7143 33.6735 19.5919 33.9796 19.5919ZM24.7959 28.7755C25.102 28.7755 25.4082 28.898 25.6531 29.1429L34.8367 38.3265C35.3265 38.8163 35.3265 39.5816 34.8367 40.0714C34.3469 40.5612 33.5816 40.5612 33.0918 40.0714L23.9082 30.8878C23.4184 30.398 23.4184 29.6327 23.9082 29.1429C24.1837 28.898 24.4898 28.7755 24.7959 28.7755ZM30 5.51022C43.5 5.51022 54.4898 16.5 54.4898 30C54.4898 43.5 43.5 54.4898 30 54.4898C16.5 54.4898 5.5102 43.5 5.5102 30C5.5102 16.5 16.5 5.51022 30 5.51022ZM30 52.0408C42.1531 52.0408 52.0408 42.1531 52.0408 30C52.0408 17.847 42.1531 7.95919 30 7.95919C17.8469 7.95919 7.95918 17.847 7.95918 30C7.95918 42.1531 17.8469 52.0408 30 52.0408Z");

    setSvgPrevPath(thePath.getAttribute("d"));
    thePath.setAttribute("fill", "white");
    setSvgPrevFill(thePath.getAttribute("fill"));
}
/**
 * Rewrites the next SVG with a new design and updates its path and fill.
 *
 * @param {function} setSvgNextPath - The state updater function for the next SVG path.
 * @param {function} setSvgNextFill - The state updater function for the next SVG fill color.
 */
export const rewriteSvgNext = (setSvgNextPath, setSvgNextFill) => {
    const svg = document.querySelector('#next_button');
    const thePath = svg.querySelector('path');
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "52");
    rect.setAttribute("height", "52");
    rect.setAttribute("rx", "26");
    rect.setAttribute("fill", "white");
    rect.setAttribute("fill-opacity", "0.95");

    svg.insertBefore(rect, svg.firstChild);
    thePath.setAttribute('d', "M22.551 35.0204C22.2857 35.0204 22.0204 34.9143 21.8082 34.702C21.3837 34.2775 21.3837 33.6143 21.8082 33.1898L29.7674 25.2306C30.1918 24.8061 30.8551 24.8061 31.2796 25.2306C31.7041 25.6551 31.7041 26.3184 31.2796 26.7428L23.3204 34.702C23.0816 34.9143 22.8163 35.0204 22.551 35.0204Z\n" +
        "    M30.5102 27.0612C30.2449 27.0612 29.9796 26.9551 29.7674 26.7429L21.8082 18.7837C21.3837 18.3592 21.3837 17.6959 21.8082 17.2714C22.2327 16.8469 22.8959 16.8469 23.3204 17.2714L31.2796 25.2306C31.7041 25.6551 31.7041 26.3184 31.2796 26.7429C31.0408 26.9551 30.7755 27.0612 30.5102 27.0612Z\n" +
        "    M26 47.2245C14.3 47.2245 4.77551 37.7 4.77551 26C4.77551 14.3 14.3 4.77551 26 4.77551C37.7 4.77551 47.2245 14.3 47.2245 26C47.2245 37.7 37.7 47.2245 26 47.2245ZM26 6.89796C15.4673 6.89796 6.89796 15.4673 6.89796 26C6.89796 36.5327 15.4673 45.102 26 45.102C36.5327 45.102 45.102 36.5327 45.102 26C45.102 15.4673 36.5327 6.89796 26 6.89796Z");

    setSvgNextPath(thePath.getAttribute("d"));
    thePath.setAttribute("fill", "#613A6B");
    setSvgNextFill(thePath.getAttribute("fill"));

}
/**
 * Resets the next SVG to its original design and updates its path and fill.
 *
 * @param {function} setSvgNextPath - The state updater function for the next SVG path.
 * @param {function} setSvgNextFill - The state updater function for the next SVG fill color.
 */
export const resetSvgNext = (setSvgNextPath, setSvgNextFill) => {
    const svg = document.querySelector('#next_button');
    const thePath = svg.querySelector('path');
    const rect = svg.querySelector('rect');
    if (rect) {
        svg.removeChild(rect);
    }
    thePath.setAttribute('d', "M26.0204 40.4081C25.7143 40.4081 25.4081 40.2857 25.1632 40.0408C24.6734 39.551 24.6734 38.7857 25.1632 38.2959L34.3469 29.1122C34.8367 28.6224 35.602 28.6224 36.0918 29.1122C36.5816 29.602 36.5816 30.3673 36.0918 30.8571L26.9081 40.0408C26.6326 40.2857 26.3265 40.4081 26.0204 40.4081Z M35.2041 31.2245C34.8979 31.2245 34.5918 31.102 34.3469 30.8571L25.1632 21.6735C24.6734 21.1837 24.6734 20.4184 25.1632 19.9286C25.653 19.4388 26.4183 19.4388 26.9081 19.9286L36.0918 29.1122C36.5816 29.602 36.5816 30.3673 36.0918 30.8571C35.8163 31.102 35.5102 31.2245 35.2041 31.2245Z M30 54.4898C16.5 54.4898 5.51019 43.5 5.51019 30C5.51019 16.5 16.5 5.51019 30 5.51019C43.5 5.51019 54.4898 16.5 54.4898 30C54.4898 43.5 43.5 54.4898 30 54.4898ZM30 7.95917C17.8469 7.95917 7.95917 17.8469 7.95917 30C7.95917 42.153 17.8469 52.0408 30 52.0408C42.153 52.0408 52.0408 42.153 52.0408 30C52.0408 17.8469 42.153 7.95917 30 7.95917Z");

    setSvgNextPath(thePath.getAttribute("d"));
    thePath.setAttribute("fill", "white");
    setSvgNextFill(thePath.getAttribute("fill"));
}