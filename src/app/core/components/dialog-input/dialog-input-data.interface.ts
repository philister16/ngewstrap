export interface DialogInputData {
    title?: string;
    content?: string;
    label?: string;
    inputType?: 'text' | 'email' | 'password' | 'number' | 'date';
    value?: any;
    continue?: string;
}
