import { z } from 'zod';

const notFalsy = (value: any): boolean => {
  return !!value;
};
export const formDetailSchema = z.object({
  projectName: z.string().max(50).refine(notFalsy, {
    message: 'Project name cannot be empty',
  }),
  projectWebsite: z.string().max(50).refine(notFalsy, {
    message: 'Project website cannot be empty',
  }),
  projectDescription: z.string().max(50).refine(notFalsy, {
    message: 'Project Description cannot be empty',
  }),
  projectCategory: z.string().max(50).refine(notFalsy, {
    message: 'Project category cannot be empty',
  }),
});

export const formInfoSchema = z.object({
  teamName: z.string().max(50).refine(notFalsy, {
    message: 'Team name cannot be empty',
  }),
  teamEmail: z.string().max(50).refine(notFalsy, {
    message: 'Team email cannot be empty',
  }),
  teamExp: z.string().max(50).refine(notFalsy, {
    message: 'Team background cannot be empty',
  }),
});

export const formTokenSchema = z.object({
  tokenName: z.string().max(50).refine(notFalsy, {
    message: 'Token name cannot be empty',
  }),
  tokenSymbol: z.string().max(50).refine(notFalsy, {
    message: 'Token symbol cannot be empty',
  }),
  tokenSupply: z.string().max(50).refine(notFalsy, {
    message: 'Token symbol cannot be empty',
  }),
  tokenType: z.string().max(50).refine(notFalsy, {
    message: 'Token symbol cannot be empty',
  }),
});

export const formPropositionSchema = z.object({
  brieflyProblemProjectSolves: z.string().max(200).refine(notFalsy, {
    message: 'Briefly problem project website cannot be empty',
  }),
  valueYourProject: z.string().max(200).refine(notFalsy, {
    message: 'Value your project cannot be empty',
  }),
});

export const formRoadmapSchema = z.object({
  roadMapLink: z.string().max(50).refine(notFalsy, {
    message: 'Roadmap link cannot be empty',
  }),
  roadMapInfo: z.string().max(50).refine(notFalsy, {
    message: 'Roadmap info cannot be empty',
  }),
  tokenomicLink: z.string().max(50).refine(notFalsy, {
    message: 'Tokennomic link cannot be empty',
  }),
});

export const formSocialMediaSchema = z.object({
  socialTelegramChannel: z.string().max(50).refine(notFalsy, {
    message: 'Social telegram channel cannot be empty',
  }),
  socialTelegramGroup: z.string().max(50).refine(notFalsy, {
    message: 'Social telegram group cannot be empty',
  }),
  socialTwitter: z.string().max(50).refine(notFalsy, {
    message: 'Social discord cannot be empty',
  }),
  socialDiscord: z.string().max(50).refine(notFalsy, {
    message: 'Social discord cannot be empty',
  }),
});

export const formDocumentsSchema = z.object({
  documentsWhitepaper: z.string().max(50).refine(notFalsy, {
    message: 'Document whitepaper cannot be empty',
  }),
  documentsPitchDeck: z.string().max(50).refine(notFalsy, {
    message: 'Document pitch deck cannot be empty',
  }),
  documentsTechnical: z.string().max(50).refine(notFalsy, {
    message: 'Document techincal cannot be empty',
  }),
  documentsLegal: z.string().max(50).refine(notFalsy, {
    message: 'Document legal cannot be empty',
  }),
});
