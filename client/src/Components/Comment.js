function Comment({text}){
    return (
        <div>
            <p className="font-bold">{text.user.username}</p>
            <p>{text.text}</p>
        </div>
    )
}

export default Comment