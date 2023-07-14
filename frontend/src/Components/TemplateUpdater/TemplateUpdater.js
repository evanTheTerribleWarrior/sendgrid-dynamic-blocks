import React, {useState} from 'react'
import {Tabs, Tab, Grid} from '@mui/material'
import DynamicTemplateList from './DynamicTemplateList/DynamicTemplateList';
import TemplatePrep from './TemplatePrep/TemplatePrep';
import BlockChooser from './BlockChooser/BlockChooser';
import SectionHeader from '../SectionHeader/SectionHeader'

const sectionHeaderContent = {
  title: "Update Your Templates",
  subtitle: "Here you can update your Sendgrid templates with a Dynamic Block you have created"
}


const TemplateUpdater = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedTemplates, setSelectedTemplates] = useState([])
    const [selectedVersions, setSelectedVersions] = useState([])
    const [selectedBlock, setSelectedBlock] = useState("")
 
    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };  

    const handleSelectedBlock = (block) => {
        setSelectedBlock(block)
    }

    const handleTemplatesSelect = (selectedTemplates) => {
        console.log(selectedTemplates)
        setSelectedTemplates(selectedTemplates)
    }

    const handleVersionsSelect = (selectedVersions) => {
        console.log(selectedVersions)
        setSelectedVersions(selectedVersions)
    }

    const renderStep = () => {
        switch (currentStep) {
        case 0:
            return <BlockChooser onFileSelected={handleSelectedBlock}/>
        case 1:
            return <DynamicTemplateList onSelectTemplates={handleTemplatesSelect} onSelectVersions={handleVersionsSelect} />;
        case 2:
            return (
                        <TemplatePrep 
                            selectedBlock={selectedBlock}
                            selectedTemplates={selectedTemplates} 
                            selectedVersions={selectedVersions}
                        />
                    )
          case 3:
            return (
                        <></>
                    )
        default:
            return null;
        }
    };

    return (<>
        <Grid container direction="row">
            <Grid item xs={12}>
                <SectionHeader title={sectionHeaderContent.title} subtitle={sectionHeaderContent.subtitle}/>
            </Grid>
            <Grid item xs={12}>
            <Tabs value={currentStep} onChange={handleTabChange} centered>
                <Tab label="1. Select Block" onClick={() => setCurrentStep(0)}  />
                <Tab label="2. Select Templates" disabled={!selectedBlock} onClick={() => setCurrentStep(1)} />
                <Tab label="3. Update" disabled={selectedTemplates.length === 0} onClick={() => setCurrentStep(2)} />
            </Tabs>
            </Grid>
        </Grid>
        
        
        {renderStep()}
        </>
    )

}

export default  TemplateUpdater

     