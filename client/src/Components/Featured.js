function Featured({featured}){
    return (
    <div>
        <img src={featured.images[0]} />
        <p>{featured.name}</p>
        <p>{featured.artists.join(",")}</p>
    </div>)
}
export default Featured