"use client "

import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import useArtistModal from '@/hooks/useArtistModal copy'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import styles from "./ArtistModal.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import toast from 'react-hot-toast'
import uniqid from "uniqid"

const ArtistModal = () => {
    const artistModal = useArtistModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            description: "",
            followers: 0,
            picture: null,
            facebook: "",
            instagram: "",
            linkedin: "",
            twitter: "",
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            artistModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setisLoading(true);

            const pictureFile = values?.picture?.[0];

            if (!pictureFile || !user || errors.author) {
                toast.error("Required fields are missing");
                setisLoading(false);
                return;
            }

            const uniqueId = uniqid();

            // Upload image to Supabase storage
            const { data: imageData, error: imageError } = await supabaseClient.storage
                .from("images")
                .upload(`artist-image-${uniqueId}`, pictureFile, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (imageError) {
                console.error("Image upload error:", imageError);
                setisLoading(false);
                return toast.error("Failed to upload image");
            }

            // ✅ Validate imageData.path
            if (!imageData || !imageData.path) {
                toast.error("Image upload failed: no path returned");
                console.error("No image path returned from Supabase:", imageData);
                setisLoading(false);
                return;
            }

            const imagePath = imageData.path;
            console.log("✅ Uploaded image path:", imagePath);

            // Insert artist record into Supabase
            const { error: supabaseError } = await supabaseClient.from("artist").insert({
                author: values.author,
                description: values.description,
                followers: 0,
                picture: imagePath,
                facebook: values.facebook,
                instagram: values.instagram,
                linkedin: values.linkedin,
                twitter: values.twitter,
            });

            if (supabaseError) {
                console.error("Database insert error:", supabaseError);
                setisLoading(false);
                return toast.error("Failed to upload artist data");
            }

            toast.success("🎉 Artist created successfully");
            reset();
            artistModal.onClose();
            router.refresh();
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("Something went wrong");
        } finally {
            setisLoading(false);
        }
    };

    return (
        <Modal title="Add New Artist" description="Create Your Own Artits" isOpen={artistModal.isOpen}
            onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                {errors?.author && <div className={styles.author}>
                    <p>*Author Name Is Required</p>
                </div>}
                <Input
                    id='author'
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder='Artist Name'
                />
                <Input
                    id='description'
                    disabled={isLoading}
                    {...register("description")}
                    placeholder='Artist Description'
                />
                <div>

                    {errors?.picture && <div className={styles.author}>
                        <p>*Author picture Is Required</p>
                    </div>}
                    <div>Select An Image File</div>
                    <Input
                        id='picture'
                        disabled={isLoading}
                        accept='image/*'
                        type='file'
                        {...register("picture", { required: true })}
                        placeholder='Artist picture here'
                    />
                </div>

                <Input
                    id='facebook'
                    disabled={isLoading}
                    {...register("facebook")}
                    placeholder='https://www.facebook.com'
                />
                <Input
                    id='instagram'
                    disabled={isLoading}
                    {...register("instagram")}
                    placeholder='https://www.instagram.com'
                />
                <Input
                    id='linkedin'
                    disabled={isLoading}
                    {...register("linkedin")}
                    placeholder='https://www.linkedin.com'
                />
                <Input
                    id='twitter'
                    disabled={isLoading}
                    {...register("twitter")}
                    placeholder='https://www.twitter.com'
                />
                <Button type='submit' className={styles.button} disabled={isLoading} >
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default ArtistModal
