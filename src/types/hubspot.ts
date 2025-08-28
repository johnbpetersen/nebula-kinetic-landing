// src/types/hubspot.ts
// Purpose: Shared, conflict-free HubSpot embed types (no global augmentation)

export interface HubSpotCreateConfig {
    region: string;
    portalId: string;
    formId: string;
    target: string;
    css?: string;
    cssClass?: string;
    cssRequired?: string;
    containerClass?: string;
    onFormReady?: (formEl?: HTMLFormElement) => void;
    onFormSubmitted?: (formEl?: HTMLFormElement) => void;
    // Allow unknown extra flags HubSpot may add
    [key: string]: unknown;
  }
  
  export interface HubSpotForms {
    create: (cfg: HubSpotCreateConfig) => void;
  }
  
  export interface WindowWithHbspt extends Window {
    hbspt?: { forms: HubSpotForms };
  }