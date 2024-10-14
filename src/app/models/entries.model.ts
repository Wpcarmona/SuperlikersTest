
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
  
 interface Participant {
    name: string;
    id: string;
    uid: string;
    email: string;
  }
  
  interface Entry {
    activity_count: number;
    category: string;
    created_at: string;
    moderation: string;
    points: number;
    state: string;
    id: string;
    slug: string;
    name: string;
    participant: Participant;
    as_form: boolean;
    data: any;
  }
  
export interface EntriesResponse {
    ok: string;
    data: {
      previous_page_token: number;
      next_page_token: number;
      entries: Entry[];
    };
  }
  