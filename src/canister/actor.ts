import { Actor, HttpAgent } from '@dfinity/agent'
import type { _SERVICE as NekoService } from './service.did'
import { idlFactory } from './service.did'

const NEKO_CANISTER_ID = 'hmqap-ryaaa-aaaaf-qaxaa-cai'
const ICP_HOST = 'https://ic0.app'

export const nekoActor = Actor.createActor<NekoService>(idlFactory, {
	agent: HttpAgent.createSync({
		host: ICP_HOST
	}),
	canisterId: NEKO_CANISTER_ID
})
