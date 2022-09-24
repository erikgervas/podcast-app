import './Podcast.css';

export const Podcast = ({ name, artist, imageUrl }) => {
    return (
        <div className='card'>
            <img className='image' src={imageUrl} alt='podcast'/>
            <div className='title'>{name.toUpperCase()}</div>
            <div className='author'>Author: {artist}</div>
        </div>
    );
}