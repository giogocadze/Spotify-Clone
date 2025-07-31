"use client";
import { Song } from "@/types";
import React, { useEffect, useState, useRef } from "react";
import styles from "./PlayerContent.module.css";
import MediaItem from "../MediaItem/MediaItem";
import usePlayer from "@/hooks/usePlayer";
import useGetArtistsClientSide from "@/hooks/useGetArtistsOnClientSide";
import { PuffLoader } from "react-spinners";
import { FaPlay } from "react-icons/fa";
import { FaBackwardStep, FaForwardStep, FaPause } from "react-icons/fa6";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import VolumeSlider from "../VolumeSlider/VolumeSlider";
import SeekSlider from "../SeekSlider/SeekSlider";
import { Howl } from "howler";

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer();
    const { artists, isLoading: artistLoading } = useGetArtistsClientSide();

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const soundRef = useRef<Howl | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const Icon = isPlaying ? FaPause : FaPlay;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const OnPlayNext = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) return player.setId(player.ids[0]);

        player.setId(nextSong);
    };

    const OnPlayPrevius = () => {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) return player.setId(player.ids[player.ids.length - 1]);

        player.setId(previousSong);
    };

    const loadSound = (url: string) => {
        if (soundRef.current) {
            soundRef.current.stop();
            soundRef.current.unload();
            soundRef.current = null;
        }

        const sound = new Howl({
            src: [url],
            volume,
            html5: true,
            format: ["mp3"],
            onplay: () => {
                setIsPlaying(true);
                setDuration(sound.duration());
            },
            onpause: () => setIsPlaying(false),
            onend: () => {
                setIsPlaying(false);
                OnPlayNext();
            },
        });

        soundRef.current = sound;
        sound.play();

        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (sound.playing()) {
                setCurrentTime(sound.seek() as number);
            }
        }, 500);
    };

    useEffect(() => {
        if (songUrl) {
            setCurrentTime(0);
            setDuration(0);
            loadSound(songUrl);
        }

        return () => {
            if (soundRef.current) {
                soundRef.current.stop();
                soundRef.current.unload();
                soundRef.current = null;
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [songUrl]);


    const handlePlayPause = () => {
        if (!soundRef.current) return;

        if (soundRef.current.playing()) {
            soundRef.current.pause();
        } else {
            soundRef.current.play();
        }
    };

    useEffect(() => {
        if (soundRef.current) {
            soundRef.current.volume(volume);
        }
    }, [volume]);

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            setVolume(0);
        }
    };
    if (artistLoading)
        return (
            <div className={styles.loader}>
                <PuffLoader color="#10B981" size={40} />
            </div>
        );

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <MediaItem
                    className={styles.transparentAuto}
                    onClick={() => { }}
                    artist={artists.filter((artist) => artist.id === song.artist_id)[0]}
                    data={song}
                />
            </div>
            {/* mobile version */}
            <div className={`${styles.container} ${styles.mobileOnly}`}>
                <div onClick={handlePlayPause} className={styles.iconWrapper}>
                    <Icon size={20} style={{ color: "black" }} />
                </div>
            </div>

            {/* desktop controls */}
            <div className={styles.wrapperr}>
                <div className={styles.playerr}>
                    <FaBackwardStep
                        size={20}
                        onClick={OnPlayPrevius}
                        className={styles.icon}
                    />
                    <div onClick={handlePlayPause} className={styles.iconWrapper}>
                        <Icon size={20} style={{ color: "black" }} />
                    </div>
                    <FaForwardStep
                        size={20}
                        onClick={OnPlayNext}
                        className={styles.icon}
                    />
                </div>
                <div className={styles.seekload}>
                    <div className={styles.timer}>
                        <SeekSlider
                            duration={duration}
                            currentTime={currentTime}
                            onChange={(value) => {
                                if (soundRef.current) {
                                    soundRef.current.seek(value);
                                    setCurrentTime(value);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.volumeContainer}>
                <div className={styles.volumeInner}>
                    <VolumeIcon size={25} onClick={toggleMute} className={styles.icon} />
                    <VolumeSlider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    );
};

export default PlayerContent;
