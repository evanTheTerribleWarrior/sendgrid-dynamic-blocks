import React, { useState } from 'react';
import { Box, Button, Container, Tab, Tabs } from '@mui/material';
import DynamicTemplateList from '../DynamicTemplateList/DynamicTemplateList'; 
import Preview from '../Preview/Preview';
import DynamicBlockGenerator from '../DynamicBlockGenerator/DynamicBlockGenerator'; 
import DynamicTemplatesUpdateFinalStep from '../DynamicTemplatesUpdateFinalStep/DynamicTemplatesUpdateFinalStep';

const MainPage = () => {

    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [selectedVersions, setSelectedVersions] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [generatedBlock, setGeneratedBlock] = useState([]);
    const [code_array, setCodeArray] = useState([]);
    const handleNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handleGeneratedDynamicBlock = (dynamicBlock) => {
      setGeneratedBlock(dynamicBlock)
    }

    const handleTemplatesSelect = (templates_array) => {
      console.log(templates_array)
        setSelectedTemplates(templates_array);
    };

    const handleVersionsSelect = (versions_array) => {
      console.log(versions_array)
      setSelectedVersions(versions_array);
  };

    const handleTabChange = (event, newValue) => {
        if (newValue <= currentStep) {
        setCurrentStep(newValue);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
        case 0:
            return <DynamicBlockGenerator onGenerateDynamicBlock={handleGeneratedDynamicBlock} />;
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
                        <DynamicTemplatesUpdateFinalStep 
                            generatedBlock={generatedBlock}
                            selectedTemplates={selectedTemplates} 
                        />
                    )
        default:
            return null;
        }
    };

  return (
   /* <Container>
      <Box sx={{ marginTop: 10}}>
        <Tabs value={currentStep} onChange={handleTabChange} centered>
          <Tab label="1. Create Block" />
          <Tab label="2. Select Templates" disabled={currentStep < 1} />
          <Tab label="3. Preview" disabled={currentStep < 2} />
          <Tab label="4. Finish" disabled={currentStep < 3} />
        </Tabs>
      </Box>

      {renderStep()}

      {currentStep < 2 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Next Step
        </Button>
      )}
    </Container>*/

      <Box>
        <DynamicBlockGenerator onGenerateDynamicBlock={handleGeneratedDynamicBlock} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextStep}
          sx={{ position: 'fixed', top: 80, right: 16 }}
        >
          Save
        </Button>
      </Box>
  );
};

export default MainPage;