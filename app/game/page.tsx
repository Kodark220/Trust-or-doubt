import GameExperience from './GameExperience';
import { buildScenarioQueue, getDailyScenario } from '../../utils/scenarios';
import { GameMode, TOTAL_ROUNDS } from './constants';

type GamePageProps = {
  searchParams?: {
    mode?: GameMode;
    username?: string;
  };
};

export default function GamePage({ searchParams }: GamePageProps) {
  const requestedMode: GameMode = searchParams?.mode === 'multi' ? 'multi' : 'single';
  const rawName = typeof searchParams?.username === 'string' ? searchParams.username : '';
  const username = rawName.trim() || 'Guest';
  const initialQueue = buildScenarioQueue(
    TOTAL_ROUNDS,
    `${username}-${requestedMode}-${Math.random()}`
  );
  const dailyScenario = getDailyScenario();

  return (
    <GameExperience
      initialMode={requestedMode}
      initialUsername={username}
      initialQueue={initialQueue}
      dailyScenario={dailyScenario}
    />
  );
}
