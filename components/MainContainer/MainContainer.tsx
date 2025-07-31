"use client";
import React, { useMemo } from "react";
import styles from "./MainContainer.module.css";
import {
  FaHeart,
  FaHome,
  FaSearch,
  FaSpotify,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import Box from "../Box/Box";
import { usePathname, useRouter } from "next/navigation";
import SideBarItem from "../SideBarItem/SideBarItem";
import RightBar from "../RightBar/RightBar";
import Button from "../Button/Button";
import Link from "next/link";
import { BsMusicNoteList } from "react-icons/bs";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { GiImperialCrown } from "react-icons/gi";
import { IoIosPersonAdd } from "react-icons/io";
import { TbMusicPlus } from "react-icons/tb";
import useArtistModal from "@/hooks/useArtistModal copy";
import useSongModal from "@/hooks/useSongModal copy 2";
import usePlayer from "@/hooks/usePlayer";


interface MainContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  const pathName = usePathname();
  const authModal = useAuthModal();
  const artistModal = useArtistModal();
  const songModal = useSongModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const player = usePlayer();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) console.log(error);
  };

  const routes = useMemo(
    () => [
      {
        icon: FaHome,
        label: "Home",
        active: pathName === "/",
        href: "/",
      },
      {
        icon: FaSearch,
        label: "Search",
        active: pathName === "/search",
        href: "/search",
      },
      {
        icon: FaHeart,
        label: "Favourites",
        active: pathName === "/favourites",
        href: "/favourites",
      },
      {
        icon: BsMusicNoteList,
        label: "Playlists",
        active: pathName === "/playlists",
        href: "/playlists",
      },
    ],
    [pathName]
  );

  return (
    <div
      className={`${styles.maincontainer} ${
        player.activeId ? styles.maincontainerWithPlayer : ""
      }`}
    >
      {/* Left Sidebar */}
      <div className={styles.leftnavbar}>
        <div className={styles.navbar}>
          <FaSpotify className={styles.icon} />
          <p className={styles.myclass}>Spotify</p>
        </div>

        <div className={styles.customcontainer}>
          <Box>
            <div className={styles.contentwrapper}>
              {routes.map((item) => (
                <SideBarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>

        <div className={styles.custombox}>
          <Box>
            <div className={styles.customcontainerbox}>
              {routes.map((item) => (
                <SideBarItem key={item.label} {...item} />
              ))}
            </div>
          </Box>
        </div>
      </div>

      {/* Main Content */}
      <main className={styles.maincontent}>{children}</main>

      {/* Right Sidebar */}
      <RightBar>
        {user ? (
          <div className={styles.circle}>
            <Image
              src={user?.user_metadata?.avatar_url || "/img/user.png"}
              alt="User Avatar"
              fill
              className={styles.avatar}
            />
          </div>
        ) : (
          <Button onClick={authModal.onOpen} className={styles.user}>
            <FaUser size={20} />
          </Button>
        )}

        {/* Admin Buttons */}
        <Link href={"/artists"} className={styles.linkbutton}>
          <FaUsers size={20} className={styles.users} />
        </Link>

        <Link href={"/songs"} className={styles.linkbutton}>
          <BsMusicNoteList size={20} className={styles.users} />
        </Link>

        {user?.id === process.env.NEXT_PUBLIC_SUPER_ADMIN_ID && (
          <>
            <Button className={styles.transparent} onClick={artistModal.onOpen}>
              <IoIosPersonAdd size={20} className={styles.personadd} />
            </Button>
            <Button className={styles.transparent} onClick={songModal.onOpen}>
              <TbMusicPlus size={20} className={styles.personadd} />
            </Button>
          </>
        )}

        <div className={styles.premium}>
          <GiImperialCrown size={24} className={styles.crown} />
          <p className={styles.paraghrap}>Go Pro</p>
        </div>

        {user && (
          <Button className={styles.logout} onClick={handleLogout}>
            <CiLogout size={25} className={styles.users} />
          </Button>
        )}
      </RightBar>
    </div>
  );
};

export default MainContainer;
