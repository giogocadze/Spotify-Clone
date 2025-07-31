
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import styles from './Modal.module.css';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    onClose?: () => void;  // add this optional prop
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    onClose,
    title,
    description,
    children,
}) => {
    // If onClose is passed, call it when dialog closes via onOpenChange
    const handleOpenChange = (open: boolean) => {
        onChange(open);
        if (!open && onClose) {
            onClose();
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.customoverlay} />
                <Dialog.Content className={styles.dialog}>
                    <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                    <Dialog.Description className={styles.description}>
                        {description}
                    </Dialog.Description>

                    <div>{children}</div>

                    <Dialog.Close asChild>
                        <button className={styles.button}>
                            <IoMdClose size={20} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal