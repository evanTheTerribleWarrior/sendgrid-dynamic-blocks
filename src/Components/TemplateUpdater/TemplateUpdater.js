import React, {useState} from 'react'
import {Tabs, Tab, Button} from '@mui/material'
import DynamicTemplateList from './DynamicTemplateList/DynamicTemplateList';
import Preview from './Preview/Preview'
import BlockChooser from './BlockChooser/BlockChooser'

const TemplateUpdater = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedTemplates, setSelectedTemplates] = useState([])
    const [selectedVersions, setSelectedVersions] = useState([])
    const [generatedBlock, setGeneratedBlock] = useState("")
    const [selectedBlock, setSelectedBlock] = useState("")

    const TAB_SIZE = 4;
    
    const handleTabChange = (event, newTab) => {
        setActiveTab(newTab);
    };  

    const handleNextStep = () => {
        setCurrentStep((prevStep) => {
            if (prevStep < TAB_SIZE -1)  return (prevStep + 1)
            return (prevStep)
        });
    };

    const handlePreviousStep = () => {
        setCurrentStep((prevStep) => {
            if (prevStep > 0)  return (prevStep - 1)
            return (prevStep)
        });
    };

    const handleSelectedBlock = (block) => {
        setSelectedBlock(block)
    }

    const handleTemplatesSelect = () => {

    }

    const handleVersionsSelect = () => {
        
    }

    const renderStep = () => {
        switch (currentStep) {
        case 0:
            return <BlockChooser onBlockSelected={handleSelectedBlock}/>
        case 1:
            return <DynamicTemplateList onSelectTemplates={handleTemplatesSelect} onSelectVersions={handleVersionsSelect} />;
        case 2:
            return (
                        <Preview 
                            generatedBlock={generatedBlock}
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
        <Tabs value={currentStep} onChange={handleTabChange} centered>
          <Tab label="1. Select Block"  />
          <Tab label="2. Select Templates" disabled={currentStep < 1} />
          <Tab label="3. Preview" disabled={currentStep < 2} />
          <Tab label="4. Finish" disabled={currentStep < 3} />
        </Tabs>
        <Button
            variant="contained"
            color="primary"
            onClick={handleNextStep}
            sx={{ position: 'fixed', top: 80, right: 16 }}
        >
            Next
        </Button>
        <Button
            variant="contained"
            color="primary"
            onClick={handlePreviousStep}
            sx={{ position: 'fixed', top: 80, left: 80 }}
        >
            Back
        </Button>
        {renderStep()}
        </>
    )

}

export default  TemplateUpdater

     