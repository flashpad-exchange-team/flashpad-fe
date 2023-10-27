import React, { FC } from 'react';
import { FormHandler } from '..';

interface FairLaunchpadProps {
  values: {
    brieflyProblemProjectSolves: string;
    valueYourProject: string;
  };
  handleChange: FormHandler;
  error: (value: string) => (string | undefined)[];
}

const FairLaunchpadProjectProposition: FC<FairLaunchpadProps> = ({
  values,
  handleChange,
  error,
}) => {
  return (
    <>
      <div className="text-lg text-bold text-center mt-6">
        4. Use case and value proposition
      </div>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Briefly explain the problem your project solves.
          </div>
          <textarea
            className="w-full bg-darkBlue h-[160px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
            name="brieflyProblemProjectSolves"
            value={values.brieflyProblemProjectSolves}
            onChange={handleChange}
          />
          <div className="text-[#FF0000]">
            {error('brieflyProblemProjectSolves')}
          </div>
        </div>
        <div className="w-full">
          <div className="mt-5 text-[#98A2B3]">
            Outline the unique value your project brings to the ecosystem.
          </div>
          <textarea
            className="w-full bg-darkBlue h-[160px] pl-3 text-sm  mb-2 mt-2 rounded-md focus:outline-none placeholder-[#667085]"
            name="valueYourProject"
            value={values.valueYourProject}
            onChange={handleChange}
          />
          <div className="text-[#FF0000]">{error('valueYourProject')}</div>
        </div>
      </div>
    </>
  );
};

export default FairLaunchpadProjectProposition;
