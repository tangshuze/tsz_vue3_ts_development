type Props = {
    title:string
}
 
const index = (props:Props) => {
    return (
        <>
            <div>{props.title}</div>
            <button onClick={clickTap}>点击</button>
        </>
    )
}
 
const clickTap = () => {
    console.log('click');
}
 
export default index