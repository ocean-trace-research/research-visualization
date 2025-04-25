import { List, ListItem, Link, Typography } from '@mui/material';

function Overview() {

    return (
        <div className="Overview">
            <List>
                <ListItem>
                    <Link href="https://scor-int.org/group/reducing-uncertainty-in-soluble-aerosol-trace-element-deposition-rusted/"  
                    target="_blank">RUSTED:</Link>
                    <Typography sx={{ marginLeft: "10px" }} variant="body1">Reducing Uncertainty in Soluble aerosol Trace Element Deposition. SCOR Working Group 167</Typography>
                </ListItem>           
                <ListItem>
                    <Link href="https://agupubs.onlinelibrary.wiley.com/" target="_blank">American Geophysical Union (AGU) Publications:</Link> 
                    <Typography sx={{ marginLeft: "10px" }} variant="body1">AGU aims to advance discovery and solution science that accelerate knowledge and create solutions that are ethical, unbiased and respectful of communities and their values. 
                        Our programs include serving as a scholarly publisher, convening virtual and in-person events and providing career support.</Typography>
                </ListItem>
                <ListItem>
                    <Link href="https://www.aerosol-research.net/" target="_blank">Aerosol Research (AR):</Link> 
                    <Typography sx={{ marginLeft: "10px" }} variant="body1">Not-for Profit International Scientific Journal dedicated to the publication and public discussion of high-quality studies investigating aerosols.</Typography>
                </ListItem>     
            </List>
        </div>
    );
}

export default Overview;