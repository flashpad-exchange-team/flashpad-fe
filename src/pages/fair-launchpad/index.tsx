import { Button } from '@/components/button/Button';
import ArrowRight from '@/icons/ArrowRight';
import BackIcon from '@/icons/BackIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useMemo, useState } from 'react';
import FairLaunchpadProjectDetail from './components/FairLaunchpadProjectDetail';
import FairLaunchpadProjectDocuments from './components/FairLaunchpadProjectDocuments';
import FairLaunchpadProjectProposition from './components/FairLaunchpadProjectProposition';
import FairLaunchpadProjectSocialMedia from './components/FairLaunchpadProjectSocialMedia';
import FairLaunchpadProjectTeamInformation from './components/FairLaunchpadProjectTeamInformation';
import FairLaunchpadProjectTokenInformation from './components/FairLaunchpadProjectTokenInformation';
import FairLaunchpadRoadmapAndDistribution from './components/FairLaunchpadRoadmapAndDistribution';

const Launchpad = () => {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    projectName: '',
    projectWebsite: '',
    projectDescription: '',
    projectCategory: '',
    teamName: '',
    teamEmail: '',
    teamExp: '',
    tokenName: '',
    tokenSymbol: '',
    tokenSupply: '',
    tokenType: '',
    brieflyProblemProjectSolves: '',
    valueYourProject: '',
    roadMapLink: '',
    roadMapInfo: '',
    tokenomicLink: '',
    socialTelegramChannel: '',
    socialTelegramGroup: '',
    socialTwitter: '',
    socialDiscord: '',
    documentsWhitepaper: '',
    documentsPitchDeck: '',
    documentsTechnical: '',
    documentsLegal: '',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  let componentRender;
  switch (step) {
    case 1:
      componentRender = (
        <FairLaunchpadProjectDetail
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 2:
      componentRender = (
        <FairLaunchpadProjectTeamInformation
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 3:
      componentRender = (
        <FairLaunchpadProjectTokenInformation
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 4:
      componentRender = (
        <FairLaunchpadProjectProposition
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 5:
      componentRender = (
        <FairLaunchpadRoadmapAndDistribution
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 6:
      componentRender = (
        <FairLaunchpadProjectSocialMedia
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    case 7:
      componentRender = (
        <FairLaunchpadProjectDocuments
          values={formValues}
          handleChange={handleChange}
        />
      );
      break;
    default:
      <FairLaunchpadProjectDetail
        values={formValues}
        handleChange={handleChange}
      />;
  }
  const submitForm = () => {
    console.log('Submit Form');
  };

  const handleNextForm = () => {
    if (step === 7) {
      submitForm();
    } else {
      setStep(step + 1);
    }
  };

  const handleBackForm = () => {
    setStep(step - 1);
  };

  const isNextDisabled = useMemo(() => {
    let isDisabled = true;
    if (step === 1) {
      isDisabled =
        !formValues.projectName ||
        !formValues.projectName ||
        !formValues.projectDescription ||
        !formValues.projectCategory;
    }
    if (step === 2) {
      isDisabled =
        !formValues.teamName || !formValues.teamEmail || !formValues.teamExp;
    }
    if (step === 3) {
      isDisabled =
        !formValues.tokenName ||
        !formValues.tokenSymbol ||
        !formValues.tokenSupply ||
        !formValues.tokenType;
    }
    if (step === 4) {
      isDisabled =
        !formValues.brieflyProblemProjectSolves || !formValues.valueYourProject;
    }
    if (step === 5) {
      isDisabled =
        !formValues.roadMapLink ||
        !formValues.roadMapInfo ||
        !formValues.tokenomicLink;
    }
    if (step === 6) {
      isDisabled =
        !formValues.socialTelegramChannel ||
        !formValues.socialTelegramGroup ||
        !formValues.socialTwitter ||
        !formValues.socialDiscord;
    }
    if (step === 7) {
      isDisabled =
        !formValues.documentsWhitepaper ||
        !formValues.documentsPitchDeck ||
        !formValues.documentsTechnical ||
        !formValues.documentsLegal;
    }

    return isDisabled;
  }, [step, formValues]);

  console.log(isNextDisabled, 'isNextDisabled');
  return (
    <>
      <div className="max-w-[768px] p-8 md:p-0 w-full mx-auto">
        <div className="my-10 bg-dark px-4 pt-8 pb-4">
          <div className="text-2xl text-bold mx-auto w-full flex items-center gap-3 justify-center">
            <SwapLeftIcon />
            Support Request Form
            <SwapRightIcon />
          </div>
          {componentRender}
          <div className="flex justify-end">
            {step !== 1 && (
              <Button
                type="secondary"
                className="w-full md:w-1/4 justify-center my-4 h-[52px] text-base px-[42px] mr-5"
                onClick={handleBackForm}
              >
                <BackIcon /> Back
              </Button>
            )}
            <Button
              className="w-full md:w-1/4 justify-center my-4 h-[52px] text-base px-[42px]"
              onClick={handleNextForm}
              disabled={isNextDisabled}
            >
              {step !== 7 ? 'Next' : 'Send'} <ArrowRight fill />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Launchpad;
