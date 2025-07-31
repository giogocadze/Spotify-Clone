import { Artist } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const useGetArtistsClientSide = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        const fetchArtists = async () => {
            setIsLoading(true);
            const { data, error } = await supabaseClient.from("artist").select("*");

            if (error) {
                toast.error("Failed to fetch artists");
            } else {
                setArtists(data || []);
            }

            setIsLoading(false);
        };

        fetchArtists(); 
    }, [supabaseClient]);

    return useMemo(() => ({ isLoading, artists }), [isLoading, artists]);
};

export default useGetArtistsClientSide;
