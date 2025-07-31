"use client"

import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import useSongModal from '@/hooks/useSongModal copy 2'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import styles from "./Songmodal.module.css"
import Input from '../Input/Input'
import Button from '../Button/Button'
import getArtists from '@/actions/getArtists'
import useGetArtistsOnClientSide from '@/hooks/useGetArtistsOnClientSide'
import { useUser } from '@/hooks/useUser'
import { PuffLoader } from 'react-spinners'
import ModalArtistItem from '../ModalArtistItem/ModalArtistItem'
import toast from 'react-hot-toast'
import uniqid from "uniqid"
const songModal = () => {
    const songModal = useSongModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { user } = useUser()




    const [isLoading, setIsLoading] = useState(false);
    const { artists, isLoading: artistLoading } = useGetArtistsOnClientSide();

    const [selecArtistId, setSelectArtistID] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            song_uri: null,
            image_uri: null,
            user_id: "",
            artist_id: "",
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            songModal.onClose()
        }
    }


    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)
            const pictureFile = values?.image_uri?.[0]
            const songFile = values.song_uri?.[0]

            if (!pictureFile || !songFile || !user || !selecArtistId) {
                toast.error("required field is missing")
                return;
            }
            const uniqueId = uniqid();

            // upload the image to the storage //
            const { data: imageData, error: imageError } = await supabaseClient.storage.from("images").upload(`song-cover-image-${uniqueId}`, pictureFile,
                { cacheControl: "3600", upsert: false }
            )
            if (imageError) {
                console.log(imageError);
                setIsLoading(false)
                toast.error("failed to upload the image")
            }

            const { data: songData, error: songError } = await supabaseClient.storage.from("songs").upload(`song-audi-file-${uniqueId}`, songFile,
                { cacheControl: "3600", upsert: false }
            )
            if (songError) {
                console.log(songError);
                setIsLoading(false)
                toast.error("failed to upload the audio file ")
            }

            // save the song to the database //
            const { error: supabaseError } = await supabaseClient.
                from("songs").insert({
                    title: values?.title,
                    song_uri: songData?.path,
                    image_uri: imageData?.path,
                    user_id: user?.id,
                    artist_id: selecArtistId,
                })
            if (supabaseError) {
                console.log(supabaseError);
                setIsLoading(false)
                toast.error("failed to upload the song data")
            }
            setIsLoading(false);
            toast.success("Added A New Song")
            reset();
            songModal.onClose
            router.refresh();



        } catch (error) {
            toast.error("something went wrong:", error as any)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectedArtist = (artistId: string) => {
        setSelectArtistID((prevId) => (prevId === artistId ? null : artistId))
    }
    return (
        <Modal title='Add a New Song'
            description='Create Your Own Song'
            isOpen={songModal.isOpen}
            onChange={onChange}>
            {errors?.title && <div className={styles.image}>
                <p>*Song Name Is Required</p>
            </div>}
            <form onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder='Song Name'
                />
                {errors?.image_uri && <div className={styles.image}>
                    <p>Song Image  Is Required</p>
                </div>}

                <div>
                    <div >
                        Select A Image File
                    </div>
                    <Input
                        id='image_uri'
                        type='file'
                        disabled={isLoading}
                        accept='image/*'
                        {...register("image_uri", { required: true })}
                        placeholder='Song cover image'
                    />
                </div>

                {errors?.song_uri && <div className={styles.image}>
                    <p>Song audio is Required</p>
                </div>}

                <div>
                    <div >
                        Select A Audio File
                    </div>
                    <Input
                        id='song_uri'
                        type='file'
                        disabled={isLoading}
                        accept='audio/*'
                        {...register("song_uri", { required: true })}
                        placeholder='Song Audio'
                    />
                </div>
                <div>Choose an Artist</div>
                <div className={styles.aritst} >
                    {artistLoading ?
                        <React.Fragment>
                            <div className={styles.loader} >
                                <PuffLoader
                                    size={35} color='#10B981' />
                            </div>
                        </React.Fragment> : (
                            <React.Fragment>
                                {artists.map(item => (
                                    <ModalArtistItem
                                        key={item.id}
                                        data={item}
                                        onClick={() => handleSelectedArtist(item.id)}
                                        selected={selecArtistId === item.id}
                                    />
                                ))}
                            </React.Fragment>
                        )}
                </div>
                <Button disabled={isLoading} type="submit" className={styles.button} >
                    Create
                </Button>
            </form>
        </Modal>
    )
}

export default songModal
