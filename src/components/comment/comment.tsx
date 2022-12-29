import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Divider,
  SxProps,
  Theme,
  IconButton,
} from "@mui/material";
import { IComment } from "../../utils/interfaces/comment";
interface CommentProps {
  comment: IComment;
}
function Comment({ comment }: CommentProps) {
     return (
       <Box className="comment-container">
         <Box sx={{ display: "flex", paddingBottom: 2 }}>
           <Box sx={{ marginLeft: 2, width: "100%" }}>
             <Box
               sx={{
                 display: "flex",
                 justifyContent: "space-between",
               }}
             >
               <Box
                 sx={{
                   display: "flex",
                 }}
               >
                 <Box>
                   <Typography component="div" variant="h6" fontWeight={"bold"}>
                     {comment.user.username}
                   </Typography>
                   <Typography
                     component="span"
                     sx={{ fontSize: "10px" }}
                     color="green"
                   >
                     {new Date(comment.createdAt).toLocaleDateString()}
                   </Typography>
                 </Box>
                 <Rating sx={{ marginLeft: 3 }} value={comment.rate} readOnly />
               </Box>
             </Box>
             <Typography component="legend" gutterBottom sx={{ marginTop: 1 }}>
               {comment.content}
             </Typography>
           </Box>
         </Box>
         <Divider light />
       </Box>
     );
}
export default Comment;