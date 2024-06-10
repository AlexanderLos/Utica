import '../css/Donate.css';
import image from '../css/Donatecat.png';

function Donate() {
    return (
        <>
        <div className="donateCat">
        <img src={image} alt='Pixel Cat Asking For Donation'/>
        </div>
        <div className='donateContainer'>
        <h1>Help out a hungry dev.</h1>
        <h2>Solana Address: 4gXpqaXpVLgPNkoV6tVa7Py8LtPHiKyWHxruvZCA7wwG</h2>
        </div>
        </>
    );
}

export default Donate;
