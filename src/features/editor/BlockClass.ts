import { MetadataModel, MetadataSource, MetadataStatus } from '@/common/types';
import { NewEditorBlock } from './editorTypes';

class Metadata implements MetadataModel {
  title: string;
  author: string;
  status: MetadataStatus;
  source: MetadataSource | null;
  tags: string[];
  createdAt: Date;
  modifiedAt: Date;
  constructor() {
    this.title = 'Untitled';
    this.author = 'Unknown';
    this.status = 'draft';
    this.source = null;
    this.tags = [];
    this.createdAt = new Date();
    this.modifiedAt = new Date();
  }
}

export class Block implements NewEditorBlock {
  id: string;
  content: string;
  metadata: MetadataModel;
  constructor(i: number) {
    this.id = String(Date.now());
    this.content = '';
    this.metadata = new Metadata();
  }
}
