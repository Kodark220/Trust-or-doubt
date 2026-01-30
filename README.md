# Trust or Doubt — GenLayer mini-game

This Next.js 14 + Tailwind project is the landing/lobby/claim flow for the GenLayer-inspired “Trust or Doubt” game. It currently simulates AI consensus locally but is architected so the real GenLayer Intelligent Contract can be added later.

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000` and start from the landing page — enter a username, choose single/multiplayer, and jump into the claim rounds.

## Contract integration toggle

By default the game uses the mocked AI consensus helpers in `utils/mockAI.ts`. When the GenLayer contract is ready (even on testnet) you can flip the flag to have the game route through the real contract:

1. Provide the ABI + RPC details in a new module (e.g., extend `utils/genlayerClient.ts`).
2. Set `NEXT_PUBLIC_GENLAYER_CONSENSUS=contract` in your environment (e.g., `.env.local` or Vercel dashboard).
3. Deploy the contract and plug in the read/write helpers inside `fetchContractConsensus`/`fetchContractAppeal`.

The UI will continue to work during development because those handler functions fall back to the mock logic while logging a warning.

## Deployment

- `package.json` already defines `dev`, `build`, `start`, and `lint` scripts for local testing or hosting (Vercel, Render, etc.).
- Create a `vercel.json` if you need custom rewrites or environment variable exposure.
- Use the README or a new doc to detail any required env vars (see the `NEXT_PUBLIC_GENLAYER_CONSENSUS` toggle above, plus any RPC endpoints once the contract is live).

## Next steps

- Upload the GenLayer logo image to `public/logo.png` and keep updating `components/GenLayerLogo.tsx`.
- When the intelligent contract is deployed, replace the console warning placeholders in `utils/genlayerClient.ts` with `ethers.js`/`viem` calls that fetch consensus, appeal outcomes, and scoring metadata from the on-chain system.
- Consider writing integration tests that mock `NEXT_PUBLIC_GENLAYER_CONSENSUS` to assert the UI behaves under both mock and contract modes.
