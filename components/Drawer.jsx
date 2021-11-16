import { Drawer, List, ListItem, ListItemButton, ListItemIcon,ListItemText,IconButton,Button } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system'
import styles from '../styles/my.module.css'
import React from 'react'
import {StyledLink} from './Styledcomponents'
import {useRouter} from 'next/router'
const Drawerr = ({open,setOpen}) => {


    const router=useRouter()
    const path =router.asPath
   
   
     return (
        <div>
            <Drawer open={open} >
             <div style={{position:"relative",padding:"5px",width:"100%"}}  >
                 <IconButton onClick={()=>setOpen(false)} style={{position:"absolute" ,right:"0"}}      sx={{p:"10px"}}  >
                 <CloseIcon fontSize="large"  />
                 </IconButton>
             </div>

             <Box sx={{width:"280px",mt:"50px",pr:"10px"}}  >
                
                
               <StyledLink href="/profile" >
                   <div className={`${path=="/profile"?styles.active:styles.my}  group space-x-4  hover:bg-purple-100  `}>
                   
                      <span  className="group-hover:text-purple-400 text-gray-700 font-semibold    "  >PROFILE</span>
                   </div>
               </StyledLink>
               <StyledLink href="/" >
                   <div className={`${path=="/"?styles.active:styles.my}  group space-x-4  hover:bg-purple-100 mt-2  `}>
                   
                      <span  className="group-hover:text-purple-400 text-gray-700 font-semibold    "  >HOME</span>
                   </div>
               </StyledLink>
               <StyledLink href="/cart" >
                   <div className={`${path=="/cart"?styles.active:styles.my}  group space-x-4  hover:bg-purple-100 mt-2  `}>
                   
                      <span  className="group-hover:text-purple-400 text-gray-700 font-semibold    "  >CART</span>
                   </div>
               </StyledLink>
                   
                   
            
             </Box>
          
            
            </Drawer>
        </div>
    )
}

export default Drawerr
