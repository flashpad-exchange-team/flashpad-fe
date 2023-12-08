import { Button } from '@/components/button/Button';
import customToast from '@/components/notification/customToast';
import ArrowRight from '@/icons/ArrowRight';
import BackIcon from '@/icons/BackIcon';
import SwapLeftIcon from '@/icons/SwapLeft';
import SwapRightIcon from '@/icons/SwapRight';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ZodError } from 'zod';
import {
  formDetailSchema,
  formDocumentsSchema,
  formInfoSchema,
  formPropositionSchema,
  formRoadmapSchema,
  formSocialMediaSchema,
  formTokenSchema,
} from '../../utils/validation/FormSchema';
import FairLaunchpadProjectDetail from './components/FairLaunchpadProjectDetail';
import FairLaunchpadProjectDocuments from './components/FairLaunchpadProjectDocuments';
import FairLaunchpadProjectProposition from './components/FairLaunchpadProjectProposition';
import FairLaunchpadProjectSocialMedia from './components/FairLaunchpadProjectSocialMedia';
import FairLaunchpadProjectTeamInformation from './components/FairLaunchpadProjectTeamInformation';
import FairLaunchpadProjectTokenInformation from './components/FairLaunchpadProjectTokenInformation';
import FairLaunchpadRoadmapAndDistribution from './components/FairLaunchpadRoadmapAndDistribution';
export interface FormEvent {
  target: {
    name: string;
    value: any;
  };
}

export interface FormHandler {
  (event: FormEvent): void;
}

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
  const router = useRouter();
  const handleChange: FormHandler = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const errors: any = validationError
    ? (JSON.parse(validationError) as any)
    : ([] as any);

  const showError = (value: string) => {
    const result = errors?.map((i: any) => {
      if (i.path[0] === value) return i.message;
    });
    return result;
  };

  const handleNextForm = (e: Event) => {
    e.preventDefault();
    try {
      switch (step) {
        case 1:
          formDetailSchema.parse(formValues);
          break;
        case 2:
          formInfoSchema.parse(formValues);
          break;
        case 3:
          formTokenSchema.parse(formValues);
          break;
        case 4:
          formPropositionSchema.parse(formValues);
          break;
        case 5:
          formRoadmapSchema.parse(formValues);
          break;
        case 6:
          formSocialMediaSchema.parse(formValues);
          break;
        case 7:
          formDocumentsSchema.parse(formValues);
          break;
      }
      if (step === 7) {
        customToast({
          message: 'Submit form successfully! ',
          type: 'success',
        });
        router.push('/launchpad-detail');

        submitForm();
      } else {
        setStep(step + 1);
      }
      setValidationError('');
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationError(error.message);
      }
    }
  };
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
  const submitForm = () => {};

  const handleBackForm = () => {
    setStep(step - 1);
  };

  return (
    <>
      <div className="max-w-[768px] p-8 md:p-0 w-full mx-auto mt-28">
        <form className="my-10 bg-dark px-4 pt-8 pb-4">
          <div className="text-lg md:text-xl text-bold mx-auto w-full flex items-center gap-3 justify-center text-center">
            <SwapLeftIcon />
            Support Request
            <SwapRightIcon />
          </div>
          {componentRender}
          <div className="md:flex justify-end">
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
              {step !== 7 ? 'Next' : 'Submit'}{' '}
              {step !== 7 && <ArrowRight fill />}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Launchpad;
