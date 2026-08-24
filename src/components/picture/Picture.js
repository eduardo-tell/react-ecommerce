export default function Img(props) {
  return (
    <picture>
        <img
            src={props.src} 
            alt={props.alt} 
            width={props.width} 
            height={props.height} 
            className={props.className}
        />
    </picture>
  )
}