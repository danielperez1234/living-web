declare global {
  interface Window {
    OpenPay: {
      setId: (id: string) => void;
      setApiKey: (apiKey: string) => void;
      setSandboxMode: (isSandbox: boolean) => void;
      deviceData: {
        setup: (formId: string | HTMLFormElement, fieldName: string) => string;
      };
      token: {
        extractFormAndCreate: (
          form: HTMLFormElement,
          successCallback: (response: any) => void,
          errorCallback: (error: any) => void
        ) => void;
      };
    };
  }
}

export {};