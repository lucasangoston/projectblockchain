import {Box, Container, Grid} from "@mui/material";
import { cardProfile } from 

export function Profile(){
    return (
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
                <Box gridColumn="span 8">
                    <cardProfile/>
                </Box>
                <Box gridColumn="span 3">
                    <RecommendedUsers></RecommendedUsers>
                </Box>
            </Box>
    );
}