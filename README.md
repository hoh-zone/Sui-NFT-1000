# Sui Memorial NFT

This repository contains a Sui memorial NFT project with:
- a Move contract package under `memorial_nft`
- a React frontend scaffold under `frontend`

## Contract (Move)

Create a memorial NFT on-chain with `memorial_nft::memorial::mint` (Move 2024).
`mint` takes a shared `Counter` object and uses default metadata in the module.
The NFT uses the official Sui Display standard via `memorial_nft::memorial_nft::init`.

Common commands:
```bash
cd memorial_nft
sui move build
sui move test
```

## Frontend (React)

The frontend is generated from the official Mysten `create-dapp` template.

```bash
cd frontend
npm install
npm run dev
```

Configure the contract IDs in `frontend/src/networkConfig.ts`:
- `packageId`: published Move package ID
- `counterId`: shared `Counter` object ID created by `init`
