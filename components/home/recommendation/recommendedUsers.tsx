import {Button, Grid} from "@mui/material";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {blue, red} from '@mui/material/colors';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export function RecommendedUsers() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className="text-center" style={{border: '1px solid grey'}}>
            <CardHeader title={"Recommendations"} />

            {/* remplacer une fois qu'ont aura de vraies données */}
            <CardContent>
                <Grid container spacing={2} direction="column">
                    <Grid item >
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                L
                            </Avatar>
                            <h2> Lucas Angoston</h2>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>

                    </Grid>
                    <Grid item >
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                T
                            </Avatar>
                            <h2> Thomas Southasa</h2>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                V
                            </Avatar>
                            <h2> Valentin Joly</h2>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                H
                            </Avatar>
                            <h2> Hortense Dupont</h2>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>

                    </Grid>
                    <Grid item >
                        <Grid container direction="row" justifyContent={"space-between"}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                W
                            </Avatar>
                            <h2> Wissam Lepen</h2>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}