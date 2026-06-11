interface PrefillConfigItem<T> {
  label: string;
  description?: string;
  data: T;
}

export type PrefillConfig<T> = PrefillConfigItem<T>[];
