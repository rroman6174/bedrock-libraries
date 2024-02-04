import { ModalFormData } from '@minecraft/server-ui';
import { Player, RawMessage } from '@minecraft/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any
  ? U
  : never;

export type ReturnTypeOfClassMethod<T, M extends keyof T> = T[M] extends (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => infer R
  ? R
  : never;

type modalFormField =
  | { type: 'textField' }
  | { type: 'toggle' }
  | { type: 'slider' }
  | { type: 'dropdown'; options: (string | RawMessage)[] };
type booleanFunction = (value: boolean | PromiseLike<boolean>) => void;
type stringFunction = (value: string | PromiseLike<string>) => void;
type stringOrRawMessageFunction = (
  value: string | PromiseLike<string> | RawMessage | PromiseLike<RawMessage>
) => void;
type numberFunction = (value: number | PromiseLike<number>) => void;
type dropdownFunction = (
  value: number | PromiseLike<number>,
  options: (string | RawMessage)[]
) => void;
type formFunction =
  | booleanFunction
  | stringFunction
  | numberFunction
  | dropdownFunction
  | stringOrRawMessageFunction;

export class Modal {
  private form: ModalFormData = new ModalFormData();
  private promiseResolvers: formFunction[] = [];
  private fieldTypes: modalFormField[] = [];

  constructor(title: FirstArgument<ModalFormData['title']>) {
    this.form.title(title);
  }
  toggle(
    label: FirstArgument<ModalFormData['toggle']>,
    defaultValue?: boolean
  ): Promise<boolean> {
    this.form.toggle(label, defaultValue);
    const formFieldResult = new Promise((resolve) => {
      this.promiseResolvers.push(resolve);
      this.fieldTypes.push({ type: 'toggle' });
    }) as Promise<boolean>;
    return formFieldResult;
  }
  textField(
    label: string | RawMessage,
    placeholder: string | RawMessage,
    defaultValue?: string | undefined
  ): Promise<string> {
    this.form.textField(label, placeholder, defaultValue);
    const formFieldResult = new Promise((resolve) => {
      this.promiseResolvers.push(resolve);
      this.fieldTypes.push({ type: 'textField' });
    }) as Promise<string>;
    return formFieldResult;
  }
  dropdown(
    label: string | RawMessage,
    options: (string | RawMessage)[],
    defaultValue?: typeof options | undefined
  ): Promise<string> {
    let index = 0;
    if (defaultValue) {
      try {
        index = options.findIndex((option) => {
          return defaultValue === option;
        });
      } catch (error) {
        ('');
      }
    }
    this.form.dropdown(label, options, index);
    const formFieldResult = new Promise((resolve) => {
      this.promiseResolvers.push(resolve);
      this.fieldTypes.push({ type: 'dropdown', options: options });
    }) as Promise<string>;
    return formFieldResult;
  }
  slider(
    label: string | RawMessage,
    minimum: number,
    maximum: number,
    valueStep: number,
    defaultValue?: number
  ): Promise<number> {
    this.form.slider(label, minimum, maximum, valueStep, defaultValue);
    const formFieldResult = new Promise((resolve) => {
      this.promiseResolvers.push(resolve);
      this.fieldTypes.push({ type: 'slider' });
    }) as Promise<number>;
    return formFieldResult;
  }
  async show(player: Player) {
    const { canceled, formValues } = await this.form.show(player);
    if (!canceled) {
      for (const [index, formValue] of formValues?.entries() || []) {
        const fieldType = this.fieldTypes[index];
        switch (fieldType.type) {
          case 'toggle':
            (this.promiseResolvers[index] as booleanFunction)(
              formValue as boolean
            );
            break;
          case 'textField':
            (this.promiseResolvers[index] as stringFunction)(
              formValue as string
            );
            break;
          case 'dropdown':
            (this.promiseResolvers[index] as stringOrRawMessageFunction)(
              fieldType.options[formValue as number]
            );
            break;
          case 'slider':
            (this.promiseResolvers[index] as numberFunction)(
              formValue as number
            );
            break;
          default:
            break;
        }
      }
    }
    return !canceled;
  }
}
