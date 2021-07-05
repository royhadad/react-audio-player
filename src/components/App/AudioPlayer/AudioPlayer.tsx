import {FC, useCallback, useEffect, useRef, useState} from 'react';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
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

    const skipToNextSong = () => {
        setCurrentSongIndex((currentSongIndex) => {
            if (currentSongIndex === songs.length - 1) {
                return 0;
            } else {
                return currentSongIndex + 1
            }
        })
    }
    const skipToPreviousSong = () => {
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
        // eslint-disable-next-line
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

    if (isLoading) {
        return (<div>loading...</div>);
    } else {
        const currentSong = songs[currentSongIndex];
        if (!currentSong) {
            console.error('invalid song!')
            return null;
        }

        return (
            <div className={classes.root}>
                <div className={classes.title}>{currentSong.title}</div>
                <div className={classes.artist}>{currentSong.artist}</div>
                <img src={currentSong.coverArt} alt='cover art' className={classes.coverArt}/>
                <div className={classes.bottomButtonsContainer}>
                    <SkipPreviousIcon fontSize='large' className={classes.button} onClick={skipToPreviousSong}/>
                    {isPlaying ? (
                        <PauseCircleFilledIcon fontSize='large' className={classes.button} onClick={() => {
                            setIsPlaying(false);
                        }}/>
                    ) : (
                        <PlayCircleFilledWhiteIcon fontSize='large' className={classes.button} onClick={() => {
                            setIsPlaying(true);
                        }}/>
                    )}
                    <SkipNextIcon fontSize='large' className={classes.button} onClick={skipToNextSong}/>
                </div>
            </div>
        )
    }
}

export default AudioPlayer;