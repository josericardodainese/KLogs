export interface metadata {
  name: string;
}

export interface itemMenu {
  metadata: metadata;
}

export interface MenuItem {
  items: itemMenu[];
}
