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
                    <Link href="https://www.aerosol-research.net/" target="_blank">Aerosol Research (AR):</Link> 
                    <Typography sx={{ marginLeft: "10px" }} variant="body1">Not-for Profit International Scientific Journal dedicated to the publication and public discussion of high-quality studies investigating aerosols.</Typography>
                </ListItem>
            </List>
        </div>
    );
}

export default Overview;