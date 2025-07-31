"use client"

import * as RadixSlider from '@radix-ui/react-slider'
import React from 'react'
import styles from "./VolumeSlider.module.css"

interface VolumeSliderProps {
    value?: number,
    onChange?: (value: number) => void
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({ value = 1, onChange }) => {
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    };

    return (
        <RadixSlider.Root
            className={styles.sliderRoot}
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track className={styles.sliderTrack}>
                <RadixSlider.Range className={styles.sliderRange} />
            </RadixSlider.Track>
        </RadixSlider.Root>

    )
}

export default VolumeSlider
