import React, { useState,  useEffect } from 'react';
// assets
import playIcon from '../../assets/play.svg';
import stopIcon from '../../assets/stop.svg';
import addFavouriteIcon from '../../assets/add_to_favourites.svg';
import deleteFavouriteIcon from '../../assets/delete_from_favourites.svg';
import cross from "../../assets/close_button.svg";

import './Carousel.css';
import data from './CarouselData';

import { loadState, deleteState, subscribeToChanges, subscribers } from '../../indexedDB/IndexedDB';
import {useOnlineStatus} from "../../hooks/useOnlineStatus";
import { rewriteSvgPrev, resetSvgPrev, rewriteSvgNext, resetSvgNext } from '../button/SvgButtonFunctions';

/**
 * Represents a carousel component displaying data items.
 * @returns {JSX.Element} The carousel component.
 */
const Carousel = () => {
    const [combinedData, setCombinedData] = useState([]);
    const dataLength = combinedData.length;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    const [audioRefs, setAudioRefs] = useState([]);
    const [animationInProgress, setAnimationInProgress] = useState(null);
    const [expandedImage, setExpandedImage] = useState(null);
    const [itemsToShow, setItemsToShow] = useState(3);
    const isOnline = useOnlineStatus();
    const [svgPrevPath, setSvgPrevPath] = useState("M33.9796 19.5919C34.2857 19.5919 34.5918 19.7143 34.8367 19.9592C35.3265 20.449 35.3265 21.2143 34.8367 21.7041L25.6531 30.8878C25.1633 31.3776 24.3979 31.3776 23.9082 30.8878C23.4184 30.398 23.4184 29.6327 23.9082 29.1429L33.0918 19.9592C33.3673 19.7143 33.6735 19.5919 33.9796 19.5919ZM24.7959 28.7755C25.102 28.7755 25.4082 28.898 25.6531 29.1429L34.8367 38.3265C35.3265 38.8163 35.3265 39.5816 34.8367 40.0714C34.3469 40.5612 33.5816 40.5612 33.0918 40.0714L23.9082 30.8878C23.4184 30.398 23.4184 29.6327 23.9082 29.1429C24.1837 28.898 24.4898 28.7755 24.7959 28.7755ZM30 5.51022C43.5 5.51022 54.4898 16.5 54.4898 30C54.4898 43.5 43.5 54.4898 30 54.4898C16.5 54.4898 5.5102 43.5 5.5102 30C5.5102 16.5 16.5 5.51022 30 5.51022ZM30 52.0408C42.1531 52.0408 52.0408 42.1531 52.0408 30C52.0408 17.847 42.1531 7.95919 30 7.95919C17.8469 7.95919 7.95918 17.847 7.95918 30C7.95918 42.1531 17.8469 52.0408 30 52.0408Z");
    const [svgNextPath, setSvgNextPath] = useState("M26.0204 40.4081C25.7143 40.4081 25.4081 40.2857 25.1632 40.0408C24.6734 39.551 24.6734 38.7857 25.1632 38.2959L34.3469 29.1122C34.8367 28.6224 35.602 28.6224 36.0918 29.1122C36.5816 29.602 36.5816 30.3673 36.0918 30.8571L26.9081 40.0408C26.6326 40.2857 26.3265 40.4081 26.0204 40.4081Z M35.2041 31.2245C34.8979 31.2245 34.5918 31.102 34.3469 30.8571L25.1632 21.6735C24.6734 21.1837 24.6734 20.4184 25.1632 19.9286C25.653 19.4388 26.4183 19.4388 26.9081 19.9286L36.0918 29.1122C36.5816 29.602 36.5816 30.3673 36.0918 30.8571C35.8163 31.102 35.5102 31.2245 35.2041 31.2245Z M30 54.4898C16.5 54.4898 5.51019 43.5 5.51019 30C5.51019 16.5 16.5 5.51019 30 5.51019C43.5 5.51019 54.4898 16.5 54.4898 30C54.4898 43.5 43.5 54.4898 30 54.4898ZM30 7.95917C17.8469 7.95917 7.95917 17.8469 7.95917 30C7.95917 42.153 17.8469 52.0408 30 52.0408C42.153 52.0408 52.0408 42.153 52.0408 30C52.0408 17.8469 42.153 7.95917 30 7.95917Z");
    const [svgPrevFill, setSvgPrevFill] = useState("white");
    const [svgNextFill, setSvgNextFill] = useState("white");
    /**
     * Loads data from CarouselData and IndexedDB.
     */
    const loadData = async () => {
        const loadedData = await loadState();
        setCombinedData([...data, ...loadedData]);
    };

    /**
     * Load data from IndexedDB on initial render
     */
    useEffect(() => {
        loadData();
    }, []);

    /**
     * Subscribe to changes in IndexedDB
     */
    useEffect(() => {
        const subscriptionCallback = () => {
            loadData();
        };
        subscribeToChanges(subscriptionCallback);

        return () => {
            // Unsubscribe when component unmounts
            const index = subscribers.indexOf(subscriptionCallback);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
        };
    }, []);

   /**
   * Set audio refs when data length changes
   */
    useEffect(() => {
        setAudioRefs(Array.from({ length: dataLength }, (_, index) => audioRefs[index] || React.createRef()));
    }, [dataLength]);

    useEffect(() => {
        /**
        * Update number of items to show based on screen width
        */
        const handleResize = () => {
            if (window.innerWidth <= 720) {
                setItemsToShow(1);
            } else if (window.innerWidth <= 1080 && window.innerWidth > 720 ){
                setItemsToShow(2);
            } else {
                setItemsToShow(3);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /**
     *  Initialize a map of favorite items based on local storage data.
     */
    useEffect(() => {
        const favoritesMap = {};
        combinedData.forEach((item, index) => {
            const isFavorite = localStorage.getItem(index) === 'IsFavorite';
            favoritesMap[index] = isFavorite;
        });
    }, []);

    /**
    * Handles moving to the previous item in the carousel.
    */
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + dataLength) % dataLength);
    };

    /**
     * Handles moving to the next item in the carousel.
     */
    const handleNext = () => {

        setCurrentIndex((prevIndex) => (prevIndex + 1) % dataLength);

    };

    const renderDots = () => {
        // total number of dots needed
        const dots = Math.ceil(dataLength / itemsToShow);

        // an array of dots
        return Array.from({ length: dots }, (_, index) => (
            <div
                key={index}
                className={`carousel-dot ${index === Math.floor(currentIndex / itemsToShow) ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index * itemsToShow)}
            />
        ));
    };

    /**
     * Handles the click event for playing or pausing audio at the specified index.
     */
    const handleClickAudio = (index) => {
        const audioRef = audioRefs[index]?.current;

        if (!audioRef) {
            console.log("Audio reference is null");
            return;
        }

        const handleAudioEnd = () => {
            audioRef.pause();
            setCurrentPlayingIndex(null);
            audioRef.removeEventListener('ended', handleAudioEnd);
            // Update icon to play when audio ends
            setPlayIcon(true);
        };

        if (currentPlayingIndex !== null) {
            const currentAudioRef = audioRefs[currentPlayingIndex]?.current;
            if (currentAudioRef === audioRef) {
                if (audioRef.paused) {
                    audioRef.play();
                    audioRef.addEventListener('ended', handleAudioEnd);
                    // Update icon to pause when audio plays
                    setPlayIcon(false);
                } else {
                    audioRef.pause();
                    setCurrentPlayingIndex(null);
                    // Update icon to play when audio pauses
                    setPlayIcon(true);
                }
            } else {
                if (currentAudioRef) {
                    currentAudioRef.pause();
                }
                audioRef.play();
                setCurrentPlayingIndex(index);
                audioRef.addEventListener('ended', handleAudioEnd);
                // Update icon to pause when new audio plays
                setPlayIcon(false);
            }
        } else {
            audioRef.play();
            setCurrentPlayingIndex(index);
            audioRef.addEventListener('ended', handleAudioEnd);
            // Update icon to pause when audio plays
            setPlayIcon(false);
        }
    };
    const setPlayIcon = (index) => {
        return currentPlayingIndex === index ? stopIcon : playIcon;
    };

    /**
     * Handles  removing from the indexedDB
     */
    const handleRemoveFromIndexedDB = async (itemToRemove, shiftedIndex) => {
        const userConfirmed = window.confirm("Would you like to delete the item?");

        if (userConfirmed) {
            try {
                deleteState(itemToRemove.id);
                handleRemoveFromFavorites(shiftedIndex);
                const updatedData = combinedData.filter((item) => item.id !== itemToRemove.id);
                setCombinedData(updatedData);
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        } else {
            // User clicked "No," do nothing
        }
    };
    /**
     * Handle adding to the favourites to the local storage
     */
    const handleAddToFavourites = (shiftedIndex) => {
        localStorage.setItem(shiftedIndex, 'IsFavorite');
    };
    /**
     * Handle removing from the favourites to the local storage
     */
    const handleRemoveFromFavorites = (shiftedIndex) => {
        localStorage.setItem(shiftedIndex, 'IsNotFavorite');
    };

    /**
     * Toggle the expansion state of an image
     */
    const toggleExpansion = (imageSrc) => {
        if (expandedImage === imageSrc) {
            setExpandedImage(null);
        } else {
            setExpandedImage(imageSrc);
        }
    };

    return (
        <section className="carousel">
            <h2 className="participants-heading">Participants from all countries</h2>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    {Array.from({length: itemsToShow}).map((_, index) => {
                        const shiftedIndex = (index + currentIndex) % dataLength;

                        if (isNaN(shiftedIndex)) return null;

                        const item = combinedData[shiftedIndex];
                        const isFavorite = localStorage.getItem(shiftedIndex) === 'IsFavorite';

                        const handleClickHeart = () => {
                            setAnimationInProgress(shiftedIndex);

                            if (isFavorite) {
                                handleRemoveFromFavorites(shiftedIndex);
                            } else {
                                handleAddToFavourites(shiftedIndex);
                            }

                            setTimeout(() => {
                                setAnimationInProgress(null);
                            }, 500);
                        };

                        return (
                            <article key={shiftedIndex} className="carousel-item">
                                <div className="local-delete-container">
                                    {!isOnline && <svg width="28" height="25" viewBox="0 0 28 25" fill="none"
                                                       xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_139_2)">
                                            <path
                                                d="M6.74428 -0.0108102C4.50101 0.177133 2.50063 1.4031 1.1861 3.40108C0.0344562 5.1475 -0.30275 7.46642 0.288789 9.55982C0.477396 10.2248 0.823175 10.9766 1.22039 11.5809C1.4833 11.9799 1.80622 12.3327 3.4551 14.0271C5.12684 15.7417 14.24 24.9711 14.2628 24.9711C14.2714 24.9711 14.8029 24.4247 15.4431 23.7567C16.0832 23.0888 16.6176 22.5423 16.6318 22.5423C16.6461 22.5423 16.7976 22.6349 16.9662 22.7476C17.4177 23.0483 18.1064 23.3808 18.6608 23.5659C19.4295 23.8232 19.901 23.9013 20.6726 23.9013C21.427 23.9013 22.0243 23.8261 22.5987 23.6555C23.6703 23.3433 24.5762 22.7968 25.4106 21.9583C26.428 20.9347 27.0109 19.8504 27.291 18.4683C27.4082 17.8785 27.4167 16.5513 27.3053 15.9614C27.1367 15.0564 26.7366 14.0965 26.1651 13.2175L25.865 12.7548L25.9279 12.645C25.9622 12.5843 26.1365 12.3472 26.3137 12.1245C26.8881 11.3959 27.2567 10.78 27.531 10.0861C27.9111 9.12899 28.0311 8.35987 27.9968 7.1021C27.9768 6.3937 27.934 6.08143 27.7939 5.56965C27.2224 3.46758 25.7764 1.72116 23.7818 0.714938C23.0016 0.321704 22.2672 0.107738 21.3927 0.0181041C20.9584 -0.0281587 19.8639 -0.00502731 19.4752 0.0585841C18.7951 0.168458 18.1721 0.376641 17.4691 0.723613C16.6004 1.15733 16.1718 1.5043 14.7801 2.89218L13.9999 3.67287L13.8656 3.54276C13.7913 3.47047 13.4255 3.10904 13.0512 2.74183C11.6195 1.3337 10.8822 0.813247 9.70198 0.385316C8.86182 0.0788241 7.62445 -0.0859873 6.74428 -0.0108102ZM8.30172 0.842161C9.49623 1.0301 10.6336 1.55634 11.5823 2.36016C11.8138 2.55678 13.5684 4.36681 13.8856 4.73692L13.9799 4.84679L15.083 3.75094C16.7719 2.07969 17.0148 1.87729 17.8035 1.49562C18.3979 1.20937 19.0666 1.01276 19.8039 0.911555C20.1554 0.862401 21.167 0.862401 21.5185 0.911555C22.4958 1.04745 23.396 1.36262 24.1047 1.82236C24.8277 2.29077 25.6964 3.14952 26.1851 3.88684C26.3994 4.20778 26.7452 4.91908 26.8766 5.30653C27.0024 5.67663 27.1024 6.07275 27.1624 6.43707C27.2253 6.81007 27.251 7.73243 27.2081 8.14591C27.0595 9.59451 26.4537 10.9477 25.4564 12.0609L25.3278 12.2026L25.1449 12.0436C24.6105 11.5723 23.6875 11.0142 23.0502 10.7771C22.8416 10.699 22.1586 10.5169 21.9586 10.4851C21.8785 10.4735 21.5699 10.4533 21.2727 10.4417C19.8753 10.3925 18.8265 10.6094 17.7206 11.179C15.8603 12.139 14.52 13.9606 14.18 15.9932C14.0942 16.4935 14.0485 17.1758 14.0685 17.6124C14.0885 18.0115 14.1542 18.4307 14.2171 18.5522C14.2371 18.5926 14.2714 18.6881 14.2971 18.769C14.4114 19.1478 14.6515 19.7608 14.8315 20.128C15.0687 20.6166 15.3173 20.9983 15.7174 21.487C15.8831 21.6894 16.0289 21.8773 16.0432 21.9062C16.0603 21.9467 16.0489 21.9843 15.9889 22.0566C15.8917 22.1751 15.0373 23.1033 14.5972 23.5688L14.2685 23.9158L12.7597 22.3978C10.425 20.0441 4.1095 13.5673 2.5435 11.9163C2.19772 11.5491 2.02054 11.3352 1.84908 11.0778C1.31755 10.2653 0.960344 9.28513 0.826033 8.25867C0.774595 7.85677 0.78031 6.98645 0.840321 6.56719C1.0918 4.79474 1.8948 3.33457 3.22077 2.23872C3.68085 1.85994 4.3667 1.45804 4.96681 1.22094C5.4669 1.02432 6.14703 0.856618 6.70142 0.79879C7.05291 0.764093 7.95308 0.787224 8.30172 0.842161ZM21.1384 11.179C22.1272 11.2687 23.1645 11.6388 24.0189 12.2113C25.1849 12.9919 25.9222 13.9374 26.3194 15.1663C26.6452 16.1725 26.6937 17.5257 26.4365 18.5406C26.0165 20.2003 24.8791 21.6373 23.3817 22.3949C22.5244 22.8286 21.7614 23.0079 20.7755 23.0079C19.5095 23.0079 18.5322 22.7071 17.492 21.993C16.569 21.3597 15.9774 20.7005 15.5288 19.7984C15.243 19.2201 15.0658 18.6563 14.9572 17.9883C14.8772 17.5026 14.8858 16.6323 14.9715 16.1378C15.2459 14.5678 16.0117 13.2984 17.2605 12.3356C18.3465 11.5029 19.821 11.0605 21.1384 11.179Z"
                                                fill="#613A6B" stroke="#613A6B" strokeWidth="0.3"/>
                                            <path
                                                d="M20.2895 15.3427V16.7595H18.9464H17.6004L17.609 17.1412L17.6176 17.5257L18.9521 17.5344L20.2895 17.5402L20.2952 18.8645L20.3038 20.1858L20.7124 20.1945L21.1182 20.2032V18.8702V17.5402H22.4613H23.8045V17.1498V16.7595H22.4613H21.1182V15.3427V13.9259H20.7039H20.2895V15.3427Z"
                                                fill="#613A6B" stroke="#613A6B"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_139_2">
                                                <rect width="28" height="25" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>}
                                    {isOnline && <img
                                        src={isFavorite ? deleteFavouriteIcon : addFavouriteIcon}
                                        className={`close__image heart ${animationInProgress === shiftedIndex ? 'animate' : ''}`}
                                        onClick={handleClickHeart}
                                        alt={isFavorite ? 'delete favorite icon' : 'add favorite icon'}
                                    />}

                                    <p className="country" title={item?.country}>{item?.country}</p>
                                    {isOnline && !data.includes(item) &&
                                        <>
                                            <img src={cross} className=" close__image"
                                                 onClick={() => handleRemoveFromIndexedDB(item, shiftedIndex)}
                                                 alt="close icon"/>
                                        </>
                                    }
                                </div>
                                {isOnline && <img
                                    className="image_country"
                                    src={item?.image}
                                    alt={item?.country}
                                    onClick={() => toggleExpansion(item?.image)}
                                />}
                                {!isOnline &&
                                    <div className="image_offline">
                                    </div>
                                }
                                <div className="play-container">
                                    {isOnline && <img
                                        className="play"
                                        src={setPlayIcon(shiftedIndex)}
                                        alt="play button"
                                        onClick={() => handleClickAudio(shiftedIndex)}
                                        style={{cursor: 'pointer'}}
                                    />}
                                    {isOnline &&
                                        <audio ref={audioRefs[shiftedIndex]} src={item?.audio}/>
                                    }

                                    <p className="song">{item?.song}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <svg onMouseEnter={() => rewriteSvgPrev(setSvgPrevPath, setSvgPrevFill)} onMouseLeave={() => resetSvgPrev(setSvgPrevPath, setSvgPrevFill)} onClick={handlePrev}
                     className="carousel-btn prev" id="prev_button" width="52" height="52" viewBox="0 0 60 60"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={svgPrevPath}
                        fill={svgPrevFill}
                    />
                </svg>

                <svg onMouseEnter={() => rewriteSvgNext(setSvgNextPath, setSvgNextFill)} onMouseLeave={() => resetSvgNext(setSvgNextPath, setSvgNextFill)} onClick={handleNext}
                     className="carousel-btn next" id="next_button" width="52" height="52" viewBox="0 0 60 60"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d={svgNextPath}
                        fill={svgNextFill}
                    />
                </svg>
            </div>
            <nav className="carousel-dots">{renderDots()}</nav>
            {
                expandedImage && (
                    <div className="overlay" onClick={() => setExpandedImage(null)}>
                        <img
                            className="expanded-image"
                            src={expandedImage}
                            alt="Expanded"
                            onLoad={(e) => {
                                const img = e.target;
                                if (img.width > 400 || img.height > 400) {
                                    img.style.width = '400px';
                                    img.style.height = '400px';
                                }
                            }}
                        />
                    </div>
                )
            }
        </section>
    );
};

export default Carousel;

