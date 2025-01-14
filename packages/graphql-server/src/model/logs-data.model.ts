import {
  NullableDate,
  NullableNumber,
  NullableString
} from "../utils/types.util";

export interface LogsData {
  id: number;
  user_id: NullableNumber;
  action: NullableString;
  result: NullableString;
  created_at: NullableDate;
}
