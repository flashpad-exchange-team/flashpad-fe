import { Button } from '@/components/button/Button';
import ArrowRight from '@/icons/ArrowRight';
import BackIcon from '@/icons/BackIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useMemo, useState } from 'react';
import { ZodError } from 'zod';
import FairLaunchpadProjectDetail from './components/FairLaunchpadProjectDetail';
import FairLaunchpadProjectDocuments from './components/FairLaunchpadProjectDocuments';
import FairLaunchpadProjectProposition from './components/FairLaunchpadProjectProposition';
import FairLaunchpadProjectSocialMedia from './components/FairLaunchpadProjectSocialMedia';
import FairLaunchpadProjectTeamInformation from './components/FairLaunchpadProjectTeamInformation';
import FairLaunchpadProjectTokenInformation from './components/FairLaunchpadProjectTokenInformation';
import FairLaunchpadRoadmapAndDistribution from './components/FairLaunchpadRoadmapAndDistribution';
import { formDetailSchema } from './components/FormSchema';
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
  const [validationError, setValidationError] = useState<any>('');
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const errors = useMemo(() => {
    return validationError ? JSON.parse(validationError) : [];
  }, [validationError]);

  const showError = (value: string) => {
    const result = errors?.map((i: any) => {
      if (i.path[0] === value) return i.message;
    });
    return result;
  };

  const handleNextForm = (e: Event) => {
    e.preventDefault();

    try {
      formDetailSchema.parse(formValues);
      if (step === 7) {
        submitForm();
      } else {
        console.log(222);
        setStep(step + 1);
      }
      setValidationError('');
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.message);
      }
    }
  };

  let test = useMemo(() => {
    console.log(step);
    return step;
  }, [step]);
  console.log(test, '111');
  let componentRender;
  switch (step) {
    case 1:
      componentRender = (
        <FairLaunchpadProjectDetail
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 2:
      componentRender = (
        <FairLaunchpadProjectTeamInformation
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 3:
      componentRender = (
        <FairLaunchpadProjectTokenInformation
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 4:
      componentRender = (
        <FairLaunchpadProjectProposition
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 5:
      componentRender = (
        <FairLaunchpadRoadmapAndDistribution
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 6:
      componentRender = (
        <FairLaunchpadProjectSocialMedia
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    case 7:
      componentRender = (
        <FairLaunchpadProjectDocuments
          values={formValues}
          handleChange={handleChange}
          error={showError}
        />
      );
      break;
    default:
      <FairLaunchpadProjectDetail
        values={formValues}
        handleChange={handleChange}
        error={validationError}
      />;
  }
  const submitForm = () => {
    console.log('Submit Form');
  };

  const handleBackForm = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="max-w-[768px] p-8 md:p-0 w-full mx-auto">
        <form className="my-10 bg-dark px-4 pt-8 pb-4">
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
              onClick={(e: any) => handleNextForm(e)}
              type="submit"
            >
              {step !== 7 ? 'Next' : 'Send'} <ArrowRight fill />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Launchpad;
