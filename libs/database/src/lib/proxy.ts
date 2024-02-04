/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Player, World } from '@minecraft/server';

export function getDynamicProperty<T>(
  subject: Player | World,
  propertyId: string
): T | undefined {
  try {
    return JSON.parse(subject.getDynamicProperty(propertyId) as string) as T;
  } catch (error) {
    return undefined;
  }
}

export function getOrInitDynamicProperty<T>(
  subject: Player | World,
  propertyId: string,
  defaultValue: T
): T {
  const value = getDynamicProperty<T>(subject, propertyId);
  if (value) {
    return value;
  } else {
    setDynamicProperty(subject, propertyId, defaultValue);
    return getDynamicProperty<T>(subject, propertyId)!;
  }
}

export function clearDynamicProperty(
  subject: Player | World,
  propertyId: string
) {
  subject.setDynamicProperty(propertyId, undefined);
}

export function setDynamicProperty<T>(
  subject: Player | World,
  propertyId: string,
  value: T
) {
  return subject.setDynamicProperty(propertyId, JSON.stringify(value));
}

export class DynamicPropertyProxy<T> {
  #data: Record<string, any> = {};
  #subject;
  [propertyId: string]: T;
  constructor(subject: Player | World) {
    this.#subject = subject;
    return new Proxy(this, {
      get: (target, prop: string) => {
        if (typeof target[prop] === 'function') {
          return target[prop] as T;
        } else {
          return target.#calculateValue(prop);
        }
      },
      set: (target, prop: string, value) => {
        target.#data[prop] = target.#processValue(prop, value);
        return true;
      },
    });
  }
  #calculateValue(prop: string): any {
    return getDynamicProperty(this.#subject, prop);
  }
  #processValue(prop: string, value: any): any {
    if (value === undefined) {
      clearDynamicProperty(this.#subject, prop);
    } else {
      setDynamicProperty(this.#subject, prop, value);
    }
    return value;
  }
}
