import { Card } from "./Card.jsx"


export function Board({ list, handleClick}) {
    console.log(list)
    return (
        <div className="board">
            {list.map((item) => (
                    <Card
                        key={item.id}
                        name={item.name} 
                        image={"/assets/"+ item.name + ".png"} 
                        clicked={item.clicked}
                        onClick={() => handleClick(item.id)}>
                    </Card>
                )
            )}
        </div>
    )
}