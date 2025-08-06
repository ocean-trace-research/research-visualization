import { Science } from '@mui/icons-material';
import { List, ListItem, Link, Typography, Box, Grid2 as Grid } from '@mui/material';

function Overview() {
    const links = [
        {
            type: "Programs",
            active: true,
            collection: [
                {
                    url: "https://oceandecade.org/",
                    title: "UN Ocean Decade (2021-2030)",
                    description: "The ‘Ocean Decade’, provides a convening framework for a wide range of stakeholders across the world to engage and collaborate outside their traditional communities to trigger nothing less than a revolution in ocean science.",
                    active: true
                },
                {
                    url: "https://www.geotraces.org/",
                    title: "GEOTRACES",
                    description: `GEOTRACES is an international research programme for improving understanding of marine biogeochemical cycles. 
            It's mission is to identify processes and quantify fluxes that control the distribution of key trace elements and isotopes in the ocean, 
            and to establish the sensitivity of these distributions to changing environmental conditions.`,
                    active: true
                },
                {
                    url: "https://www.solas-int.org/",
                    title: "Surface Ocean - Lower Atmosphere Study (SOLAS)",
                    description: `Initiated with a first Open Science Conference in 2000 and formally launched in 2004, 
                        SOLAS research aims to achieve quantitative understanding of the key biogeochemical-physical interactions and feedbacks between the ocean and atmosphere, 
                        and of how this coupled system affects and is affected by climate and global change.`,
                    active: true
                }
            ]
        },
        {
            type: "Research Groups",
            active: true,
            collection:
                [
                    {
                        url: "https://scor-int.org/",
                        title: "Scientific Committee on Oceanic Research (SCOR)",
                        description: `Formed in 1957 to help address interdisciplinary science questions related to the ocean. 
                        SCOR activities focus on promoting international cooperation in planning and conducting oceanographic research, and solving methodological and conceptual problems that hinder research.`,
                        active: true
                    },
                    {
                        url: "https://scor-int.org/group/reducing-uncertainty-in-soluble-aerosol-trace-element-deposition-rusted/",
                        title: "RUSTED",
                        description: "Reducing Uncertainty in Soluble aerosol Trace Element Deposition. SCOR Working Group 167",
                        active: true
                    }
                ]
        },
        {
            type: "Methodologies",
            active: true,
            collection:
                [
                    {
                        url: "https://www.geotraces.org/methods-cookbook/",
                        title: "GEOTRACES Cookbook",
                        description: "Sampling and Sample-handling Protocols for GEOTRACES Cruises (version 4.0, 2024)",
                        active: true
                    }
                ]
        },
        {
            type: "Datasets",
            active: true,
            collection:
                [
                    {
                        url: "https://www.bodc.ac.uk/geotraces/data/historical/",
                        title: "Historical TEI Data",
                        description: `Links to relevant historical data sets collected outside of the GEOTRACES programme.  
                        This data has, in general, not been quality-controlled or intercalibrated according to GEOTRACES protocols and is typically compiled from literature sources.`,
                        active: true
                    },
                    {
                        url: "https://www.bco-dmo.org/search/dataset?query=%7E%27Trace*20element",
                        title: "BCODMO Trace Element Datasets",
                        description: `A repository funded by the National Science Foundation (NSF), supporting the oceanographic research community's data needs throughout the entire data life cycle.
                        This link has collection of trace element datasets hosted by the Biological and Chemical Oceanography Data Management Office.`,
                        active: true
                    },
                ]
        },
        {
            type: "Journals",
            active: true,
            collection:
                [
                    {
                        url: "https://www.aerosol-research.net/",
                        title: "Aerosol Research (AR)",
                        description: "Not-for Profit International Scientific Journal dedicated to the publication and public discussion of high-quality studies investigating aerosols.",
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
                        url: "https://agupubs.onlinelibrary.wiley.com/journal/21698996",
                        title: "Journal of Geophysical Research (JGR) Atmospheres",
                        description: `Publishes original research articles that advance and improve the understanding of atmospheric properties and processes, 
            including the interaction of the atmosphere with other components of the Earth system, as well as their roles in climate variability and change.`,
                        active: true
                    },
                    {

                        url: "https://www.sciencedirect.com/journal/atmospheric-environment",
                        title: "Atmospheric Environment",
                        description: `It is an international journal for scientists in different disciplines related to atmospheric composition and its impacts. 
            The journal publishes scientific articles with atmospheric relevance of emissions and depositions of gaseous and particulate compounds, 
            chemical processes and physical effects in the atmosphere, as well as impacts of the changing atmospheric composition on human health, air quality, climate change, and ecosystems.`,
                        active: true
                    },
                    {
                        url: "https://www.sciencedirect.com/journal/marine-chemistry",
                        title: "Marine Chemistry",
                        description: `Publishes original empirical research, innovative methods and technologies, and novel modeling approaches in the field of marine chemistry and biogeochemistry. 
            Preference will be given to hypothesis-driven studies that offer thought-provoking insights into the natural and human-induced controls and changes in ocean chemistry and biogeochemistry.`,
                        active: true
                    },
                    {
                        url: "https://www.sciencedirect.com/journal/journal-of-aerosol-science",
                        title: "Journal of Aerosol Science",
                        description: `Founded in 1970, the Journal of Aerosol Science is the first journal specifically devoted to publishing research on the behavior of suspensions of particles and droplets in a gas, i.e. aerosols. 
            The editors and editorial advisory board consider it the prime vehicle for the publication of original work as well as reviews related to fundamental and applied aerosol research, including aerosol instrumentation.`,
                        active: true
                    },
                    {
                        url: "https://agupubs.onlinelibrary.wiley.com/journal/19448007",
                        title: "Geophysical Research Letters",
                        description: `Gold open access journal that publishes high-impact, innovative, and timely communications-length articles on major advances spanning all of the major geoscience disciplines.`,
                        active: true
                    }

                ]
        }
    ]

    return (
        <div className="Overview">
            {links.map((group) => {
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