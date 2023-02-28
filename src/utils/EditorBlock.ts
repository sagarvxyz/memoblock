import { NewEditorBlock } from './types';

export class EditorBlock implements NewEditorBlock {
  id;
  content;
  constructor(i: number) {
    this.id = String(Date.now());
    this.content = '';
  }
}
