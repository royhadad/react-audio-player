import {FC, useCallback, useEffect, useRef, useState} from 'react';
import styles from './styles'
import axios from "axios";
import Song from "../../../types/Song";

type Props = {};

const AudioPlayer: FC<Props> = (props: Props) => {
    const classes = styles();
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audio = useRef(new Audio(''));

    const fetchSongs = useCallback(async () => {
        setIsLoading(true);
        const response = await axios.get('/api/songs');
        const songs = response.data?.songs;
        setSongs(songs);
        setIsLoading(false);
    }, []);

    const goToNextSong = () => {
        setCurrentSongIndex((currentSongIndex) => {
            if (currentSongIndex === songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1
            }
        })
    }
    const goToPreviousSong = () => {
        setCurrentSongIndex((currentSongIndex) => {
            if (currentSongIndex === 0) {
                return songs.length - 1;
            } else {
                return currentSongIndex - 1
            }
        })
    }

    useEffect(() => {
        fetchSongs();
    }, [fetchSongs])

    useEffect(() => {
        audio.current.src = songs[currentSongIndex]?.url;
        if (isPlaying) {
            audio.current.play().then(r => {
                console.log('r', r)
            });
        }
    }, [currentSongIndex, songs])

    useEffect(() => {
        if (isPlaying) {
            audio.current.play().then(r => {
                console.log('r', r)
            });
        } else {
            audio.current.pause();
        }

    }, [isPlaying])

    return (
        <div>
            Im an audio player!
            {isLoading ? (
                <div>loading...</div>
            ) : (
                <div>
                    {(() => {
                        const currentSong = songs[currentSongIndex];
                        if (!currentSong) {
                            console.error('invalid song!')
                            return null;
                        }

                        return (
                            <div>
                                <h3>{currentSong.title}</h3>
                                <h4>{currentSong.artist}</h4>
                                <img src={currentSong.coverArt} alt='cover art'/>
                                <div>
                                    <button onClick={goToPreviousSong}>previous</button>
                                    {isPlaying ? (
                                        <button onClick={() => {
                                            setIsPlaying(false);
                                        }}>stop</button>
                                    ) : (
                                        <button onClick={() => {
                                            setIsPlaying(true);
                                        }}>play</button>
                                    )}
                                    <button onClick={goToNextSong}>next</button>
                                </div>

                            </div>
                        )
                    })()}
                </div>
            )}
            {songs.map((song) => (
                <div key={song.title}>
                    {JSON.stringify(song)}
                </div>
            ))}
        </div>
    )
}

export default AudioPlayer;