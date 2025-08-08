import { Science } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { List, ListItem, Link, Typography, Box, Grid2 as Grid } from '@mui/material';

function Overview() {    
    const [links, setLinks] = useState([]);
    const getLinks = () => {
        fetch(process.env.PUBLIC_URL + '/links.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((links) => {
                setLinks(links);
            })
    }
    useEffect(() => {
        getLinks()
    }, [])

    return (
        <div className="Overview">
            {links?.map((group) => {
                if (group.active) {
                    return (
                        <Box sx={{ flexGrow: 1 }} key={group.type}>
                            <Grid size="grow">
                                <Typography sx={{ marginLeft: "10px", textAlign: "left" }} variant="h6">{group.type}</Typography>
                                <List>
                                    {group.collection.map((link) => {
                                        if (link.active) {
                                            return (
                                                <ListItem key={link.title}>
                                                    <Grid container sx={{ width: "100%" }} size={{ desktop: 12, mobile: 12 }}>
                                                        <Grid size={{ sm: 3, xs: 12, md: 3 }}>
                                                            <Link href={link.url}
                                                                target="_blank">{link.title}:</Link>
                                                        </Grid>
                                                        <Grid size={{ sm: 8, xs: 12, md: 8 }}>
                                                            <Typography sx={{ marginLeft: "10px" }} variant="body1">{link.description}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </ListItem>
                                            )
                                        }
                                    })}
                                </List>
                            </Grid>
                        </Box>)
                }
            })}
        </div>
    );
}

export default Overview;