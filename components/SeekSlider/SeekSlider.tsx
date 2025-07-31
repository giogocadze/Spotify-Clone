"use client"

import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'
import styles from "./SeekSlider.module.css"

interface SeekSliderProps {
    duration: number;
    currentTime: number;
    onChange: (value: number) => void;
}

const SeekSlider: React.FC<SeekSliderProps> = ({ duration, currentTime, onChange }) => {
    const handleChange = (value: number[]) => {
        onChange(value[0]);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className={styles.seekContainer}>
            <div className={styles.sliderWrapper}>
                <RadixSlider.Root
                    className={styles.seekSlider}
                    min={0}
                    max={duration}
                    step={1}
                    value={[currentTime]}
                    onValueChange={handleChange}
                    aria-label="Seek"
                >
                    <RadixSlider.Track className={styles.seekTrack}>
                        <RadixSlider.Range className={styles.seekRange} />
                    </RadixSlider.Track>
                    <RadixSlider.Thumb className={styles.seekThumb} />
                </RadixSlider.Root>
            </div>
            <div className={styles.timeLabels}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 0)}</span>
            </div>
        </div>

    );
}

export default SeekSlider;
