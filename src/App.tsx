import "./App.css";
import { createSignal, Show, For } from "solid-js";

interface Playlist {
  id: string;
  name: string;
  description: string;
  type: 'playlist' | 'album' | 'artist';
}

function App() {
  const [currentView, setCurrentView] = createSignal<'browse' | 'player'>('browse');
  const [selectedItem, setSelectedItem] = createSignal<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = createSignal("");

  // Featured playlists - these are real Spotify playlist IDs
  const featuredPlaylists: Playlist[] = [
    { id: "37i9dQZF1DXcBWIGoYBM5M", name: "Hot Hits USA", description: "The hottest tracks in the United States", type: 'playlist' },
    { id: "37i9dQZF1DX0XUsuxWHRQd", name: "RapCaviar", description: "New music from Lil Baby, Travis Scott and more", type: 'playlist' },
    { id: "37i9dQZF1DX4dyzvuaRJ0n", name: "mint", description: "The best new music", type: 'playlist' },
    { id: "37i9dQZF1DX4JAvHpjipBk", name: "New Music Friday", description: "The best new music", type: 'playlist' },
    { id: "37i9dQZF1DX1lVhptIYRda", name: "Hot Country", description: "Today's top country hits", type: 'playlist' },
    { id: "37i9dQZF1DX4SBhb3fqCJd", name: "Are & Be", description: "R&B vibes", type: 'playlist' },
    { id: "37i9dQZF1DWXRqgorJj26U", name: "Rock Classics", description: "Rock legends & epic songs", type: 'playlist' },
    { id: "37i9dQZF1DX4UtSsGT1Sbe", name: "All Out 2010s", description: "The biggest songs of the 2010s", type: 'playlist' },
  ];

  const genres = [
    "Pop", "Hip-Hop", "Rock", "Country", "R&B", "Electronic", "Jazz", "Classical"
  ];

  const playItem = (item: Playlist) => {
    setSelectedItem(item);
    setCurrentView('player');
  };

  const goBack = () => {
    setCurrentView('browse');
    setSelectedItem(null);
  };

  return (
    <div class="app">
      {/* Sidebar */}
      <aside class="sidebar">
        <div class="logo">
          <svg viewBox="0 0 1134 340" class="spotify-logo">
            <path fill="currentColor" d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z" />
          </svg>
        </div>

        <nav class="nav">
          <button
            class={`nav-item ${currentView() === 'browse' ? 'active' : ''}`}
            onClick={goBack}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Browse
          </button>

          <button class="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            Search
          </button>
        </nav>

        <div class="genres">
          <h3>Genres</h3>
          <For each={genres}>
            {(genre) => (
              <button class="genre-item">{genre}</button>
            )}
          </For>
        </div>
      </aside>

      {/* Main Content */}
      <main class="main-content">
        <Show when={currentView() === 'browse'}>
          <div class="browse-header">
            <h1>Featured Playlists</h1>
            <p>Discover the hottest playlists</p>
          </div>

          <div class="playlist-grid">
            <For each={featuredPlaylists}>
              {(playlist) => (
                <div class="playlist-card" onClick={() => playItem(playlist)}>
                  <div class="playlist-cover">
                    <div class="play-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <h3>{playlist.name}</h3>
                  <p>{playlist.description}</p>
                </div>
              )}
            </For>
          </div>
        </Show>

        <Show when={currentView() === 'player' && selectedItem()}>
          <div class="player-view">
            <button class="back-button" onClick={goBack}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to Browse
            </button>

            <div class="now-playing">
              <h2>{selectedItem()?.name}</h2>
              <p>{selectedItem()?.description}</p>
            </div>

            <iframe
              src={`https://open.spotify.com/embed/${selectedItem()?.type}/${selectedItem()?.id}?utm_source=generator&theme=0`}
              class="spotify-embed"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Show>
      </main>
    </div>
  );
}

export default App;
