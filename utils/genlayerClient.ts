import { ScenarioClaim } from './scenarios';
import {
  runConsensus as runMockConsensus,
  runAppeal as runMockAppeal,
  ConsensusResult as MockConsensusResult,
  AppealOutcome as MockAppealOutcome
} from './mockAI';

export type ConsensusResult = MockConsensusResult;
export type AppealOutcome = MockAppealOutcome;

const CONSENSUS_MODE = process.env.NEXT_PUBLIC_GENLAYER_CONSENSUS === 'contract' ? 'contract' : 'mock';
export const GENLAYER_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_GENLAYER_CONTRACT_ADDRESS?.trim() ||
  '0x93852c3720EE2316a56A3618b7637B2b18ca6cd7';

async function fetchContractConsensus(claim: ScenarioClaim): Promise<ConsensusResult> {
  console.warn('GenLayer contract consensus mode is enabled, but the contract ABI is not wired yet. Falling back to mock.');
  return runMockConsensus(claim);
}

async function fetchContractAppeal(previous: ConsensusResult): Promise<AppealOutcome> {
  console.warn('GenLayer contract appeal mode is enabled, but the contract ABI is not wired yet. Falling back to mock.');
  return runMockAppeal(previous);
}

export async function resolveConsensus(claim: ScenarioClaim): Promise<ConsensusResult> {
  if (CONSENSUS_MODE === 'contract') {
    return fetchContractConsensus(claim);
  }
  return runMockConsensus(claim);
}

export async function resolveAppeal(previous: ConsensusResult): Promise<AppealOutcome> {
  if (CONSENSUS_MODE === 'contract') {
    return fetchContractAppeal(previous);
  }
  return runMockAppeal(previous);
}

export function isContractMode() {
  return CONSENSUS_MODE === 'contract';
}
