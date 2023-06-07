 
 
type Props = {
    title:string
}
 
const renderDom = (props:Props) => {
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
 
export default renderDom