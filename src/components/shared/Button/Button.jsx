import '../../Search/Search.css';

export default function Button({ text, onClick }) {
    return <button type="button" className="button" onClick={onClick} >{text}</button>
}
