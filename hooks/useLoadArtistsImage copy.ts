import { Artist } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadArtistImage = (artist: Artist) => {
    const supabaseClient = useSupabaseClient();

    if (!artist?.picture) {
        console.log("No picture found for artist:", artist);
        return null;
    }

    const { data } = supabaseClient
        .storage
        .from("images")
        .getPublicUrl(artist.picture);

    console.log("Public URL generated:", data?.publicUrl); 

    return data?.publicUrl || null;
};

export default useLoadArtistImage;
