export const idlFactory = ({ IDL }) => {
  const DrawLotteryRequest = IDL.Record({
    'signature' : IDL.Text,
    'public_key' : IDL.Text,
    'user_address' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Nat64,
  });
  const LotteryRecord = IDL.Record({
    'won' : IDL.Bool,
    'probability' : IDL.Float64,
    'user_address' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Nat64,
  });
  const Result = IDL.Variant({ 'Ok' : LotteryRecord, 'Err' : IDL.Text });
  const LotteryStats = IDL.Record({
    'current_winners' : IDL.Nat32,
    'total_draws' : IDL.Nat32,
    'activity_active' : IDL.Bool,
    'max_winners' : IDL.Nat32,
  });
  const UserInfo = IDL.Record({
    'last_draw_time' : IDL.Nat64,
    'has_won' : IDL.Bool,
    'draw_count' : IDL.Nat32,
    'address' : IDL.Text,
    'personal_probability' : IDL.Float64,
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : IDL.Text });
  return IDL.Service({
    'daily_check_in' : IDL.Func([DrawLotteryRequest], [Result], []),
    'get_lottery_records' : IDL.Func(
        [IDL.Nat64, IDL.Nat64],
        [IDL.Vec(LotteryRecord)],
        ['query'],
      ),
    'get_lottery_stats' : IDL.Func([], [LotteryStats], ['query']),
    'get_user_info' : IDL.Func([IDL.Text], [UserInfo], ['query']),
    'set_lottery_config' : IDL.Func(
        [IDL.Float64, IDL.Float64, IDL.Nat32],
        [Result_1],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
