import styled from 'styled-components'
import Link from 'next/link'
export const StyledList=styled.div`
display:flex;
justify-content:center ;
align-items:center;
padding:5px 10px ;
margin-top:5px;
border-radius: 0 20px 20px 0;
&:hover   {
 background-color: #8d2626;
}
`

export const StyledLink = styled(Link)`
text-decoration:none;
cursor:pointer;
`
