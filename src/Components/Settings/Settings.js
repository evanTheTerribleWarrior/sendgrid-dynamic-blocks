import React from 'react';
import { Grid } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';

const sectionHeaderContent = {
    title: "Settings",
    subtitle: "Here you can manage and view basic application settings"
}

const Settings = () => {

    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
        </Grid>
    )


}

export default Settings;