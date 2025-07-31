import { FaPlay } from "react-icons/fa6";
import styles from "./PlayButton.module.css";

interface PlayButtonProps {
    onClick?: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className={styles.playbutton}>
            <FaPlay className={styles.playicon} />
        </button>
    );
};

export default PlayButton;
