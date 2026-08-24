export default function Img(props) {
  return (
    <figure>
        <img
            src={props.src} 
            alt={props.alt} 
            width={props.width} 
            height={props.height} 
            className={props.className}
        />
    </figure>
  )
}