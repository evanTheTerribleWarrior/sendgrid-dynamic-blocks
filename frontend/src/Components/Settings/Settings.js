import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Switch, FormControlLabel } from '@mui/material';
import SectionHeader from '../SectionHeader/SectionHeader';
import { setSegmentWebVitals } from '../../Redux/slices/settingsSlice';

const sectionHeaderContent = {
    title: "Settings",
    subtitle: "Here you can manage and view basic application settings"
}

const Settings = () => {
    
    const segmentWebVitals = useSelector((state) => state.segmentWebVitals.segmentWebVitals);
    const dispatch = useDispatch();
    
    const handleSegmentSwitch = (event) => {
        dispatch(setSegmentWebVitals(!segmentWebVitals))
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12} >
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel sx={{ pt: 4 }}
                control={<Switch checked={segmentWebVitals} onChange={handleSegmentSwitch} />}
                label="Send app analytics to Segment"
            />
            </Grid>
        </Grid>
    )


}

export default Settings;