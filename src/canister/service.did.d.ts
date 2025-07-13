import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface DrawLotteryRequest {
  'signature' : string,
  'public_key' : string,
  'user_address' : string,
  'message' : string,
  'timestamp' : bigint,
}
export interface LotteryRecord {
  'won' : boolean,
  'probability' : number,
  'user_address' : string,
  'message' : string,
  'timestamp' : bigint,
}
export interface LotteryStats {
  'current_winners' : number,
  'total_draws' : number,
  'activity_active' : boolean,
  'max_winners' : number,
}
export type Result = { 'Ok' : LotteryRecord } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : string } |
  { 'Err' : string };
export interface UserInfo {
  'last_draw_time' : bigint,
  'has_won' : boolean,
  'draw_count' : number,
  'address' : string,
  'personal_probability' : number,
}
export interface _SERVICE {
  'daily_check_in' : ActorMethod<[DrawLotteryRequest], Result>,
  'get_lottery_records' : ActorMethod<[bigint, bigint], Array<LotteryRecord>>,
  'get_lottery_stats' : ActorMethod<[], LotteryStats>,
  'get_user_info' : ActorMethod<[string], UserInfo>,
  'set_lottery_config' : ActorMethod<[number, number, number], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
