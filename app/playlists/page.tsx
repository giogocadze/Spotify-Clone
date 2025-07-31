import PlaylistsClient from './PlaylistsClient';
import { getUserPlaylists } from '../../actions/playlist';

export default async function PlaylistsPage() {
  const playlists = await getUserPlaylists();


  return <PlaylistsClient playlists={playlists} />;
}

