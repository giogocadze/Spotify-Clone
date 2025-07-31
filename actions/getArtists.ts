import { Artist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getArtists = async (): Promise<Artist[]> => {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase
        .from("artist")  // plural table name
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Supabase error:", error.message);
        return [];
    }

    return data ?? [];
};

export default getArtists;
