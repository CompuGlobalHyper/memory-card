export function Card ({ name, image , onClick}) {
    return (
        <div className="card" onClick={onClick}>
            <img src={image} alt={name + "berry"} />
            <p className="text small">{name}</p>
        </div>
    )
}