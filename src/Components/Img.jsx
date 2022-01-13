function Img(props) {

    const url = process.env.PUBLIC_URL + `/Images/${props.url}.jpg`;
    const alt = props.alt;
    const style = props.style;

    return (
        <img className={style?style:"object-center object-cover w-full h-full"} src={url} alt={alt} />
     );
}

export default Img;