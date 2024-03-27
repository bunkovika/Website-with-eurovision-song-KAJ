import React, { useState,  useEffect } from 'react';
// assets
import prev from '../../assets/arrow_prev.svg';
import next from '../../assets/arrow_next.svg';
import playIcon from '../../assets/play.svg';
import stopIcon from '../../assets/stop.svg';
import addFavouriteIcon from '../../assets/add_to_favourites.svg';
import deleteFavouriteIcon from '../../assets/delete_from_favourites.svg';
import cross from "../../assets/close_button.svg";

import './Carousel.css';
import data from './CarouselData';
import { loadState, deleteState, subscribeToChanges, subscribers } from '../../indexedDB/IndexedDB';

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

    /**
     * Renders the dots for navigation in the carousel.
     */
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
        };

        if (currentPlayingIndex !== null) {
            const currentAudioRef = audioRefs[currentPlayingIndex]?.current;
            if (currentAudioRef === audioRef) {
                if (audioRef.paused) {
                    audioRef.play();
                    audioRef.addEventListener('ended', handleAudioEnd);
                } else {
                    audioRef.pause();
                    setCurrentPlayingIndex(null);
                }
            } else {
                if (currentAudioRef) {
                    currentAudioRef.pause();
                }
                audioRef.play();
                setCurrentPlayingIndex(index);
                audioRef.addEventListener('ended', handleAudioEnd);
            }
        } else {
            audioRef.play();
            setCurrentPlayingIndex(index);
            audioRef.addEventListener('ended', handleAudioEnd);
        }
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
                    {Array.from({ length: itemsToShow }).map((_, index) => {
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
                                    <img
                                        src={isFavorite ? deleteFavouriteIcon : addFavouriteIcon}
                                        className={`close__image heart ${animationInProgress === shiftedIndex ? 'animate' : ''}`}
                                        onClick={handleClickHeart}
                                        alt={isFavorite ? 'delete favorite icon' : 'add favorite icon'}
                                    />

                                    <p className="country" title={item?.country}>{item?.country}</p>
                                    {!data.includes(item) &&
                                        <>
                                            <img src={cross} className=" close__image"
                                                 onClick={() => handleRemoveFromIndexedDB(item, shiftedIndex)}
                                                 alt="close icon"/>
                                        </>
                                    }
                                </div>
                                <img
                                    className="image_country"
                                    src={item?.image}
                                    alt={item?.country}
                                    onClick={() => toggleExpansion(item?.image)}
                                />
                                <div className="play-container">
                                    <img
                                        className="play"
                                        src={currentPlayingIndex === shiftedIndex ? stopIcon : playIcon}
                                        alt="play button"
                                        onClick={() => handleClickAudio(shiftedIndex)}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <audio ref={audioRefs[shiftedIndex]} src={item?.audio}/>
                                    <p className="song">{item?.song}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
                <img
                    className="carousel-btn prev"
                    src={prev}
                    alt="Prev"
                    onClick={handlePrev}
                />
                <img
                    className="carousel-btn next"
                    src={next}
                    alt="Next"
                    onClick={handleNext}
                />
            </div>
            <nav className="carousel-dots">{renderDots()}</nav>
            {expandedImage && (
                <div className="overlay" onClick={() => setExpandedImage(null)}>
                    <img className="expanded-image" src={expandedImage} alt="Expanded" />
                </div>
            )}
        </section>
    );
};

export default Carousel;

