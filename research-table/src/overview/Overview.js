import { List, ListItem, Link, Typography, Box, Grid2 as Grid } from '@mui/material';

function Overview() {
    const links = [
        {
            url: "https://oceandecade.org/",
            title: "UN Ocean Decade (2021-2030)",
            description: "The ‘Ocean Decade’, provides a convening framework for a wide range of stakeholders across the world to engage and collaborate outside their traditional communities to trigger nothing less than a revolution in ocean science.",
            active: true
        },
        {
            url: "https://scor-int.org/group/reducing-uncertainty-in-soluble-aerosol-trace-element-deposition-rusted/",
            title: "RUSTED",
            description: "Reducing Uncertainty in Soluble aerosol Trace Element Deposition. SCOR Working Group 167",
            active: true
        },
        {
            url: "https://agupubs.onlinelibrary.wiley.com/",
            title: "American Geophysical Union (AGU) Publications",
            description: `AGU aims to advance discovery and solution science that accelerate knowledge and create solutions that are ethical, unbiased and respectful of communities and their values. 
                        Our programs include serving as a scholarly publisher, convening virtual and in-person events and providing career support.`,
            active: true
        },
        {
            url: "https://www.aerosol-research.net/",
            title: "Aerosol Research (AR)",
            description: "Not-for Profit International Scientific Journal dedicated to the publication and public discussion of high-quality studies investigating aerosols.",
            active: true
        }
    ]

    return (
        <div className="Overview">
            <List>
                {links.map((link) => {
                    if (link.active) {
                        return (<ListItem>
                            <Grid size={{ desktop: 12, mobile: 12 }}>
                                <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                                    <Link href={link.url}
                                        target="_blank">{link.title}:</Link>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8, md: 8 }}>
                                    <Typography sx={{ marginLeft: "10px" }} variant="body1">{link.description}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>)
                    }
                })}
            </List>
        </div>
    );
}

export default Overview;