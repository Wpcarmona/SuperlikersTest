// src/app/models/login-response.model.ts
export interface LoginResponse {
    ok: string;
    token: string;
    message: string;
  }

  export interface SignupInfoResponse {
    ok: string;
    object: {
      form_id: string;
      distinct_id_field_name: string;
      total_fields: number;
      fields: Field[];
    };
  }
  
  export interface Field {
    field_type: string;
    type_value: string;
    name: string;
    label: string;
    help_text: string | null;
    placeholder: string | null;
    default_value: string | null;
    required_field: boolean;
    unique_field: boolean;
    choices: Choice[] | null;
  }
  
  export interface Choice {
    label: string;
    value: string;
  }
  
  