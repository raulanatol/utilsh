interface Plugin {
  name: string;
  description: string;
}

export interface PluginsConfiguration {
  [group: string]: {
    name: string;
    description: string;
    plugins: Plugin[];
  };
}
