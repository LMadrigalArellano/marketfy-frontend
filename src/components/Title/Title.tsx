interface Props {
  text: string
}

export const Title = ({ text }: Props) => {
  return (
    <h1 className='text-5xl'>{ text }</h1>
  )
}
