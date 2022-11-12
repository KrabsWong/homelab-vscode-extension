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
