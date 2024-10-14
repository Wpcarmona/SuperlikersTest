export interface EntriesRequest {
  api_key: string;
  campaign: string;
  date_filter: {
    sdate: string;
    edate: string;
  };
  distinct_id: string;
  _type: string;
  atype: string;
}

export interface Participant {
  name: string;
  id: string;
  uid: string;
  email: string;
}

export interface Data {
  [key: string]: string | number;
}

export interface NewEntry {
  name: string;
  meta_mes?: string | number | any;
  avance_actual?: string | number | any;
}

export interface Entry {
  activity_count: number;
  category: string;
  created_at: string;
  moderation: string;
  points: number;
  state: string;
  id: string;
  slug: string;
  name: string;
  participant: Participant | any;
  as_form: boolean;
  data: any;
  meta_mes?: string | number | any;
  avance_actual?: string | number | any;
}

export interface EntriesResponse {
  ok: string;
  data: {
    previous_page_token: number;
    next_page_token: number;
    entries: Entry[];
  };
}

export interface ResultData {
  cartones: Array<{
    name: string;
    [key: string]: string;
  }>;
  hectolitros: Array<{
    name: string;
    [key: string]: string;
  }>;
}

export interface NewEntry {
  name: string;
  avance: number;
  meta: number;
}

