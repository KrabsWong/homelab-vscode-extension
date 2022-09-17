/** 由于 vscode-nls 强制要求必须要放到顶部最先初始化，所以当前文档的import顺序要做调整
 * https://www.npmjs.com/package/vscode-nls
 * This must be the first import in the main entry file
 * import * as nls from 'vscode-nls';
*/
import * as vscode from 'vscode';

import { initialize as initializeHomelabLinks } from '@/provider/homelab-links';

/*
内置的icons： https://code.visualstudio.com/api/references/icons-in-labels
*/
export async function activate(context: vscode.ExtensionContext) {
  /**
	 * 初始化 Homelab 的 View
	*/
  await initializeHomelabLinks(context);
}

export async function deactivate() {
}
