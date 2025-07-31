
import { Artist } from "@/types";
import styles from "./ModalArtist.module.css"

interface ArtistModalItemProps {
    data: Artist;
    onClick: (id: string) => void;
    selected: boolean;
}

import React from 'react'
import Image from "next/image";
import useLoadArtistImage from "@/hooks/useLoadArtistsImage copy";

const ModalArtistItem: React.FC<ArtistModalItemProps> = ({ data, onClick, selected }) => {
    const imagePath = useLoadArtistImage(data)
    console.log("artist image path", imagePath);

    return (
        <div
            className={`${styles.artistBox} ${selected ? styles.artistBoxSelected : styles.artistBoxUnselected
                }`}
            onClick={() => onClick(data.id)}
        >
            <div className={styles.avatarBox}>
                <Image
                    alt={data.author}
                    src={imagePath || "/img/user.png"}
                    fill
                    className={styles.avatarImage}
                />
            </div>
            <p className={styles.paraghrap} >{data.author} </p>
        </div>

    )
}

export default ModalArtistItem
