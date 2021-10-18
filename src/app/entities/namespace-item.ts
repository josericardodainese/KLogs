export interface metadata {
  name: string;
}

export interface itemNameSpaceMenu {
  metadata: metadata;
}

export interface NameSpaceItem {
  items: itemNameSpaceMenu[];
}
