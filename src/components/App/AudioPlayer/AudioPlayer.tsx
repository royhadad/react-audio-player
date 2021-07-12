import {FC, useCallback, useEffect, useReducer, useRef, useState} from 'react';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import axios from "axios";
import styles from './styles'
import Song from "../../../types/Song";
import {noop} from "../../../utils";

type ReducerState = {
    songs: Song[],
    currentSongIndex: number,
    isPlaying: boolean,
    currentSong: Song | undefined
}

type ReducerActions =
    | { type: 'SET_SONGS', songs: Song[] }
    | { type: 'SKIP_TO_PREVIOUS_SONG' }
    | { type: 'SKIP_TO_NEXT_SONG' }
    | { type: 'TOGGLE_PLAY' }

const AudioPlayer: FC = () => {
    const classes = styles();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fetchError, setFetchError] = useState<string>('');
    const audio = useRef(new Audio(''));

    const [entireState, dispatch] = useReducer((state: ReducerState, action: ReducerActions) => {
        switch (action.type) {
            case 'SET_SONGS':
                return {
                    ...state,
                    songs: action.songs,
                    currentSongIndex: 0,
                    isPlaying: false,
                    currentSong: action.songs[0]
                };
            case 'SKIP_TO_PREVIOUS_SONG':
                const previousSongIndex = (state.songs.length - 1) % state.songs.length;
                return {
                    ...state,
                    currentSongIndex: previousSongIndex,
                    currentSong: state.songs[previousSongIndex]
                };
            case 'SKIP_TO_NEXT_SONG':
                const nextSongIndex = (state.currentSongIndex + 1) % state.songs.length;
                return {
                    ...state,
                    currentSongIndex: nextSongIndex,
                    currentSong: state.songs[nextSongIndex]
                };
            case 'TOGGLE_PLAY':
                return {
                    ...state,
                    isPlaying: !state.isPlaying
                }
            default:
                return state;
        }
    }, {
        songs: [],
        currentSongIndex: 0,
        isPlaying: false,
        currentSong: undefined
    });

    const setSongs = (songs: Song[]) => (dispatch({type: 'SET_SONGS', songs}));
    const skipToPreviousSong = () => (dispatch({type: 'SKIP_TO_PREVIOUS_SONG'}))
    const skipToNextSong = () => (dispatch({type: 'SKIP_TO_NEXT_SONG'}))
    const togglePlay = () => (dispatch({type: 'TOGGLE_PLAY'}))

    const {isPlaying, currentSong} = entireState;

    const fetchSongs = useCallback(async () => {
        setIsLoading(true);
        const response = await axios.get<Song[]>('/api/songs');
        setSongs(response.data);
        dispatch({type: 'SET_SONGS', songs: response.data})
        setFetchError('');
        setIsLoading(false);
    }, []);

    useEffect(function fetchOnMount(): void {
        fetchSongs().catch(() => {
            setFetchError('Error while fetching the songs...');
        });
    }, [fetchSongs])

    useEffect(function syncAudioObject(): void {
        if (audio.current.src !== currentSong?.url) {
            audio.current.src = currentSong?.url || '';
        }
        if (isPlaying) {
            audio.current.play().then(noop);
        } else {
            audio.current.pause();
        }
    }, [isPlaying, currentSong])

    if (isLoading) {
        return (<div>loading...</div>);
    } else if (fetchError) {
        return (<div>{fetchError}</div>)
    } else if (!currentSong) {
        return (<div>error! invalid song!</div>);
    } else {
        return (
            <div className={classes.root}>
                <div className={classes.title}>{currentSong.title}</div>
                <div className={classes.artist}>{currentSong.artist}</div>
                <img src={currentSong.coverArt} alt='cover art' className={classes.coverArt}/>
                <div className={classes.bottomButtonsContainer}>
                    <SkipPreviousIcon fontSize='large' className={classes.button} onClick={skipToPreviousSong}/>
                    {isPlaying ? (
                        <PauseCircleFilledIcon fontSize='large' className={classes.button} onClick={togglePlay}/>
                    ) : (
                        <PlayCircleFilledWhiteIcon fontSize='large' className={classes.button} onClick={togglePlay}/>
                    )}
                    <SkipNextIcon fontSize='large' className={classes.button} onClick={skipToNextSong}/>
                </div>
            </div>
        )
    }
}

export default AudioPlayer;