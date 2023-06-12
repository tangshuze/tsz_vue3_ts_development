const index = (props: any) => {
  return (
    <>
      <div>{props.title||'test'}</div>
      <button onClick={clickTap}>点击</button>
    </>
  )
}
const clickTap = () => {
  console.log('click');
}

export default index